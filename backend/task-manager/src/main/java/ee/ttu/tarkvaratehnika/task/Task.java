package ee.ttu.tarkvaratehnika.task;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter
@Setter
public class Task {
    @Id
    @GeneratedValue
    long id;
    String title;
    String description;
    String author;
    boolean isImportant = false;
    boolean isUrgent = false;
    boolean completed = false;
}
