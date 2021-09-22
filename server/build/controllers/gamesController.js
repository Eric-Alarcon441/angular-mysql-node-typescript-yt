"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GamesController {
    games(req, res) {
        res.send("Games");
    }
}
const gamesController = new GamesController();
exports.default = gamesController;
