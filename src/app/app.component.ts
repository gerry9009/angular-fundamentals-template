import { Component, OnInit } from "@angular/core";

import { AuthService } from "./auth/services/auth.service";
import { UserStoreService } from "./user/services/user-store.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  name = "";
  isAuth = false;

  constructor(
    private authService: AuthService,
    private userStoreService: UserStoreService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subAuth();
  }

  subAuth() {
    this.authService.isAuthorized$.subscribe((isAuth) => {
      this.isAuth = isAuth;

      if (isAuth) {
        this.userStoreService.getUser();
        this.userStoreService.name$.subscribe((name) => {
          this.name = name;
        });
      } else {
        this.name = "";
      }
    });
  }

  logout() {
    this.authService.logout();
    this.name = "";
    this.router.navigate(["/login"]);
  }
}
