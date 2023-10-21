"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../../models/user"));
class AuthController {
    register(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = request.body;
            // Find a user by email
            const user = yield user_1.default.findOne({
                where: { email: email },
            });
            if (user) {
                reply.code(400).send({
                    message: "The user already exists",
                });
            }
            // save user to db
            const newuser = yield user_1.default.create({
                name,
                email,
                password,
            });
            yield newuser.save();
            reply.code(200).send({
                message: "User registered successfully",
            });
        });
    }
    login(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.default = new AuthController();
