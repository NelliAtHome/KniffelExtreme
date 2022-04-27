import { ParseTreeResult } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Player } from '../entities';

@Component({
  selector: 'app-notepad',
  templateUrl: './notepad.component.html',
  styleUrls: ['./notepad.component.css']
})
export class NotepadComponent implements OnInit {

  players: Array<Player> = [];

  constructor() { }

  ngOnInit(): void {
    let player: Player = {Name: 'Peter', Einer: 3};
    this.players.push(player);
    player = {Name: 'Maili', Einer: 4};
    this.players.push(player);
  }

}
