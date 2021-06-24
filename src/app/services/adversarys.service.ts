import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdversarysService {

  constructor() { }

  /* Dados do adversario */
  player: any = {
    name: "Dragon",
    id: "",
    atk: "",
    isMonset: "",
    int: "",
    lp: "",
    img: "",
    idPlayer: ""
  };
}
