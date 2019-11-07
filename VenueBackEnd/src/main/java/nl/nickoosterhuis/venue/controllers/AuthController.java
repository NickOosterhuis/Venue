package nl.nickoosterhuis.venue.controllers;

import nl.nickoosterhuis.venue.exceptions.BadRequestException;
import nl.nickoosterhuis.venue.exceptions.ResourceNotFoundException;
import nl.nickoosterhuis.venue.models.AuthProvider;
import nl.nickoosterhuis.venue.models.Role;
import nl.nickoosterhuis.venue.models.User;
import nl.nickoosterhuis.venue.models.Venue;
import nl.nickoosterhuis.venue.payload.ApiResponse;
import nl.nickoosterhuis.venue.payload.AuthResponse;
import nl.nickoosterhuis.venue.payload.LoginRequest;
import nl.nickoosterhuis.venue.payload.SignUpRequest;
import nl.nickoosterhuis.venue.repositories.RoleRepository;
import nl.nickoosterhuis.venue.repositories.UserRepository;
import nl.nickoosterhuis.venue.security.oauth2.TokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import springfox.documentation.spring.web.json.Json;

import javax.validation.Valid;
import java.net.URI;
import java.util.Collections;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TokenProvider tokenProvider;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        if(loginRequest.getEmail().isEmpty() || loginRequest.getPassword().isEmpty())
            throw new BadRequestException("");

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = tokenProvider.createToken(authentication);
        return ResponseEntity.ok(new AuthResponse(token));
    }

    @PostMapping("/checkusername")
    public ResponseEntity<?> checkIfUserNameIsTaken(@RequestBody String name) {
       if(userRepository.existsByName(name)) {
           throw new BadRequestException("Username already in use.");
        }

        System.out.println(userRepository.existsByName(name));


        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/checkemail")
    public ResponseEntity<?> checkIfEmailIsTaken(@RequestBody String email) {
        if(userRepository.existsByEmail(email)) {
            throw new BadRequestException("Email address already in use.");
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
        if(userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new BadRequestException("Email address already in use.");
        }

        if(userRepository.existsByName(signUpRequest.getName())) {
            throw new BadRequestException("Display name already exists");
        }

        Role role = roleRepository.findByRoleName("ROLE_USER").orElseThrow(() -> new ResourceNotFoundException("User", "user_id", signUpRequest.getEmail()));;

        // Creating user's account
        User user = new User();
        user.setName(signUpRequest.getName().trim());
        user.setEmail(signUpRequest.getEmail().toLowerCase().trim());
        user.setPassword(signUpRequest.getPassword().trim());
        user.setProvider(AuthProvider.local);
        user.setRoles(Collections.singletonList(role));

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        User result = userRepository.save(user);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/user/me")
                .buildAndExpand(result.getId()).toUri();

        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "User registered successfully"));
    }
}
