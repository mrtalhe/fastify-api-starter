import User from "../../models/user";


class AuthController {

  async register(request: any, reply: any) {
    const { name, email, password }: any = request.body;

    // Find a user by email
    const user = await User.findOne({
      where: { email: email },
    });
    if (user) {
      reply.code(400).send({
        message: "The user already exists",
      }
      );
    }

    // save user to db
    const newuser = await User.create({
      name,
      email,
      password,
    });


    await newuser.save();
    reply.code(200).send({
      message: "User registered successfully",
    })
  }

  async login(request: any, reply: any) {

  }
}

export default new AuthController();