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
const database_1 = __importDefault(require("../database"));
class GamesController {
    games(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const games = yield database_1.default.query("select * from games", (err, rows) => {
                res.json(rows);
            });
        });
    }
    game(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const game = yield database_1.default.query("select * from games where id = ?", [id], (err, rows) => {
                if (rows.length > 0) {
                    return res.json(rows);
                }
                res.status(400).json({ text: "The game doesn't exists" });
            });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query("insert into games set ?", [req.body]);
            res.json({ message: "Game Saved" });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query("delete from games where id = ?", [id]);
            res.json({ text: "deleting a game number: " + id });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query("update games set ? where id = ?", [req.body, id]);
            res.json({ text: "updating a game number: " + id });
        });
    }
}
const gamesController = new GamesController();
exports.default = gamesController;
