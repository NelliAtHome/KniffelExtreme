import { ParseTreeResult } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

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
  }

}
