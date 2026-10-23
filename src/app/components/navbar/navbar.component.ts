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
    this.playerService.clearSession();
    this.router.navigate(['/login']);
  }

}
