import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../game.service';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css']
})
export class NewGameComponent implements OnInit {

  game: GameService;

  constructor(game: GameService, private router: Router) {
    this.game = game;
   }

  ngOnInit(): void {
  }

  onStart() {
    this.game.init();
    this.game.addPlayer('Peter');
    this.game.addPlayer('Maili');

    this.router.navigate(['/notepad']);
  }
}
