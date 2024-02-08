package dto;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;
@XmlRootElement(name = "User")
public class User {
    String Id;
    String Username;
    String Name;
    String Email;
    String Password;
    public User() {
    }
    public User(String id,String username, String name, String email, String password) {
        Id = id;
        Username = username;
        Name = name;
        Email = email;
        Password = password;
    }
    @XmlElement
    public String getId() {
        return Id;
    }
    @XmlElement
    public String getName() {
        return Name;
    }
    public void setName(String name) {
        Name = name;
    }
    @XmlElement
    public String getEmail() {
        return Email;
    }
    public void setEmail(String email) {
        Email = email;
    }
    @XmlElement
    public String getPassword() {
        return Password;
    }
    public void setPassword(String password) {
        Password = password;
    }
    @XmlElement
    public String getUsername() {
        return Username;
    }
    public void setUsername(String username) {
        Username = username;
    }
}
