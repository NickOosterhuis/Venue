package nl.nickoosterhuis.venue.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Venue {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    private String id;

    @OneToOne
    @JsonIgnore
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, unique = true)
    private String companyName;

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

    private String phoneNumber;
}
