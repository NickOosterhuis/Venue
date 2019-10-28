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

    @PostConstruct
    private void PopulateDatabase() {

        if (roleRepository.count() == 0) {
            roleRepository.save(new Role("ADMIN"));
            roleRepository.save(new Role("USER"));
            roleRepository.save(new Role("VENUE"));
        }
    }
}
