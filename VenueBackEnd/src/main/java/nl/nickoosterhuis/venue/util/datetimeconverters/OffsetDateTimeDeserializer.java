package nl.nickoosterhuis.venue.util.datetimeconverters;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import org.springframework.boot.jackson.JsonComponent;

import java.io.IOException;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;

@JsonComponent
public class OffsetDateTimeDeserializer extends JsonDeserializer<OffsetDateTime>
{
    @Override
    public OffsetDateTime deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JsonProcessingException
    {
        String isoDateString = jsonParser.readValueAs(String.class);

        return OffsetDateTime.parse(isoDateString, DateTimeFormatter.ISO_OFFSET_DATE_TIME);
    }
}
