// Author: Carlos Barreiro
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor() {
    this.token = localStorage.getItem('ef_token');
    this.playerID = localStorage.getItem('ef_playerID');
    this.username = localStorage.getItem('ef_username');
    this.player.id = localStorage.getItem('ef_character_id') || '';
  }

  /* Player account data */
  playerID: any;
  username: any;
  password: any;
  token: string | null = null;

  /* My character stats */
  player: any = {
    name: "",
    id: "",
    atk: 0,
    intelligence: 0,
    health: 0,
    isMonster: false,
    img: "",
    idPlayer: "",
    weapon: "fists"
  };

  saveSession() {
    localStorage.setItem('ef_token', this.token || '');
    localStorage.setItem('ef_playerID', this.playerID || '');
    localStorage.setItem('ef_username', this.username || '');
    localStorage.setItem('ef_character_id', this.player.id || '');
  }

  setCharacter(character: any) {
    this.player.name = character.name;
    this.player.id = character.id;
    this.player.atk = character.atk;
    this.player.isMonster = character.isMonster;
    this.player.intelligence = character.intelligence;
    this.player.health = character.health;
    this.player.img = character.img;
    this.player.idPlayer = character.idPlayer;
    this.saveSession();
  }

  /*
  OLD VERSION (PT string fields):

  export class PlayersService {
    constructor(  ) { }

    playerID: any;

    player: any = {
      name: "myName",
      id: "",
      atk: "0",
      isMonset: "",
      int: "0",
      lp: "0",
      img: "",
      idPlayer: "",
      weapon: "fists"
    };

    password: any;
    username: any;
  }
  */

}
