import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../entities';
import { GameService } from '../game.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  @Input() player: Player;
  game: GameService;

  constructor(game: GameService, private modalService: NgbModal) {
    this.game = game;
    this.player = {};
   }

  ngOnInit(): void {
  }

  onSechser(content: any) {
    this.modalService.open(content, { size: 'sm' }).result.then((result) => {
      this.player.Sechser = result;
      this.game.calculate(this.player);
    });
  }

}
