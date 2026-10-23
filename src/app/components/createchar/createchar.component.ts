// Author: Carlos Barreiro
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginsService } from 'src/app/services/logins.service';
import { PlayersService } from 'src/app/services/players.service';

@Component({
  selector: 'app-createchar',
  templateUrl: './createchar.component.html',
  styleUrls: ['./createchar.component.css']
})
export class CreatecharComponent implements OnInit {

  constructor(
    router: Router,
    private loginService: LoginsService,
    private playerService: PlayersService
    ) {
      this.router = router;
   }

  ngOnInit(): void {
  }

  router: Router;

  pointsCheck(atk: HTMLInputElement, lp: HTMLInputElement, int: HTMLInputElement, bbr: HTMLElement, bba: HTMLElement) {
    console.log("Function opened");
    let max: number = 30;
    let choice: number = 0;
    choice = choice + parseInt(atk.value) + parseInt(lp.value) + parseInt(int.value);
    console.log("choice", choice);
    console.log("max", max);
    if (choice > max) {
      console.log("choice > max");
      return alert("The value is over 30!")
    }
    if (choice < max) {
      console.log("choice < max");
      return alert("The value is under 30!")
    }
    if (choice == max) {
      console.log("choice == max");
      bbr.classList.toggle("buttonBlock");
      bba.classList.toggle("buttonBlock");
    } else {
      console.log("Did not enter any If");
      /*alert("The value is under 30!")*/
    }
  }

  createChar(name, atk, int, lp) {
    this.loginService.createChar(name.value, parseInt(atk.value), parseInt(int.value), parseInt(lp.value)).subscribe((data: any) => {
      this.playerService.setCharacter(data);
      this.router.navigate(['/evolution']);
    }, () => {
      alert("Invalid data! Please try again with the correct data!");
    });
  }
}
