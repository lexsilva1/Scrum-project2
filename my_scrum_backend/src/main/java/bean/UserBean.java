package bean;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.util.ArrayList;
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
            if (a.getId().equals(i))
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
    public boolean updateUser(String id, User user) {
        for (User a : users) {
            if (a.getId().equals(id)) {
                a.setUsername(user.getUsername());
                a.setName(user.getName());
                a.setEmail(user.getEmail());
                a.setPassword(user.getPassword());
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
    public boolean checkUsername(User user){
        for (int i = 0; i< users.size(); i++){
            if (user.getUsername().equals(users.get(i).getUsername())){
                System.out.println("username already exists");
                return true;
            }
        }
        System.out.println("username does not exist");
        return false;
    }
}
