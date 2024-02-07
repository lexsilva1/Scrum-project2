package dto;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;
@XmlRootElement(name = "Task")
public class Task {
    String Id;
    String Title;
    String Description;
    String Status;
    String Priority;
    public Task() {
    }
    public Task(String id, String title, String description, String priority) {
        Id = id;
        Title = title;
        Description = description;
        Status = "todo";
        Priority = priority;
    }
    @XmlElement
    public String getId() {
        return Id;
    }
    @XmlElement
    public String getTitle() {
        return Title;
    }
    public void setTitle(String title) {
        Title = title;
    }
    @XmlElement
    public String getDescription() {
        return Description;
    }
    public void setDescription(String description) {
        Description = description;
    }
    @XmlElement
    public String getStatus() {
        return Status;
    }
    public void setStatus(String status) {
        Status = status;
    }
    @XmlElement
    public String getPriority() {
        return Priority;
    }
    public void setPriority(String priority) {
        Priority = priority;
    }
}
