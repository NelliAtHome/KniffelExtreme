import { Component, OnInit, Type } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Scoreboard, Target, Player, Field, Nullable } from '../entities';
import { DialogScoreComponent } from '../dialog-score/dialog-score.component'
import { DialogNewgameComponent } from '../dialog-newgame/dialog-newgame.component';
import { DialogPlayerComponent } from '../dialog-player/dialog-player.component';
import { DialogMenuComponent } from '../dialog-menu/dialog-menu.component';
import { environment } from 'src/environments/environment';

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
const t_DreiPaare = 10;
const t_ZweiDreier = 11;
const t_FullHouse = 12;
const t_GroßesFullHouse = 13;
const t_KleineStraße = 14;
const t_GroßeStraße = 15;
const t_Highway = 16;
const t_Kniffel = 17;
const t_KniffelExtreme = 18;
const t_10oderWeniger = 19;
const t_33oderMehr = 20;
const t_Chance = 21;
const t_SuperChance = 22;
const t_Summe = 23;

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {

  public scoreboard: Scoreboard = { player: [], targets: []};

  constructor(private modalService: NgbModal) {
    this.addTarget(t_Einser, '', 'Einser', '', [1,2,3,4,5,6]);
    this.addTarget(t_Zweier, '', 'Zweier', '', [2,4,6,8,10,12]);
    this.addTarget(t_Dreier, '', 'Dreier', '', [3,6,9,12,15,18]);
    this.addTarget(t_Vierer, '', 'Vierer', '', [4,8,12,16,20,24]);
    this.addTarget(t_Fünfer, '', 'Fünfer', '', [5,10,15,20,25,30]);
    this.addTarget(t_Sechser, '', 'Sechser', '', [6,12,18,24,30,36]);
    this.addTarget(t_Bonus, 'bonus', 'Bonus', '', []);
    this.addTarget(t_Dreierpasch, '', 'Dreierpasch', 'Alle Augen zählen', []);
    this.addTarget(t_Viererpasch, '', 'Viererpasch', 'Alle Augen zählen', []);
    this.addTarget(t_ZweiPaare, '', 'Zwei Paare', 'Alle Augen zählen', []);
    this.addTarget(t_DreiPaare, '', 'Drei Paare', '35 Punkte', [35]);
    this.addTarget(t_ZweiDreier, '', 'Zwei Dreier', '45 Punkte', [45]);
    this.addTarget(t_FullHouse, '', 'Full House', '25 Punkte', [25]);
    this.addTarget(t_GroßesFullHouse, '', 'Großes Full-House', '45 Punkte', [45]);
    this.addTarget(t_KleineStraße, '', 'Kleine Straße', '30 Punkte', [30]);
    this.addTarget(t_GroßeStraße, '', 'Große Straße', '40 Punkte', [40]);
    this.addTarget(t_Highway, '', 'Highway', '50 Punkte', [50]);
    this.addTarget(t_Kniffel, '', 'Kniffel', '50 Punkte', [50]);
    this.addTarget(t_KniffelExtreme, '', 'Kniffel Extreme', '75 Punkte', [75]);
    this.addTarget(t_10oderWeniger, '', '10 oder weniger', '40 Punkte', [40]);
    this.addTarget(t_33oderMehr, '', '33 oder mehr', '40 Punkte', [40]);
    this.addTarget(t_Chance, '', 'Chance', 'Alle Augen zählen', []);
    this.addTarget(t_SuperChance, '', 'Super Chance', 'Alle Augen zählen x2', []);
    this.addTarget(t_Summe, 'summe', 'Summe', '', []);

    this.restoreScoreBoard();
    if (this.scoreboard.player.length == 0) this.onNewGame();
}

  ngOnInit(): void {
  }

  addTarget(id: number, type: string, name: string, info: string, possibleScores: number[]) {
    var target: Target = {id: id, type: type, name: name, info: info, possibleScores: possibleScores, fields: []};
    this.scoreboard.targets[id] = target;
  }

  addPlayer(name: string) {
    var id = this.scoreboard.player.length;
    var player: Player = {id: id, name: name, joker: 3};
    this.scoreboard.player[id] = player;

    this.scoreboard.targets.forEach(t => {
      var field: Field = {targetId: t.id, playerId: id, score: null, text: null};
      t.fields[id] = field;
    });
  }

  onClick(f: Field){
    if (f.targetId == t_Bonus || f.targetId == t_Summe) return;

    const modalRef = this.modalService.open(DialogScoreComponent, { size: 'sm' });
    modalRef.result.then((result) => {
      this.setScore(f.playerId, f.targetId, result);
      this.calculate(f.playerId);
    });
    modalRef.componentInstance.target = this.scoreboard.targets[f.targetId].name ;
    modalRef.componentInstance.possibleScores = this.scoreboard.targets[f.targetId].possibleScores;
  }

  setScore(playerId: number, targetId: number, score: Nullable<number>) {
    this.scoreboard.targets[targetId].fields[playerId].score = score;
  }
  getScore(playerId: number, targetId: number): number {
    return this.scoreboard.targets[targetId].fields[playerId].score ?? 0;    
  }
  
  calculate(playerId: number) {
    var sum: number = this.getScore(playerId, t_Einser)
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

    sum += Number(this.getScore(playerId, t_Dreierpasch))
         + Number(this.getScore(playerId, t_Viererpasch))
         + Number(this.getScore(playerId, t_ZweiPaare))
         + Number(this.getScore(playerId, t_DreiPaare))
         + Number(this.getScore(playerId, t_ZweiDreier))
         + Number(this.getScore(playerId, t_FullHouse))
         + Number(this.getScore(playerId, t_GroßesFullHouse))
         + Number(this.getScore(playerId, t_KleineStraße))
         + Number(this.getScore(playerId, t_GroßeStraße))
         + Number(this.getScore(playerId, t_Highway))
         + Number(this.getScore(playerId, t_Kniffel))
         + Number(this.getScore(playerId, t_KniffelExtreme))
         + Number(this.getScore(playerId, t_10oderWeniger))
         + Number(this.getScore(playerId, t_33oderMehr))
         + Number(this.getScore(playerId, t_Chance))
         + Number(this.getScore(playerId, t_SuperChance));

    if (sum == 0) this.setScore(playerId, t_Summe, null)
    else this.setScore(playerId, t_Summe, sum);

    this.saveScoreBoard();

  }

  onNewGame() {
    const modalRef = this.modalService.open(DialogNewgameComponent, { size: 'sm' });
    modalRef.result.then((result) => {
      if (result != null) this.newGame(result);
    });
  }

  newGame(newPlayer: string[]){
    this.scoreboard.player = [];
    this.scoreboard.targets.forEach(t => {
      t.fields = [];
    });
    newPlayer.forEach(p => {
      this.addPlayer(p);
    });

    this.saveScoreBoard();
  }

  onPlayerClick(player: Player) {

    if (player.joker == 0) return;

    const modalRef = this.modalService.open(DialogPlayerComponent, { size: 'sm' });
    modalRef.result.then((result) => {
      if (result && player.joker > 0) player.joker--;
    });
    modalRef.componentInstance.player = player;
  }

  saveScoreBoard() {
    localStorage.setItem("CurrentScoreBoard", JSON.stringify(this.scoreboard));
  }

  restoreScoreBoard() {
    var board = localStorage.getItem("CurrentScoreBoard")
    if (board !== null){
      this.scoreboard = JSON.parse(board);
    }
  }

  openNav(){
    const modalRef = this.modalService.open(DialogMenuComponent, { size: 'sm' });
    modalRef.result.then((result) => {
      if (result == "NewGame") this.onNewGame();
    });
  }

}
