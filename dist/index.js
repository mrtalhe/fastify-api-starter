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
const fastify_1 = __importDefault(require("fastify"));
const user_routes_1 = __importDefault(require("./modules/user/user.routes"));
require("dotenv/config");
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, fastify_1.default)({
        logger: true,
    });
    app.register(user_routes_1.default, { prefix: "api/users" });
    try {
        yield app.listen({ port: 3000 });
        app.server.address();
    }
    catch (err) {
        app.log.error(err);
        process.exit(1);
    }
});
start();
