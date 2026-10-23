// Author: Carlos Barreiro
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdversarysService {

  constructor() { }

  /* Enemy character data */
  player: any = {
    name: "Dragon",
    id: "",
    atk: 0,
    isMonster: false,
    intelligence: 0,
    health: 0,
    img: "",
    idPlayer: ""
  };
}
