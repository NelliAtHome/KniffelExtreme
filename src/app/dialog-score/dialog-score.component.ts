import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dialog-score',
  templateUrl: './dialog-score.component.html',
  styleUrls: ['./dialog-score.component.css']
})
export class DialogScoreComponent implements OnInit {

  @Input() target: string;
  @Input() possibleScores: number[];

  public score: any;

  constructor(public activeModal: NgbActiveModal) {
    this.target = '';
    this.possibleScores = [];
   
  }

  ngOnInit(): void {
  }

  close() {
    this.activeModal.close(this.score);
  }

}
