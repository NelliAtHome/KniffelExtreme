import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../entities';
import { GameService } from '../game.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  @Input() player: Player;
  game: GameService;

  constructor(game: GameService) {
    this.game = game;
    this.player = {};
   }

  ngOnInit(): void {
  }

  onSechser() {
    this.player.Sechser = 12;
    this.game.calculate(this.player);
  }

}
