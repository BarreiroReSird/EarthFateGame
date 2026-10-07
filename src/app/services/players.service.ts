// Author: Carlos Barreiro
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor() { }

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
