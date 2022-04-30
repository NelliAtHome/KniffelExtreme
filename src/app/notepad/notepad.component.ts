import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-notepad',
  templateUrl: './notepad.component.html',
  styleUrls: ['./notepad.component.css']
})
export class NotepadComponent implements OnInit {

  game: GameService;

  constructor(game: GameService) { 
    this.game = game;
  }

  ngOnInit(): void {
    if (!environment.production) {
      this.game.init();
      this.game.addPlayer('Tester');
      this.game.addPlayer('Tester2');
    }
  }

}
