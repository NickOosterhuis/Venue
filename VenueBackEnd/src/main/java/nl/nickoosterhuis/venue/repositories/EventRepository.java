package nl.nickoosterhuis.venue.repositories;

import com.sun.org.apache.xpath.internal.operations.Bool;
import nl.nickoosterhuis.venue.models.Event;
import nl.nickoosterhuis.venue.models.Venue;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, String> {
    Iterable<Event> getAllByVenue(Venue venue);
    Boolean existsByTitle(String title);
}
