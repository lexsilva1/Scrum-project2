package service;
import java.util.List;
import bean.UserBean;
import dto.Task;
import dto.User;
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
import jakarta.ws.rs.core.StreamingOutput;

@Path("/user")
public class UserService {
    @Inject
    UserBean userBean;
    @GET
    @Path("/all")
    @Produces(MediaType.APPLICATION_JSON)
    public List<User> getUsers() {
        return userBean.getUsers();
    }
    @POST
    @Path("/add")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addUser(User a) {
        if(a.getUsername() == null || a.getPassword() == null || a.getContactNumber() == null || a.getEmail() == null || a.getName() == null){
            return Response.status(400).entity("All elements are required are required").build();
        }
        boolean user = userBean.userExists(a.getUsername());
        if (user) {

            return Response.status(409).entity("User with this username is already exists").build();
        }
        userBean.addUser(a);
        return Response.status(200).entity("A new user is created").build();
    }

    @GET
    @Path("/tasks")
    @Produces(MediaType.APPLICATION_JSON)
       public Response isUserValid(@HeaderParam("username") String username, @HeaderParam("password") String password) {
              boolean user = userBean.userExists(username);
                if (!user) {
                    return Response.status(404).entity("User with this username is not found").build();
                }else {
                    User user1 = userBean.getUser(username);
                    if (!user1.getPassword().equals(password)) {
                        return Response.status(405).entity("Forbidden").build();
                    }
                    return Response.status(200).entity(user1.getTasks()).build();
                }
            }
    @POST
    @Path("/addtask")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addTaskToUser(@HeaderParam("username") String username,@HeaderParam("password") String password, Task task) {
        boolean user = userBean.userExists(username);
        boolean authorized = userBean.isUserAuthorized(username, password);
        if (!user) {
            return Response.status(404).entity("User with this username is not found").build();
        }else if (!authorized) {
            return Response.status(405).entity("Forbidden").build();
        }else {
            task.generateId();task.setinitialStatus();
            userBean.addTaskToUser(username, task);
            User user1 = userBean.getUser(username);
            return Response.status(200).entity(user1).build();
        }
    }
    @DELETE
    @Path("/removetask")
    @Produces(MediaType.APPLICATION_JSON)
    public Response removeTaskFromUser(@HeaderParam("username") String username, @HeaderParam("password") String password, @QueryParam("id")String id) {
        boolean user = userBean.userExists(username);
        boolean authorized = userBean.isUserAuthorized(username, password);
        if (!user) {
            return Response.status(404).entity("User with this username is not found").build();
        }else if (!authorized) {
            return Response.status(405).entity("Forbidden").build();
        }
        userBean.removeTaskFromUser(username, id);
        User user1 = userBean.getUser(username);
        return Response.status(200).entity(user1).build();
    }

    @PUT
    @Path("/{username}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateUser(@PathParam("username")String username, @HeaderParam("password") String password) {
        boolean user = userBean.userExists(username);
        boolean authorized = userBean.isUserAuthorized(username, password);
        if (!user) {
            return Response.status(404).entity("User with this username is not found").build();
        }else if (!authorized) {
            return Response.status(405).entity("Forbidden").build();
        }
        User user1 = userBean.getUser(username);
        return Response.status(200).entity(user1).build();
    }




    @DELETE
    @Path("/delete")
    @Produces(MediaType.APPLICATION_JSON)
    public Response removeUser(@QueryParam("id")String id) {
        boolean deleted = userBean.removeUser(id);
        if (!deleted)
            return Response.status(404).entity("User with this idea is not found").build();
        return Response.status(200).entity("deleted").build();
    }
    @PUT
    @Path("/update")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateUser(User a, @HeaderParam("id") String id) {
        boolean updated = userBean.updateUser(id, a);
        if (!updated)
            return Response.status(404).entity("User with this ID is not found").build();
        return Response.status(200).entity("updated").build();
    }

    @GET
    @Path("/login")
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(@HeaderParam("username") String username, @HeaderParam("password") String password){
        User user = userBean.login(username,password);
        if (user==null) {
            return Response.status(404).entity("User with this username and password is not found").build();
        }else {
            return Response.status(200).entity(user).build();

        }
    }
}
