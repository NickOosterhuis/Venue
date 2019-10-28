package nl.nickoosterhuis.venue.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Event {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "org.hibernate.id.UUIDGenerator")
    private String id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "venue_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Venue venue;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private LocalDateTime startDateAndTime;

    @Column(nullable = false)
    private LocalDateTime endDateAndTime;

    @Column(nullable = false)
    private String streetName;

    @Column(nullable = false)
    private String postalCode;

    @Column(nullable = false)
    private String houseNumber;

    @Column(nullable = false)
    private String state;

    @Column(nullable = false)
    private String country;
}
