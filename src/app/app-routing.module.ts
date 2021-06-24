import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { EvolutionComponent } from './components/evolution/evolution.component';
import { BattleComponent } from './components/battle/battle.component';
import { CreatecharComponent } from './components/createchar/createchar.component';

const routes: Routes = [
  {path:"", component: LoginComponent},
  {path:"login", component: LoginComponent},
  {path:"home", component: HomeComponent},
  {path:"evolution", component: EvolutionComponent},
  {path:"battle", component: BattleComponent},
  {path:"creation", component: CreatecharComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
