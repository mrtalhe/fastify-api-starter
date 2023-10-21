"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const bcrypt = __importStar(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
class AuthController {
    register(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = request.body;
            // Find a user by email
            const user = yield user_1.default.findOne({
                where: { email: email },
            });
            if (user) {
                return reply.code(400).send({
                    message: "The user already exists",
                });
            }
            // hash user password
            const salt = yield bcrypt.genSalt(10);
            const hash = yield bcrypt.hash(password, salt);
            // create and save user to db
            const newUser = yield user_1.default.create({
                name,
                email,
                password: hash
            });
            yield newUser.save();
            reply.code(200).send({
                message: "User registered successfully",
                data: newUser
            });
        });
    }
    login(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = request.body;
            // check user
            const user = yield user_1.default.findOne({ where: { email: email } });
            if (!user) {
                return reply.code(404).send({
                    message: "User not found",
                });
            }
            // check password
            const isValid = yield bcrypt.compare(password, user.dataValues.password);
            if (!isValid) {
                return reply.code(400).send({
                    message: "password or email is Invalid",
                });
            }
            // create token
            const secretKey = process.env.JWT_KEY;
            const accessToken = jwt.sign({ id: user.dataValues.id }, secretKey, {
                expiresIn: "5d"
            });
            reply.code(200).send({
                message: "successfuly logged in",
                accessToken: accessToken
            });
        });
    }
}
exports.default = new AuthController();
