// Author: Carlos Barreiro
import { Component, OnInit } from '@angular/core';
import { LoginsService } from 'src/app/services/logins.service';
import { Router } from '@angular/router';
import { PlayersService } from 'src/app/services/players.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private loginService: LoginsService,
    router: Router,
    private playerService: PlayersService
    ) {
      this.router = router;
    }

  ngOnInit(): void {
  }

  router: Router;

  login(user: any, pass: any) {
    this.loginService.login(user, pass).subscribe(
      (data: any) => {
        this.playerService.token = data.token;
        this.playerService.username = user;
        this.playerService.password = pass;
        this.playerService.playerID = data.id;
        this.router.navigate(['/home']);
      },
      () => {
        alert("Invalid data! Please try again with the correct data!");
      }
    );
  }

  register(user: any, pass: any, passC: HTMLInputElement) {
    if (pass == passC.value) {
      this.loginService.register(user, pass).subscribe((data: any) => {
        this.playerService.token = data.token;
        this.playerService.username = user;
        this.playerService.password = pass;
        this.playerService.playerID = data.id;
        this.router.navigate(['/creation']);
      }, () => {
        alert("Invalid data! Please try again with the correct data!");
      });
    } else {
      alert("Invalid password data! Please try again with the correct data!");
    }
  }

  /*
  login(user: any, pass: any) {
    this.loginService.login(user, pass).subscribe(
      (data) => {
        if (data['code'] == 200) {
          this.playerService.playerID = data['data'];
          console.log('Player ID:')
          console.log(this.playerService.playerID);
          this.router.navigate(['/home']);
        } else {
          alert("Invalid data! Please try again with the correct data!");
        }
      }
    );
  }

  register(user: any, pass: any, passC: HTMLInputElement) {
    if (pass == passC.value) {
      console.log("user", user);
      console.log("pass", pass);
      console.log("passC", passC.value);
      this.loginService.register(user, pass).subscribe((data) => {
        console.log(data['code']);
        if (data['code'] == 200) {
          this.router.navigate(['/creation']);
        } else {
          alert("Invalid data! Please try again with the correct data!");

        }
      });
    } else {
      console.log("pass", pass,"passC",passC);
      alert("Invalid password data! Please try again with the correct data!");
    }
  }
  */
}
