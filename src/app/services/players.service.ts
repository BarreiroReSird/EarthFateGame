import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(  ) { }

    /* Player data */
    playerID: any;

    /* Meus dados */
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

  /* my player data */
  password: any;
  username: any;

}
