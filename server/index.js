"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 4000;
// const http = require('http').Server(app);
app.use((0, cors_1.default)());
app.get('/api', (req, res) => {
    res.json({
        message: "Hello world",
    });
});
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
