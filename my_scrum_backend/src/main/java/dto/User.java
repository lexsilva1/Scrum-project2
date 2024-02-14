package dto;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;

import java.util.ArrayList;
import java.util.Iterator;

@XmlRootElement
public class User {
    String id;
    String username;

    String name;

    String email;

    String password;
    String contactNumber;
    ArrayList<Task> tasks = new ArrayList<Task>();

    public User() {
    }

    public User(String id, String username, String name, String email, String password, String contactNumber) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.email = email;
        this.password = password;
        this.contactNumber = contactNumber;
    }

    @XmlElement
    public String getId() {
        return id;
    }

    public void setId() {
        this.id = "user".concat(String.valueOf(Double.parseDouble(Math.floor(Math.random() * 1000) + "")));
    }

    @XmlElement
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @XmlElement
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @XmlElement
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @XmlElement
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @XmlElement
    public String getContactNumber() {
        return contactNumber;
    }
    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }
    @XmlElement
    public ArrayList<Task> getTasks() {
        return tasks;
    }
    public void setTasks(ArrayList<Task> tasks) {
        this.tasks = tasks;
    }
    public void addTask(Task task) {
        tasks.add(task);
    }
    public void removeTask(Task task) {
        tasks.remove(task);
    }
    public void removeTask(String id) {
        Iterator<Task> iterator = tasks.iterator();
        while (iterator.hasNext()) {
            Task task = iterator.next();
            if (task.getId().equals(id)) {
                iterator.remove();
            }
        }
    }
    public Task getTask(String id) {
        for (Task a : tasks) {
            if (a.getId().equals(id))
                return a;
        }
        return null;
    }
    public void updateTask(Task task) {
        for (Task a : tasks) {
            if (a.getId().equals(task.getId())) {
                a.setTitle(task.getTitle());
                a.setDescription(task.getDescription());
                a.setStatus(task.getStatus());
                a.setPriority(task.getPriority());
                a.setEndDate(task.getEndDate());
                a.setStartDate(task.getStartDate());
            }
        }
    }
}
