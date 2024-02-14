package bean;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.util.ArrayList;

import dto.Task;
import jakarta.enterprise.context.ApplicationScoped;
import dto.User;
import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;
import jakarta.json.bind.JsonbConfig;
@ApplicationScoped
public class UserBean {
    final String filename = "users.json";
    private ArrayList<User> users;

    public UserBean() {
        File f = new File(filename);
        if(f.exists()){
            try {
                FileReader filereader = new FileReader(f);
                users = JsonbBuilder.create().fromJson(filereader, new ArrayList<User>() {}.getClass().getGenericSuperclass());
            } catch (FileNotFoundException e) {
                throw new RuntimeException(e);
            }
        }else
            users = new ArrayList<User>();

    }
    public void addUser(User a) {
        users.add(a);
        writeIntoJsonFile();
    }
    public User getUser(String i) {
        for (User a : users) {
            if (a.getUsername().equals(i))
                return a;
        }
        return null;
    }
    public ArrayList<User> getUsers() {
        return users;
    }
    public boolean removeUser(String id) {
        for (User a : users) {
            if (a.getId().equals(id)) {
                users.remove(a);
                return true;
            }
        }
        return false;
    }
    public boolean updateUser(String username, User user) {
        for (User a : users) {
            if (a.getUsername().equals(username)) {
                a.setName(user.getName());
                a.setEmail(user.getEmail());
                a.setPassword(user.getPassword());
                a.setContactNumber(user.getContactNumber());
                a.setUserPhoto(user.getUserPhoto());
                writeIntoJsonFile();
                return true;
            }

        }
        return false;
    }
    private void writeIntoJsonFile() {
        try {
            JsonbConfig config = new JsonbConfig().withFormatting(true);
            Jsonb jsonb = JsonbBuilder.create(config);
            FileOutputStream fileOutputStream = new FileOutputStream(filename);
            jsonb.toJson(users, fileOutputStream);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
    public void addTaskToUser(String username, Task task) {
        for (User a : users) {
            if (a.getUsername().equals(username)) {
                a.addTask(task);
                writeIntoJsonFile();
            }
        }
    }


    //para cada parametro do user fazer confirmação
    public boolean nameIsBlank(User user){
        if (user.getName().trim().isBlank()){
            System.out.println("User name is not valid");
            return true;
        }
        return false;
    }
    public boolean emailIsBlank(User user){
        if (user.getEmail().trim().isBlank()){
            System.out.println("Email is not valid");
            return true;
        }
        return false;
    }
    public boolean passwordIsBlank(User user){
        if (user.getPassword().trim().isBlank()){
            System.out.println("password is not valid");
            return true;
        }
        return false;
    }
    public boolean contactNumberIsBlank(User user){
        if (user.getContactNumber().trim().isBlank()){
            System.out.println("contact is not valid");
            return true;
        }
        return false;
    }


    public User login(String username, String password) {
        for (User a : users) {
            if (a.getUsername().equals(username) && a.getPassword().equals(password)) {
                return a;
            }
        }
        return null;
    }

    public boolean userExists(String username) {
        for (User a : users) {
            if (a.getUsername().equals(username)) {
                return true;
            }
        }
        return false;
    }
    public boolean isUserAuthorized(String username, String password){
        for (User a : users) {
            if (a.getUsername().equals(username) && a.getPassword().equals(password)) {
                return true;
            }
        }
        return false;

    }
    public void removeTaskFromUser(String username, String id) {
        for (User a : users) {
            if (a.getUsername().equals(username)) {
                a.removeTask(id);
                writeIntoJsonFile();
            }
        }
    }



}
