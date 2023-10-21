"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(app, express) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('public'));
}
exports.default = default_1;
