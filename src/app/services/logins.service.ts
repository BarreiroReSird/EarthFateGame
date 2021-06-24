import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlayersService } from './players.service';

@Injectable({
  providedIn: 'root'
})
export class LoginsService {

  constructor(
    private  http: HttpClient,
    private playerService: PlayersService) { }

  /* Links */
  linkLogin: string = "http://moreiramoises.pt/server/apis/login.php";
  linkRegister: string = 'http://moreiramoises.pt/server/apis/signup.php';
  linkRandomPlayer: string = 'http://moreiramoises.pt/server/apis/get/getRandomChar.php?';
  linkCreateChar: string = 'http://moreiramoises.pt/server/apis/createChart.php';
  linkCharStats: string = 'http://moreiramoises.pt/server/apis/get/getChar.php?PlayerID=';
  linkUpgrade: string = 'http://moreiramoises.pt/server/apis/updateChart.php';

  login(user: any, pass: any) {
    let dataToSend: FormData = new FormData();
    dataToSend.append("username", user);
    dataToSend.append("password", pass);
    return this.http.post(this.linkLogin, dataToSend);
  }

  register(user, pass) {
    let dataToSend: FormData = new FormData();
    dataToSend.append('username', user);
    dataToSend.append('password', pass);
    return this.http.post(this.linkRegister, dataToSend);
  }

  /* Random player */
  randomPlayer() {
    return this.http.get(this.linkRandomPlayer);
  }

  /* Create character */
  createChar(name, atk, int, vida, user, pass) {
    let dataToSend: FormData = new FormData();
    dataToSend.append('name', name);
    dataToSend.append('atk', atk);
    dataToSend.append('isMonster', 'false');
    dataToSend.append('int', int);
    dataToSend.append('vida', vida);
    dataToSend.append('username', user);
    dataToSend.append('password', pass);
    return this.http.post(this.linkCreateChar, dataToSend);
  }

  /* Char account id */
  charStats(id) {
    return this.http.get(this.linkCharStats + id);
  }

  /* Upgrade char */
  upgradeStats(atk, int, vida) {
    let dataToSend: FormData = new FormData();
    dataToSend.append('idChar', this.playerService.player.id);
    dataToSend.append('name', this.playerService.player.name);
    dataToSend.append('atk', atk);
    dataToSend.append('isMonster', 'false');
    dataToSend.append('int', int);
    dataToSend.append('vida', vida);
    dataToSend.append('username', this.playerService.username);
    dataToSend.append('password', this.playerService.password);
    return this.http.post(this.linkUpgrade, dataToSend);
  }

}
