// Author: Carlos Barreiro
import { Component, OnInit } from '@angular/core';
import { PlayersService } from 'src/app/services/players.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private playerService: PlayersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.playerService.isTokenExpired()) {
      this.playerService.clearSession();
      this.router.navigate(['/login']);
    }
  }

}
