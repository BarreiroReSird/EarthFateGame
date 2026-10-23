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
    if (this.isTokenValid()) {
      return true;
    }
    this.playerService.clearSession();
    this.router.navigate(['/login']);
    return false;
  }

  private isTokenValid(): boolean {
    const token = this.playerService.token;
    if (!token) {
      return false;
    }

    try {
      const payloadPart = token.split('.')[1];
      if (!payloadPart) {
        return false;
      }

      const base64 = payloadPart.replace(/-/g, '+').replace(/_/g, '/');
      const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
      const payload = JSON.parse(atob(padded));

      if (typeof payload.exp !== 'number') {
        return false;
      }
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }
}
