package bean;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.util.ArrayList;
import jakarta.enterprise.context.ApplicationScoped;
import dto.Task;
import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;
import jakarta.json.bind.JsonbConfig;
@ApplicationScoped
public class TaskBean {
    final String filename = "tasks.json";
    private ArrayList<Task> tasks;
    public TaskBean() {
        File f = new File(filename);
        if(f.exists()){
            try {
                FileReader filereader = new FileReader(f);
                tasks = JsonbBuilder.create().fromJson(filereader, new
                        ArrayList<Task>() {}.getClass().getGenericSuperclass());
            } catch (FileNotFoundException e) {
                throw new RuntimeException(e);
            }
        }else
            tasks = new ArrayList<Task>();
    }
    public void addTask(Task a) {
        tasks.add(a);
        writeIntoJsonFile();
    }
    public Task getTask(String i) {
        for (Task a : tasks) {
            if (a.getId().equals(i))
                return a;
        }
        return null;
    }
    public ArrayList<Task> getTasks() {
        return tasks;
    }
    public boolean removeTask(String id) {
        for (Task a : tasks) {
            if (a.getId().equals(id)) {
                tasks.remove(a);
                return true;
            }
        }
        return false;
    }
    public boolean updateTask(String id, Task task) {
        for (Task a : tasks) {
            if (a.getId().equals(id)) {
                a.setTitle(task.getTitle());
                a.setDescription(task.getDescription());
                a.setStatus(task.getStatus());
                a.setPriority(task.getPriority());
                writeIntoJsonFile();
                return true;
            }
        }
        return false;
    }
    private void writeIntoJsonFile() {
        try {
            FileOutputStream fileOutputStream = new FileOutputStream(filename);
            JsonbConfig config = new JsonbConfig().withFormatting(true);
            Jsonb jsonb = JsonbBuilder.create(config);
            jsonb.toJson(tasks, fileOutputStream);
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }
    }
}

