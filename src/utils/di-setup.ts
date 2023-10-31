import { AwilixContainer, Lifetime, asClass, createContainer } from "awilix";
import UserService from "../modules/user/user.service";


const container: AwilixContainer = createContainer();

  container.register({
    userService: asClass(UserService, { lifetime: Lifetime.SINGLETON }),
  });



export default container;