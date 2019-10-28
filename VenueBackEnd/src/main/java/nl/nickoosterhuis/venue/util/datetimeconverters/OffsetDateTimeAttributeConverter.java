package nl.nickoosterhuis.venue.util.datetimeconverters;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.sql.Timestamp;
import java.time.Instant;
import java.time.OffsetDateTime;
import java.time.ZoneId;

@Converter(autoApply = true)
public class OffsetDateTimeAttributeConverter implements AttributeConverter<OffsetDateTime, Timestamp>
{
    @Override
    public Timestamp convertToDatabaseColumn(OffsetDateTime offsetDateTime)
    {
        long epochMillis = offsetDateTime.toEpochSecond()*1000;
        return new Timestamp(epochMillis);
    }

    @Override
    public OffsetDateTime convertToEntityAttribute(Timestamp date)
    {
        //TODO: make statics configurable(hint: ZoneId.systemDefault())
        long epochMillis = date.getTime();
        Instant epochInstant = Instant.ofEpochMilli(epochMillis);
        ZoneId timeZoneId = ZoneId.systemDefault();

        return OffsetDateTime.ofInstant(epochInstant, timeZoneId);
    }
}
