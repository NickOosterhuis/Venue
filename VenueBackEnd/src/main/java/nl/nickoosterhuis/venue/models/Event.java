package nl.nickoosterhuis.venue.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.OffsetDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Event {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "org.hibernate.id.UUIDGenerator")
    private String id;

    @ManyToOne
    @JoinColumn(name = "venue_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Venue venue;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    @Lob
    private String description;

    @Column(nullable = false)
    @Lob
    private String bandDescription;

    @Column(nullable = false)
    private String genre;

    @Column(nullable = false)
    private OffsetDateTime startDateAndTime;

    @Column(nullable = false)
    private OffsetDateTime endDateAndTime;

    @Column
    private OffsetDateTime postedAt;

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
    
    private Double payment;
}
