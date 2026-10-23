// Author: Carlos Barreiro
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { EvolutionComponent } from './components/evolution/evolution.component';
import { BattleComponent } from './components/battle/battle.component';
import { CreatecharComponent } from './components/createchar/createchar.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:"", component: LoginComponent},
  {path:"login", component: LoginComponent},
  {path:"home", component: HomeComponent, canActivate: [AuthGuard]},
  {path:"evolution", component: EvolutionComponent, canActivate: [AuthGuard]},
  {path:"battle", component: BattleComponent, canActivate: [AuthGuard]},
  {path:"creation", component: CreatecharComponent, canActivate: [AuthGuard]},
  {path:"**", redirectTo: "login"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
