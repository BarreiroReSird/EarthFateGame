// Author: Carlos Barreiro
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayersService } from 'src/app/services/players.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public playerService: PlayersService,
    private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    localStorage.removeItem('ef_token');
    localStorage.removeItem('ef_playerID');
    localStorage.removeItem('ef_username');
    localStorage.removeItem('ef_character_id');
    this.playerService.token = null;
    this.playerService.playerID = null;
    this.playerService.username = null;
    this.router.navigate(['/login']);
  }

}
