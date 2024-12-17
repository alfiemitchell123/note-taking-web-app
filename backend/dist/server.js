"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./db"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
db_1.default.connect((err) => {
    if (err)
        throw err;
    console.log("Connected to MySQL database!");
});
app.get('/', (req, res) => {
    res.send('Welcome to the Note Taking App API!');
});
const PORT = process.env.DB_PORT || 3306;
app.listen(PORT, () => console.log(`Server is running on http://db:${PORT}`));