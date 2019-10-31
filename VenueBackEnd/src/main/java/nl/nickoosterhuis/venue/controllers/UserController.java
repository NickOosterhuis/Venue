package nl.nickoosterhuis.venue.controllers;

import nl.nickoosterhuis.venue.DTO.UserDTO;
import nl.nickoosterhuis.venue.exceptions.BadRequestException;
import nl.nickoosterhuis.venue.models.User;
import nl.nickoosterhuis.venue.payload.ApiResponse;
import nl.nickoosterhuis.venue.payload.UpdateAccountRequest;
import nl.nickoosterhuis.venue.payload.UpdateProfilePictureRequest;
import nl.nickoosterhuis.venue.repositories.UserRepository;
import nl.nickoosterhuis.venue.security.CurrentUser;
import nl.nickoosterhuis.venue.security.UserPrincipal;
import nl.nickoosterhuis.venue.util.UserPrincipalHelper;
import org.modelmapper.ModelMapper;
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

    @Autowired
    private UserPrincipalHelper userPrincipalHelper;

    private static ModelMapper modelMapper = new ModelMapper();

    @GetMapping("/me")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN') or hasRole('ROLE_VENUE')")
    public UserDTO getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        User user = userPrincipalHelper.getUserPrincipal(userPrincipal);
        return convertToDTO(user);
    }

    @PutMapping("/profilePicture")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN') or hasRole('ROLE_VENUE')")
    public ResponseEntity<?> updateProfilePicture(@Valid @RequestBody UpdateProfilePictureRequest updateProfilePictureRequest, @CurrentUser UserPrincipal userPrincipal) {
        User user = userPrincipalHelper.getUserPrincipal(userPrincipal);

        user.setProfilePictureUrl(updateProfilePictureRequest.getImageUrl());
        userRepository.save(user);



        return ResponseEntity.accepted().body(new ApiResponse(true, "Profile picture updated successfully@"));

    }

    @PutMapping("/me")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN') or hasRole('ROLE_VENUE')")
    public ResponseEntity<?> updateCurrentUser(@Valid @RequestBody UpdateAccountRequest updateAccountRequest, @CurrentUser UserPrincipal userPrincipal) {
        User user = userPrincipalHelper.getUserPrincipal(userPrincipal);

        if (!updateAccountRequest.getNewPassword().equals(updateAccountRequest.getNewPasswordVerification()))
            throw new BadRequestException("Passwords don't match");

        user.setName(updateAccountRequest.getName());
        user.setPassword(passwordEncoder.encode(updateAccountRequest.getNewPassword()));
        userRepository.save(user);

        return ResponseEntity.accepted().body(new ApiResponse(true, "User updated successfully@"));
    }

    private UserDTO convertToDTO(User user) {
        UserDTO userDTO = modelMapper.map(user, UserDTO.class);
        return userDTO;
    }
}
