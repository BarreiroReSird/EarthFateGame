// Author: Carlos Barreiro
import { Component, OnInit } from '@angular/core';
import { LoginsService } from 'src/app/services/logins.service';
import { Router } from '@angular/router';
import { PlayersService } from 'src/app/services/players.service';

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
        this.playerService.playerID = data.id;
        this.playerService.saveSession();
        this.loginService.myCharacters().subscribe(
          (characters: any) => {
            if (characters.length > 0) {
              this.playerService.setCharacter(characters[0]);
              this.router.navigate(['/home']);
            } else {
              this.router.navigate(['/creation']);
            }
          },
          () => this.router.navigate(['/home'])
        );
      },
      (err: any) => {
        alert(this.errorMessage(err));
      }
    );
  }

  checkSession() {
    if (this.playerService.isTokenExpired()) {
      this.playerService.clearSession();
      this.router.navigate(['/login']);
    }
  }

  errorMessage(err: any): string {
    if (err && err.status === 0) {
      return "Cannot reach the server. Please try again.";
    }
    if (err && err.error && typeof err.error.error === 'string') {
      return err.error.error;
    }
    return "Invalid data! Please try again with the correct data!";
  }

  register(user: any, pass: any, passC: HTMLInputElement) {
    if (pass == passC.value) {
      this.loginService.register(user, pass).subscribe((data: any) => {
        this.playerService.token = data.token;
        this.playerService.username = user;
        this.playerService.playerID = data.id;
        this.playerService.saveSession();
        this.router.navigate(['/creation']);
      }, (err: any) => {
        alert(this.errorMessage(err));
      });
    } else {
      alert("Invalid password data! Please try again with the correct data!");
    }
  }

}
