"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const db = (0, knex_1.default)({
    client: "mysql2",
    connection: {
        host: "localhost",
        user: "root",
        password: "12345678",
        database: "mysql",
    },
    useNullAsDefault: true
});
db.raw('SELECT 1+1 AS result')
    .then(() => {
    console.log('connected to db');
})
    .catch((error) => {
    console.error('cannot connect to db', error);
});
exports.default = db;
