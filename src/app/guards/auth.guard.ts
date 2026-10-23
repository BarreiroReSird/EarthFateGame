// Author: Carlos Barreiro
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { PlayersService } from '../services/players.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private playerService: PlayersService,
    private router: Router) { }

  canActivate(): boolean {
    if (this.playerService.token) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
