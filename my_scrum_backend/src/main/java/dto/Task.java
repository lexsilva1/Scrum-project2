package dto;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;

import java.time.LocalDate;
import java.time.LocalDateTime;

@XmlRootElement(name = "Task")
public class Task {
    String id;
    String title;
    String description;
    String status;
    String priority;
    LocalDate startDate;
    LocalDate endDate;

    public Task() {
    }
    public Task(String title, String description, String priority, LocalDate startDate, LocalDate endDate) {
        this.title = title;
        this.description = description;
        this.status = "todo";
        this.priority = priority;
    }
    @XmlElement
    public String getId() {
        return id;
    }
    @XmlElement
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    @XmlElement
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        description = description;
    }
    @XmlElement
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    @XmlElement
    public String getPriority() {
        return priority;
    }
    public void setPriority(String priority) {
        this.priority = priority;
    }
    @XmlElement
    public LocalDate getStartDate() {
        return startDate;
    }
    public void setStartDate(LocalDate startDate) {this.startDate = startDate;}
    @XmlElement
    public LocalDate getEndDate() {
        return endDate;
    }
    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }
    public void setId(String id) {
        this.id = id;
    }
    public void generateId() {
        this.id = "task" + Math.random() * 1000;
    }
    public void setinitialStatus() {
        this.status = "todo";
    }

}
