import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Game } from '../../models/Game';
import { GamesService } from '../../services/games.service';
@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css'],
})
export class GameFormComponent implements OnInit {
  @HostBinding('class') classes = 'row';

  game: Game = {
    id: 0,
    title: '',
    description: '',
    image: '',
    created_at: undefined,
  };

  edit: boolean = false;

  constructor(
    private gamesSrv: GamesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    if (params.id) {
      this.gamesSrv.getGame(params.id).subscribe(
        (res: any) => {
          console.log(res);
          this.game = res;
          this.edit = true;
        },
        (err) => console.error(err)
      );
    }
  }

  saveNewGame() {
    delete this.game.created_at;
    delete this.game.id;
    this.gamesSrv.saveGame(this.game).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['/games']);
      },
      (err) => console.error(err)
    );
  }

  updateGame() {
    delete this.game.created_at;
    console.log(this.game);
    this.gamesSrv.updateGame(this.game.id, this.game).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['/games']);
      },
      (err) => console.error(err)
    );
  }
}
