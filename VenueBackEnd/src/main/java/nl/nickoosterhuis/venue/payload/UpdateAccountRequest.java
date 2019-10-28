package nl.nickoosterhuis.venue.payload;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class UpdateAccountRequest {
    @NotBlank
    private String name;

    @NotBlank
    private String newPassword;

    @NotBlank
    private String newPasswordVerification;
}
