"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("./auth"));
const products_1 = __importDefault(require("./products"));
function default_1(app, options, done) {
    app.register(auth_1.default, { prefix: '/auth' });
    app.register(products_1.default, { prefix: '/products' });
    done();
}
exports.default = default_1;
