// Author: Carlos Barreiro
import { Component, OnInit } from '@angular/core';
import { AdversarysService } from 'src/app/services/adversarys.service';
import { LoginsService } from 'src/app/services/logins.service';
import { PlayersService } from 'src/app/services/players.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {

  constructor(
    router: Router,
    private loginService: LoginsService,
    private playerService: PlayersService,
    private adversaryService: AdversarysService
  ) {
    this.router = router;
  }

  ngOnInit(): void {
    this.charStats();
    this.randomPlayer();
  }

  router: Router;

  myPlayerMaxHP: number;
  adversaryMaxHP: number;
  myPlayerHP: number;
  adversaryHP: number;

  dragonInitialLife: number = 0;
  dragonInitialAtck: number = 0;
  dragonInteligence: number = 0;
  knightInitialLife: number = 0;
  knightInitialAtck: number = 0;
  knightInteligence: number = 0;

  isDead: boolean = false;

  hideGif(getReady: HTMLElement) {
    getReady.classList.remove("hideGif");
  }

  boxShow(getReady2: HTMLElement, getReady3: HTMLElement, getReady4: HTMLElement, getReady5: HTMLElement) {
    getReady2.classList.remove("boxShow");
    getReady3.classList.remove("boxShow");
    getReady4.classList.remove("buttonBlock");
    getReady5.classList.add("buttonBlock");
  }

  charStats() {
    this.loginService.myCharacters().subscribe((characters: any) => {
      if (characters.length === 0) {
        return;
      }
      this.playerService.setCharacter(characters[0]);
      this.load();
    });
  }

  randomPlayer() {
    this.loginService.randomPlayer().subscribe((data: any) => {
      this.adversaryService.player.name = data.name;
      this.adversaryService.player.id = data.id;
      this.adversaryService.player.atk = data.atk;
      this.adversaryService.player.isMonster = data.isMonster;
      this.adversaryService.player.intelligence = data.intelligence;
      this.adversaryService.player.health = data.health;
      this.adversaryService.player.img = data.img;
      this.adversaryService.player.idPlayer = data.idPlayer;
      this.load();
    });
  }

  load() {
    let myPlayer: any = document.getElementById("myPlayer");
    let adversary: any = document.getElementById("adversary");
    myPlayer.innerText = this.playerService.player.name;
    adversary.innerText = this.adversaryService.player.name;
    let mpHP: any = document.getElementById("mpHP");
    let advHP: any = document.getElementById("advHP");
    mpHP.innerText = this.playerService.player.health;
    advHP.innerText = this.adversaryService.player.health;
    let mpAtk = document.getElementById('mpAtk');
    let advAtk = document.getElementById('advAtk');
    mpAtk.innerText = this.playerService.player.atk;
    advAtk.innerText = this.adversaryService.player.atk;
    let mpInt = document.getElementById('mpInt');
    let advInt = document.getElementById('advInt');
    mpInt.innerText = this.playerService.player.intelligence;
    advInt.innerText = this.adversaryService.player.intelligence;
  }

  fightTime(knightImage: HTMLElement, dragonImage: HTMLElement) {

    let dead: string = 'noOne';

    this.dragonInitialLife = this.adversaryService.player.health;
    this.dragonInitialAtck = this.adversaryService.player.atk;
    this.dragonInteligence = this.adversaryService.player.intelligence;
    console.log(this.dragonInitialLife, '> dragonInitialLife');
    console.log(this.dragonInitialAtck, '> dragonInitialAtck');
    console.log(this.dragonInteligence, '> dragonInteligence');

    this.knightInitialLife = this.playerService.player.health;
    this.knightInitialAtck = this.playerService.player.atk;
    this.knightInteligence = this.playerService.player.intelligence;
    console.log(this.knightInitialLife, '> knightInitialLife');
    console.log(this.knightInitialAtck, '> knightInitialAtck');
    console.log(this.knightInteligence, '> knightInteligence');

    let dragonRandomize: number = Math.floor(Math.random() * 100) + 1;
    let knightRandomize: number = Math.floor(Math.random() * 100) + 1;
    console.log(dragonRandomize, '> dragonRandomize');
    console.log(knightRandomize, '> knightRandomize');

    this.dragonInteligence = this.dragonInteligence / dragonRandomize;
    this.knightInteligence = this.knightInteligence / knightRandomize;
    console.log(this.dragonInteligence, '> dragonInteligence');
    console.log(this.knightInteligence, '> knightInteligence');

    let yd = this.dragonInteligence * this.dragonInitialAtck;
    let zd = this.dragonInteligence * this.dragonInitialLife;
    let yk = this.knightInteligence * this.knightInitialAtck;
    let zk = this.knightInteligence * this.knightInitialLife;

    let dragonFightAtk = this.dragonInitialAtck + yd;
    let dragonFightDef = this.dragonInitialLife + zd;
    let knightFightAtk = this.dragonInitialAtck + yk;
    let knightFightDef = this.dragonInitialLife + zk;
    console.log(dragonFightAtk, '> dragonFightAtk');
    console.log(dragonFightDef, '> dragonFightDef');
    console.log(knightFightAtk, '> knightFightAtk');
    console.log(knightFightDef, '> knightFightDef');

    this.fight2(knightImage, dragonImage);

    setTimeout(() => {
    while (dead == 'noOne') {


        dragonFightDef = dragonFightDef - knightFightAtk;
        console.log(dragonFightDef, '> Remaining life');

        if (dragonFightDef <= 0) {
            this.isDead = true;
            console.log("Dragon dead");
            alert("You Win! The Dragon is dead!");
            dead = 'dragon';
            return;
        } else {
          this.isDead = false;
          console.log("Dragon life:", dragonFightDef);
        }

        knightFightDef = knightFightDef - dragonFightAtk;
        console.log(knightFightDef, '> Remaining life')

        if (knightFightDef <= 0) {
            this.isDead = true;
            console.log("Knight dead");
            alert("You Lose! The dragon has slain you!");
            dead = 'knight';
            return;
        } else {
          this.isDead = false;
          console.log("knight life:", knightFightDef);
        }
    }
    }, 4000);
  }

  fight2(knightImage, dragonImage){
    if(!this.isDead) {
      knightImage.classList.toggle("animate__bounce");
      dragonImage.classList.toggle("animate__flash");
      setTimeout(() => {
      dragonImage.classList.toggle("animate__flash");
      knightImage.classList.toggle("animate__flash");
      dragonImage.classList.toggle("animate__bounce");
    }, 2000);
    }
  }

  closetB() {

  }

}


