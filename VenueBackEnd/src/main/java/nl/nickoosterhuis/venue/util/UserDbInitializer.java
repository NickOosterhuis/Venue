package nl.nickoosterhuis.venue.util;

import nl.nickoosterhuis.venue.models.AuthProvider;
import nl.nickoosterhuis.venue.models.Role;
import nl.nickoosterhuis.venue.models.User;
import nl.nickoosterhuis.venue.repositories.RoleRepository;
import nl.nickoosterhuis.venue.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;
import java.util.Arrays;

@Service
@Transactional
public class UserDbInitializer {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User addUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @PostConstruct
    private void fillRoles() {

        if (roleRepository.count() == 0) {
            roleRepository.save(new Role("ADMIN"));
            roleRepository.save(new Role("USER"));
        }
    }

    @PostConstruct
    private void setupDefaultUser() {

        if (userRepository.count() == 0) {

            userRepository.save(new User("admin", "admin@example.com",
                    passwordEncoder.encode("admin"),
                    Arrays.asList(new Role("ADMIN")), AuthProvider.local));

            userRepository.save(new User("user", "user@example.com",
                    passwordEncoder.encode("user"),
                    Arrays.asList(new Role("USER")), AuthProvider.local));
        }
    }
}
