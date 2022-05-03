import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { NewGameComponent } from './new-game/new-game.component';
import { NotepadComponent } from './notepad/notepad.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
/*
const routes: Routes = [
    { path: '', component: MenuComponent},
    { path: 'newgame', component: NewGameComponent},
    { path: 'notepad', component: NotepadComponent}
];
*/

const routes: Routes = [
  { path: '', component: ScoreboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  exports: [RouterModule]
})
export class AppRoutingModule { }
