import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Player } from '../entities';

@Component({
  selector: 'app-dialog-player',
  templateUrl: './dialog-player.component.html',
  styleUrls: ['./dialog-player.component.css']
})
export class DialogPlayerComponent implements OnInit {

  @Input() player?: Player;

  constructor(public activeModal: NgbActiveModal) { 
  }

  ngOnInit(): void {
  }

}
