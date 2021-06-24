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

  /*
  startFight(battleRunLeft: HTMLElement, battleRunRight: HTMLElement) {
    battleRunLeft.classList.add("animate__bounce");
    battleRunLeft.classList.add("animate__delay-2s");
    battleRunRight.classList.add("animate__flash");
    battleRunRight.classList.add("animate__delay-2s");
  }
  */

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

  randomPlayer() {
    this.loginService.randomPlayer().subscribe((data) => {
      if (data['code'] == 200) {
        this.adversaryService.player.name = data['data'].Nome;
        this.adversaryService.player.id = data['data'].ID;
        this.adversaryService.player.atk = data['data'].Atk;
        this.adversaryService.player.isMonset = data['data'].IsMonset;
        this.adversaryService.player.int = data['data'].Int;
        this.adversaryService.player.lp = data['data'].Vida;
        this.adversaryService.player.img = data['data'].Imagem;
        this.adversaryService.player.idPlayer = data['data'].ID_Player;
        this.load();
        /*
        this.myPlayerMaxHP = parseInt(this.playerService.player.lp);
        this.adversaryMaxHP = parseInt(this.adversaryService.player.lp);
        this.myPlayerHP = this.myPlayerMaxHP;
        this.adversaryHP = this.adversaryMaxHP;
        */
      }
    })
  }

  load() {
    let myPlayer: any = document.getElementById("myPlayer");
    let adversary: any = document.getElementById("adversary");
    myPlayer.innerText = this.playerService.player.name;
    adversary.innerText = this.adversaryService.player.name;
    let mpHP: any = document.getElementById("mpHP");
    let advHP: any = document.getElementById("advHP");
    mpHP.innerText = this.playerService.player.lp;
    advHP.innerText = this.adversaryService.player.lp;
    let mpAtk = document.getElementById('mpAtk');
    let advAtk = document.getElementById('advAtk');
    mpAtk.innerText = this.playerService.player.atk;
    advAtk.innerText = this.adversaryService.player.atk;
    let mpInt = document.getElementById('mpInt');
    let advInt = document.getElementById('advInt');
    mpInt.innerText = this.playerService.player.int;
    advInt.innerText = this.adversaryService.player.int;
  }

  /*
      let deadDragon: string = "https://img1.picmix.com/output/stamp/normal/0/6/9/5/1445960_c7bfa.gif";
      let deadKnight: string = "https://img1.picmix.com/output/stamp/normal/5/4/9/5/1445945_6b7a4.gif";
      let dead: boolean;
  */

  fightTime(knightImage: HTMLElement, dragonImage: HTMLElement) {

    /* Char stats */

    let dead: string = 'noOne';

    this.dragonInitialLife = this.adversaryService.player.lp;
    this.dragonInitialAtck = this.adversaryService.player.atk;
    this.dragonInteligence = this.adversaryService.player.int;
    console.log(this.dragonInitialLife, '> dragonInitialLife');
    console.log(this.dragonInitialAtck, '> dragonInitialAtck');
    console.log(this.dragonInteligence, '> dragonInteligence');

    this.knightInitialLife = this.playerService.player.lp;
    this.knightInitialAtck = this.playerService.player.atk;
    this.knightInteligence = this.playerService.player.int;
    console.log(this.knightInitialLife, '> knightInitialLife');
    console.log(this.knightInitialAtck, '> knightInitialAtck');
    console.log(this.knightInteligence, '> knightInteligence');

    /* Random number */

    let dragonRandomize: number = Math.floor(Math.random() * 100) + 1;
    let knightRandomize: number = Math.floor(Math.random() * 100) + 1;
    console.log(dragonRandomize, '> dragonRandomize');
    console.log(knightRandomize, '> knightRandomize');

    /* New stats by inteligence */

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

    /* battle */

    setTimeout(() => {
    while (dead == 'noOne') {


        dragonFightDef = dragonFightDef - knightFightAtk;
        console.log(dragonFightDef, '> Vida restante');

        if (dragonFightDef <= 0) {
            this.isDead = true;
            console.log("Dragon dead");
            alert("You Win! The Dragon is dead!");
            /*this.router.navigate(['/login']);*/
            dead = 'dragon';
            /*break;*/
            return;
        } else {
          this.isDead = false;
          console.log("Dragon life:", dragonFightDef);
        }
        console.log("Turn change (knight > dragon)");

        knightFightDef = knightFightDef - dragonFightAtk;
        console.log(knightFightDef, '> Vida restante')

        if (knightFightDef <= 0) {
            this.isDead = true;
            console.log("Knight dead");
            alert("You Lose! The dragon has slain you!");
            /*this.router.navigate(['/login']);*/
            dead = 'knight';
            /*break;*/
            return;
        } else {
          this.isDead = false;
          console.log("knight life:", knightFightDef);
        }

        console.log("Turn change (dragon > knight)");
    }
    }, 4000);
  }

  fight2(knightImage, dragonImage){
    if(!this.isDead) {
      /* knight attack */
      knightImage.classList.toggle("animate__bounce");
      dragonImage.classList.toggle("animate__flash");
      /* dragon attack */
      setTimeout(() => {
      dragonImage.classList.toggle("animate__flash");
      knightImage.classList.toggle("animate__flash");
      dragonImage.classList.toggle("animate__bounce");
    }, 2000);
    }
  }

  closetB() {
    /* show closet (guns) */

  }

}

