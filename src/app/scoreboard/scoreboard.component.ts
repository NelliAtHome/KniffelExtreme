import { Component, OnInit, Type } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Scoreboard, Target, Player2, Field, Nullable } from '../entities';
import { DialogScoreComponent } from '../dialog-score/dialog-score.component'

const t_Einser = 0;
const t_Zweier = 1;
const t_Dreier = 2;
const t_Vierer = 3;
const t_Fünfer = 4;
const t_Sechser = 5;
const t_Bonus = 6;
const t_Dreierpasch = 7;
const t_Viererpasch = 8;
const t_ZweiPaare = 9;

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {

  public isMenuCollapsed = true;
  public scoreboard: Scoreboard = { player: [], targets: []};

  constructor(private modalService: NgbModal) {
    this.addTarget(t_Einser, '', 'Einser', '', [1,2,3,4,5,6]);
    this.addTarget(t_Zweier, '', 'Zweier', '', [2,4,6,8,10,12]);
    this.addTarget(t_Dreier, '', 'Dreier', '', [3,6,9,12,15,18]);
    this.addTarget(t_Vierer, '', 'Vierer', '', [4,8,12,16,20,24]);
    this.addTarget(t_Fünfer, '', 'Fünfer', '', [5,10,15,20,25,30]);
    this.addTarget(t_Sechser, '', 'Sechser', '', [6,12,18,24,30,36]);
    this.addTarget(t_Bonus, 'Bonus', 'Bonus', '', []);
    this.addTarget(t_Dreierpasch, '', 'Dreierpasch', 'Alle Augen zählen', []);
    this.addTarget(t_Viererpasch, '', 'Viererpasch', 'Alle Augen zählen', []);
    this.addTarget(t_ZweiPaare, '', 'Zwei Paare', 'Alle Augen zählen', []);

    this.addPlayer('Maili');
    this.addPlayer('Peter');  
}

  ngOnInit(): void {
  }

  addTarget(id: number, type: string, name: string, info: string, possibleScores: number[]) {
    var target: Target = {id: id, type: type, name: name, info: info, possibleScores: possibleScores, fields: []};
    this.scoreboard.targets[id] = target;
  }

  addPlayer(name: string) {
    var id = this.scoreboard.player.length;
    var player: Player2 = {id: id, name: name, joker: 3};
    this.scoreboard.player[id] = player;

    this.scoreboard.targets.forEach(t => {
      var field: Field = {targetId: t.id, playerId: id, score: null, text: null};
      t.fields[id] = field;
    });
  }

  onClick(f: Field){
    if (f.targetId == t_Bonus) return;
    
    const modalRef = this.modalService.open(DialogScoreComponent, { size: 'sm' });
    modalRef.result.then((result) => {
      this.setScore(f.playerId, f.targetId, result);
      this.calculate(f.playerId);
    });
    modalRef.componentInstance.target = this.scoreboard.targets[f.targetId].name ;
    modalRef.componentInstance.possibleScores = this.scoreboard.targets[f.targetId].possibleScores;
  }

  setScore(playerId: number, targetId: number, score: number) {
    this.scoreboard.targets[targetId].fields[playerId].score = score;
  }
  getScore(playerId: number, targetId: number): number {
    return this.scoreboard.targets[targetId].fields[playerId].score ?? 0;    
  }
  
  calculate(playerId: number) {
    var sum = this.getScore(playerId, t_Einser)
            + this.getScore(playerId, t_Zweier)
            + this.getScore(playerId, t_Dreier)
            + this.getScore(playerId, t_Vierer)
            + this.getScore(playerId, t_Fünfer)
            + this.getScore(playerId, t_Sechser);

    if (sum < 73) {
      this.scoreboard.targets[t_Bonus].fields[playerId].text = "Noch " + String(73 - sum);
      this.scoreboard.targets[t_Bonus].fields[playerId].score = null;
    }
    else {
      this.scoreboard.targets[t_Bonus].fields[playerId].text = null;
      this.scoreboard.targets[t_Bonus].fields[playerId].score = 45;
      sum += 45;
    }



  }

}
