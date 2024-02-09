package dto;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;
@XmlRootElement
public class User {
    String id;
    String username;

    String name;

    String email;

    String password;
    String contactNumber;
    public User() {
    }
    public User(String id,String username, String name, String email, String password, String contactNumber) {
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
    public void setId(String id) {
        this.id = "user".concat(String.valueOf(Double.parseDouble(Math.floor(Math.random()*1000)+"")));
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
    public String getContactNumber(){return contactNumber;}
    public void setContactNumber(String contactNumber){this.contactNumber = contactNumber;}
}
