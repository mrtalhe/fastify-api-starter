
import User from "../../models/user";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import {FastifyRequest, FastifyReply} from "fastify"
class AuthController {

  async register(request: FastifyRequest, reply: FastifyReply) {
    const { name, email, password }: any = request.body;
    // Find a user by email
    const user = await User.findOne({
      where: { email: email },
    });
    if (user) {
     return reply.code(400).send({
        message: "The user already exists",
      }
      );
    }
    // hash user password
   const salt = await bcrypt.genSalt(10);
   const hash =  await bcrypt.hash(password, salt);
    // create and save user to db
   const newUser = await User.create({
      name,
      email,
      password: hash
    });

    await newUser.save();
    reply.code(200).send({
      message: "User registered successfully",
      data: newUser
    })
  }

  async login(request: FastifyRequest, reply: FastifyReply) {
    const {email, password}: any = request.body
    // check user
    const user = await User.findOne({where: {email: email}});
    if(!user) {
     return reply.code(404).send({
        message: "User not found",
      })
    }
    // check password
    const isValid = await bcrypt.compare(password, user.dataValues.password);
    if(!isValid){
     return reply.code(400).send({
      message: "password or email is Invalid",
      })
    }
    // create token
    const secretKey: string | any = process.env.JWT_KEY
    const accessToken = jwt.sign({ id: user.dataValues.id }, secretKey, {
      expiresIn: "5d"
    });
    reply.code(200).send({
      message: "successfuly logged in",
      accessToken: accessToken
    })
  }
}

export default new AuthController();