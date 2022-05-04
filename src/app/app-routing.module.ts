import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { NewgameComponent } from './newgame/newgame.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

const routes: Routes = [
  { path: '', component: ScoreboardComponent},
  { path: 'newgame', component: NewgameComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  exports: [RouterModule]
})
export class AppRoutingModule { }
