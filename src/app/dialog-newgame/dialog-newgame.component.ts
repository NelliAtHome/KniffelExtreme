import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';

const player = ['Peter', 'Maili', 'Eva', 'René', 'Viola', 'Fabian'];

@Component({
  selector: 'app-dialog-newgame',
  templateUrl: './dialog-newgame.component.html',
  styleUrls: ['./dialog-newgame.component.css']
})
export class DialogNewgameComponent implements OnInit {

  players: string[];

  constructor(public activeModal: NgbActiveModal) {
    this.players = ["",""];
   }

  ngOnInit(): void {
  }

  onPlayers(n: number){
    this.players = [];
    for (var i = 0;i < n;i++) {
      this.players.push("");
    }
  }

  trackByIdx(index: number, obj: any): any {
    return index;
  }

}
