import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Scoreboard } from '../entities';
import { ServiceScoreboardService } from '../service-scoreboard.service';

@Component({
  selector: 'app-historie-scoreboard',
  templateUrl: './historie-scoreboard.component.html',
  styleUrls: ['./historie-scoreboard.component.css']
})
export class HistorieScoreboardComponent implements OnInit {

  public scoreboard: Scoreboard = { player: [], targets: []};
  
  constructor( private router: Router, private service: ServiceScoreboardService) { }

  ngOnInit(): void {
    this.scoreboard = this.service.scoreboard;
  }

  back(){
    this.router.navigate(['/history'])
  }

}
