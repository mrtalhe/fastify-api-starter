// import {fastifyPlugin} from 'fastify-plugin'
// import {Lifetime, asClass} from 'awilix'
// import {FastifyPluginAsync} from 'fastify'
// import {fastifyDiPlugin} from '@inaiat/fastify-di-plugin'
// import UserService from '../modules/user/user.service.js'
// import UserController from '../modules/user/user.controller.js'

// declare module '@inaiat/fastify-di-plugin' {
//   interface Cradle {
//     readonly userServices: UserService;
//     readonly userController: UserController;
//   }
// }

// export default fastifyPlugin<FastifyPluginAsync>(
// 	async fastify => {
// 		await fastify.register(fastifyDiPlugin, {
// 			module: {
// 				userServices: asClass(UserService, {lifetime: Lifetime.SINGLETON}),
// 				userControlleres: asClass(UserController, {lifetime: Lifetime.SINGLETON})
// 			}, injectionMode: 'CLASSIC',

// 		})
// 	},
// 	{name: 'di.config'},
// )
import * as awilix from "awilix"
import { Lifetime, asClass, createContainer } from "awilix";
import UserService from "../modules/user/user.service";
import userController from "../modules/user/user.controller";


const container = createContainer({
  injectionMode: awilix.InjectionMode.PROXY
});


  container.register({
    userService: asClass(UserService, { lifetime: Lifetime.SINGLETON }),
    userController: asClass(userController, { lifetime: Lifetime.SINGLETON }),
  });



export default container;
