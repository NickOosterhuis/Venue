package nl.nickoosterhuis.venue.controllers;

import nl.nickoosterhuis.venue.DTO.UserDTO;
import nl.nickoosterhuis.venue.exceptions.BadRequestException;
import nl.nickoosterhuis.venue.exceptions.ResourceNotFoundException;
import nl.nickoosterhuis.venue.models.User;
import nl.nickoosterhuis.venue.payload.ApiResponse;
import nl.nickoosterhuis.venue.payload.UpdateAccountRequest;
import nl.nickoosterhuis.venue.payload.UpdatePasswordRequest;
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

        User userFromDb = userRepository.findById(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", user.getId()));

        if(!userFromDb.getProfilePictureUrl().isEmpty())
            user.setProfilePictureUrl(userFromDb.getProfilePictureUrl());

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

        if(!user.getEmail().equals(updateAccountRequest.getEmail()))
            user.setEmail(updateAccountRequest.getEmail().trim());

        if(!user.getName().equals(updateAccountRequest.getName()))
            user.setName(updateAccountRequest.getName().trim());

        userRepository.save(user);

        return ResponseEntity.accepted().body(new ApiResponse(true, "User updated successfully@"));
    }

    @PutMapping("/me/changePassword")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN') or hasRole('ROLE_VENUE')")
    public ResponseEntity<?> updateCurrentUserPassword(@Valid @RequestBody UpdatePasswordRequest updatePasswordRequest, @CurrentUser UserPrincipal userPrincipal) {
        User user = userPrincipalHelper.getUserPrincipal(userPrincipal);

        if (!updatePasswordRequest.getNewPassword().equals(updatePasswordRequest.getNewPasswordVerification()))
            throw new BadRequestException("Passwords don't match");

        user.setPassword(passwordEncoder.encode(updatePasswordRequest.getNewPassword()));
        userRepository.save(user);

        return ResponseEntity.accepted().body(new ApiResponse(true, "User updated successfully@"));
    }

    private UserDTO convertToDTO(User user) {
        UserDTO userDTO = modelMapper.map(user, UserDTO.class);
        return userDTO;
    }
}
