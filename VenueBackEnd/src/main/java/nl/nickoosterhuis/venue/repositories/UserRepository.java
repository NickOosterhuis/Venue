package nl.nickoosterhuis.venue.repositories;

import nl.nickoosterhuis.venue.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {

    Optional<User> findByEmail(String email);

    Boolean existsByEmail(String email);

    Boolean existsByName(String name);
}
