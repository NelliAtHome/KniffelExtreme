import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { NewGameComponent } from './new-game/new-game.component';
import { NotepadComponent } from './notepad/notepad.component';


const routes: Routes = [
    { path: '', component: MenuComponent},
    { path: 'newgame', component: NewGameComponent},
    { path: 'notepad', component: NotepadComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
