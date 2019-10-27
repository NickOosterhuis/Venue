package nl.nickoosterhuis.venue.controllers;

import nl.nickoosterhuis.venue.exceptions.ResourceNotFoundException;
import nl.nickoosterhuis.venue.models.User;
import nl.nickoosterhuis.venue.repositories.UserRepository;
import nl.nickoosterhuis.venue.security.CurrentUser;
import nl.nickoosterhuis.venue.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        return userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
    }
}
