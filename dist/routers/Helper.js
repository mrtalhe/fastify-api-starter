"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("./../models/user"));
class Helper {
    constructor() {
        this.User = user_1.default;
    }
}
exports.default = Helper;
