// Author: Carlos Barreiro
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PlayersService } from './players.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginsService {

  private baseUrl = environment.apiUrl;

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
    return this.http.get(`${this.baseUrl}/characters/random`, { headers: this.authHeaders() });
  }

  myCharacters() {
    return this.http.get(`${this.baseUrl}/characters`, { headers: this.authHeaders() });
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

