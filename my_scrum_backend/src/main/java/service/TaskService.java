package service;
import java.util.List;
import bean.TaskBean;
import dto.Task;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.HeaderParam;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.Path;
@Path("/task")
public class TaskService {
    @Inject

    TaskBean taskBean;
    @GET
    @Path("/all")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Task> getTasks() {
        return taskBean.getTasks();
    }
    @POST
    @Path("/add")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addTask(Task a) {
        taskBean.addTask(a);
        return Response.status(200).entity("A new task is created").build();
    }
    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getTask(@PathParam("id")String id) {
        Task task = taskBean.getTask(id);
        if (task==null)
            return Response.status(200).entity("Task with this idea is not found").build();
        return Response.status(200).entity(task).build();
    }
    @DELETE
    @Path("/delete")
    @Produces(MediaType.APPLICATION_JSON)
    public Response removeTask(@QueryParam("id")String id) {
        boolean deleted = taskBean.removeTask(id);
        if (!deleted)
            return Response.status(200).entity("Task with this idea is not found").build();
        return Response.status(200).entity("deleted").build();
    }
    @PUT
    @Path("/update")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateActivity(Task a, @HeaderParam("id") String id) {
        boolean updated = taskBean.updateTask(id, a);
        if (!updated)
            return Response.status(200).entity("Activity with this idea is not found").build();
        return Response.status(200).entity("updated").build();
    }
}