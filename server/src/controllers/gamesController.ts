import { Request, Response } from "express";
import pool from "../database";

class GamesController {
  public async games(req: Request, res: Response) {
    const games = await pool.query("select * from games", (err, rows) => {
      res.json(rows);
    });
  }
  public async game(req: Request, res: Response) {
    const { id } = req.params;
    const game = await pool.query(
      "select * from games where id = ?",
      [id],
      (err, rows) => {
        if (rows.length > 0) {
          return res.json(rows);
        }
        res.status(400).json({ text: "The game doesn't exists" });
      }
    );
  }

  public async create(req: Request, res: Response): Promise<void> {
    await pool.query("insert into games set ?", [req.body]);
    res.json({ message: "Game Saved" });
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    await pool.query("delete from games where id = ?", [id]);
    res.json({ text: "deleting a game number: " + id });
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    await pool.query("update games set ? where id = ?", [req.body, id]);
    res.json({ text: "updating a game number: " + req.params.id });
  }
}

const gamesController = new GamesController();

export default gamesController;
