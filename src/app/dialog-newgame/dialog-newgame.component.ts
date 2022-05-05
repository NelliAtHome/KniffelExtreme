import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dialog-newgame',
  templateUrl: './dialog-newgame.component.html',
  styleUrls: ['./dialog-newgame.component.css']
})
export class DialogNewgameComponent implements OnInit {

  @Input() players: string[];

  constructor(public activeModal: NgbActiveModal) {
    this.players = [];
   }

  ngOnInit(): void {
  }

}
