package service;
import java.util.List;
import bean.UserBean;
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
        userBean.addUser(a);
        return Response.status(200).entity("A new user is created").build();
    }
    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUser(@PathParam("id")String id) {
        User user = userBean.getUser(id);
        if (user==null)
            return Response.status(200).entity("User with this idea is not found").build();
        return Response.status(200).entity(user).build();
    }
    @DELETE
    @Path("/delete")
    @Produces(MediaType.APPLICATION_JSON)
    public Response removeUser(@QueryParam("id")String id) {
        boolean deleted = userBean.removeUser(id);
        if (!deleted)
            return Response.status(200).entity("User with this idea is not found").build();
        return Response.status(200).entity("deleted").build();
    }
    @PUT
    @Path("/update")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateUser(User a, @HeaderParam("id") String id) {
        boolean updated = userBean.updateUser(id, a);
        if (!updated)
            return Response.status(200).entity("User with this ID is not found").build();
        return Response.status(200).entity("updated").build();
    }
}
