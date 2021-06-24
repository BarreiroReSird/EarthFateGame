import { Component, Input, OnInit } from '@angular/core';
import { LoginsService } from 'src/app/services/logins.service';
import { PlayersService } from 'src/app/services/players.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-evolution',
  templateUrl: './evolution.component.html',
  styleUrls: ['./evolution.component.css']
})
export class EvolutionComponent implements OnInit {

  constructor(
    http: HttpClient,
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

  oneDayHasPassed() {
    var dt = new Date().toLocaleDateString();
    if (localStorage.yourapp_date == dt) {
      return false;
    }
    localStorage.yourapp_date = dt;
    return true;
  }

  upgradeTime(nbA: HTMLInputElement, nbE: HTMLInputElement, nbD: HTMLInputElement) {

    if (!this.oneDayHasPassed()) {
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
          parseInt(this.playerService.player.atk) + xVal,
          parseInt(this.playerService.player.int) + yVal,
          parseInt(this.playerService.player.lp) + zVal).
          subscribe((data) => {
            console.log(data['code']);
            if (data['code'] == 200) {
              console.log("Success");
              this.charStats();
              this.load();
            } else {
              console.log("Fail");
              console.log('data code',data['code']);
              console.log("A E D", this.playerService.player.atk, this.playerService.player.int, this.playerService.player.lp);
            }
        });
      } else {
        alert('Values are not 3!');
      }
    } else {
      alert('You can only train once a day, and it hasnt been a day yet!');
      this.router.navigate(['/login']);
    }



  }

  charStats() {
    this.loginService.charStats(this.playerService.playerID).subscribe((data) => {
      if (data['code'] == 200) {
        this.playerService.player.name = data['data'].Personagens[0].Nome;
        this.playerService.player.id = data['data'].Personagens[0].ID;
        this.playerService.player.atk = data['data'].Personagens[0].Atk;
        this.playerService.player.isMonset = data['data'].Personagens[0].IsMonset;
        this.playerService.player.int = data['data'].Personagens[0].Int;
        this.playerService.player.lp = data['data'].Personagens[0].Vida;
        this.playerService.player.img = data['data'].Personagens[0].Imagem;
        this.playerService.player.idPlayer = data['data'].Personagens[0].ID_Player;
        this.load();
      }
    });
  }

  load() {
    let user = document.getElementById('user');
    let atk = document.getElementById('atk');
    let def = document.getElementById('def');
    let exp = document.getElementById('exp');
    user.innerText = this.playerService.player.name;
    /*this.inputHelp(atk, def, exp);*/
    atk.innerText = this.playerService.player.atk;
    def.innerText = this.playerService.player.lp;
    exp.innerText = this.playerService.player.int;
    console.log(this.playerService.player.name, this.playerService.player.atk, this.playerService.player.lp, this.playerService.player.int);
  }

  /*
  inputHelp(atk: HTMLElement, def: HTMLInputElement, exp:HTMLInputElement) {
    let x, y, z;

    x = this.playerService.player.atk;
    y = this.playerService.player.lp;
    z = this.playerService.player.int;

    atk.value = x;
    def.value = y;
    exp.value = z;
  }*/

}
