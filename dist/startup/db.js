"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('mysql://127.0.0.1:3306/mysql', {
    host: '127.0.0.1',
    dialect: 'mysql',
    password: "12345678",
    username: "root",
});
sequelize.sync({ force: true });
exports.default = sequelize;
