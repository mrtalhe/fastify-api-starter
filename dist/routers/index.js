"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("./auth"));
function default_1(app, options, done) {
    app.register(auth_1.default, { prefix: '/auth' });
    done();
}
exports.default = default_1;
