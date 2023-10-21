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
const db_1 = __importDefault(require("./startup/db"));
const fastify_1 = __importDefault(require("fastify"));
const routers_1 = __importDefault(require("./routers"));
require("dotenv/config");
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, fastify_1.default)({
        logger: true,
    });
    db_1.default;
    app.register(routers_1.default, { prefix: "/api" });
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
