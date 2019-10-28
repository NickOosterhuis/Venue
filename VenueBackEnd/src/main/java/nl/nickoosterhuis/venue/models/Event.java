package nl.nickoosterhuis.venue.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sun.scenario.effect.Offset;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Event {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    private String id;

    @ManyToOne
    @JoinColumn(name = "venue_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Venue venue;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private OffsetDateTime startDateAndTime;

    @Column(nullable = false)
    private OffsetDateTime endDateAndTime;

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
