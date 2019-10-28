package nl.nickoosterhuis.venue.repositories;

import nl.nickoosterhuis.venue.models.User;
import nl.nickoosterhuis.venue.models.Venue;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VenueRepository extends JpaRepository<Venue, String> {
    Boolean existsByCompanyName(String name);

    Optional<Venue> findByUser(User user);
}
