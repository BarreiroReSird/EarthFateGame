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
    private loginService: LoginsService
    ) {
      this.router = router;
   }

  ngOnInit(): void {
  }

  router: Router;

  pointsCheck(atk: HTMLInputElement, lp: HTMLInputElement, int: HTMLInputElement, bbr: HTMLElement, bba: HTMLElement) {
    console.log("Funcao aberta");
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
      console.log("Nao entrou em nenhum If");
      /*alert("The value is under 30!")*/
    }
  }

  createChar(name, atk, int, lp, user, pass) {
    this.loginService.createChar(name.value, atk.value, int.value, lp.value, user.value, pass.value).subscribe((data) => {
      if (data['code'] == 200) {
        console.log("Personagem criado!");
        this.router.navigate(['/login']);
      } else {
        console.log("Code:", data['code']);
        console.log("Name:", name.value);
        console.log("Atk:", atk.value);
        console.log("Int:", int.value);
        console.log("Lp:", lp.value);
        console.log("User:", user.value);
        console.log("Pass:", pass.value);
        alert("Invalid data! Please try again with the correct data!");
      }
    });
  }
}
