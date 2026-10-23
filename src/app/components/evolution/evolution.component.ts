// Author: Carlos Barreiro
import { Component, Input, OnInit } from '@angular/core';
import { LoginsService } from 'src/app/services/logins.service';
import { PlayersService } from 'src/app/services/players.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-evolution',
  templateUrl: './evolution.component.html',
  styleUrls: ['./evolution.component.css']
})
export class EvolutionComponent implements OnInit {

  constructor(
    router: Router,
    private loginService: LoginsService,
    private playerService: PlayersService) {
      this.router = router;
    }

  ngOnInit(): void {
    this.charStats(),
    this.load()
  }

  router: Router;

  upNumber(nb: HTMLInputElement) {
    let x = 0;
    let y: string;
    x = parseInt(nb.value);
    x = x + 1;
    y = x.toString();
    nb.value = y;
  }

  downNumber(nb: HTMLInputElement) {
    let x = 0;
    let y: string;
    x = parseInt(nb.value);
    x = x - 1;
    y = x.toString();
    nb.value = y;
  }

  canTrainToday() {
    return localStorage.yourapp_date !== new Date().toLocaleDateString();
  }

  upgradeTime(nbA: HTMLInputElement, nbE: HTMLInputElement, nbD: HTMLInputElement) {

    if (!this.canTrainToday()) {
      alert('You can only train once a day. Come back tomorrow!');
      return;
    }

    let xVal = 0;
    let yVal = 0;
    let zVal = 0;
    let tot = 0;

    xVal = parseInt(nbA.value);
    yVal = parseInt(nbE.value);
    zVal = parseInt(nbD.value);
    tot = xVal + yVal + zVal;

    console.log('x y z', xVal, yVal, zVal);

    /* upgrade */
    if (tot == 3) {
      this.loginService.upgradeStats(
        this.playerService.player.id,
        parseInt(this.playerService.player.atk) + xVal,
        parseInt(this.playerService.player.intelligence) + yVal,
        parseInt(this.playerService.player.health) + zVal).
        subscribe(() => {
          localStorage.yourapp_date = new Date().toLocaleDateString();
          this.charStats();
        });
    } else {
      alert('Values are not 3!');
    }
  }

  charStats() {
    if (!this.playerService.player.id) {
      return;
    }
    this.loginService.charStats(this.playerService.player.id).subscribe((character: any) => {
      this.playerService.setCharacter(character);
      this.load();
    });
  }

  load() {
    let user = document.getElementById('user');
    let atk = document.getElementById('atk');
    let def = document.getElementById('def');
    let exp = document.getElementById('exp');
    user.innerText = this.playerService.player.name;
    atk.innerText = this.playerService.player.atk;
    def.innerText = this.playerService.player.health;
    exp.innerText = this.playerService.player.intelligence;
    console.log(this.playerService.player.name, this.playerService.player.atk, this.playerService.player.health, this.playerService.player.intelligence);
  }

}

