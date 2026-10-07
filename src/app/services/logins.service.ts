// Author: Carlos Barreiro
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PlayersService } from './players.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginsService {

  private baseUrl = environment.production
    ? 'https://your-api-domain.com/api/v1'
    : 'http://localhost:3000/api/v1';

  constructor(
    private http: HttpClient,
    private playerService: PlayersService) { }

  private authHeaders(): HttpHeaders {
    const token = this.playerService.token;
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
    });
  }

  login(user: string, pass: string) {
    return this.http.post(`${this.baseUrl}/auth/login`, { username: user, password: pass });
  }

  register(user: string, pass: string) {
    return this.http.post(`${this.baseUrl}/auth/signup`, { username: user, password: pass });
  }

  randomPlayer() {
    return this.http.get(`${this.baseUrl}/characters/random`);
  }

  createChar(name: string, atk: number, intelligence: number, health: number) {
    return this.http.post(`${this.baseUrl}/characters`, {
      name,
      atk,
      intelligence,
      health,
    }, { headers: this.authHeaders() });
  }

  charStats(id: string) {
    return this.http.get(`${this.baseUrl}/characters/${id}`, { headers: this.authHeaders() });
  }

  upgradeStats(id: string, atk: number, intelligence: number, health: number) {
    return this.http.patch(`${this.baseUrl}/characters/${id}`, {
      atk,
      intelligence,
      health,
    }, { headers: this.authHeaders() });
  }
}

/*
OLD VERSION (old PHP API moreiramoises.pt with FormData and PT field names Nome/Atk/Int/Vida):

import { HttpClient } from '@angular/common/http';

export class LoginsService {

  constructor(
    private  http: HttpClient,
    private playerService: PlayersService) { }

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

  randomPlayer() {
    return this.http.get(this.linkRandomPlayer);
  }

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

  charStats(id) {
    return this.http.get(this.linkCharStats + id);
  }

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
*/

