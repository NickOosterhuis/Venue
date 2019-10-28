package nl.nickoosterhuis.venue.controllers;

import nl.nickoosterhuis.venue.exceptions.BadRequestException;
import nl.nickoosterhuis.venue.exceptions.ResourceNotFoundException;
import nl.nickoosterhuis.venue.models.User;
import nl.nickoosterhuis.venue.payload.ApiResponse;
import nl.nickoosterhuis.venue.payload.UpdateAccountRequest;
import nl.nickoosterhuis.venue.repositories.UserRepository;
import nl.nickoosterhuis.venue.security.CurrentUser;
import nl.nickoosterhuis.venue.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/me")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN') or hasRole('ROLE_VENUE')")
    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        return userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
    }

    @PutMapping("/me")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN') or hasRole('ROLE_VENUE')")
    public ResponseEntity<?> updateUser(@Valid @RequestBody UpdateAccountRequest updateAccountRequest, @CurrentUser UserPrincipal userPrincipal) {
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));

        if (!updateAccountRequest.getNewPassword().equals(updateAccountRequest.getNewPasswordVerification()))
            throw new BadRequestException("Passwords don't match");

        user.setName(updateAccountRequest.getName());
        user.setPassword(passwordEncoder.encode(updateAccountRequest.getNewPassword()));
        userRepository.save(user);

        return ResponseEntity.accepted().body(new ApiResponse(true, "User updated successfully@"));


    }
}
