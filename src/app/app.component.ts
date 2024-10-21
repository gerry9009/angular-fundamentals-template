import { Component, OnInit } from "@angular/core";

import { AuthService } from "./auth/services/auth.service";
import { UserStoreService } from "./user/services/user-store.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  name = "";

  constructor(
    private authService: AuthService,
    private userStoreService: UserStoreService
  ) {}

  ngOnInit() {
    this.userStoreService.getUser();
    this.userStoreService.name$.subscribe((name) => {
      this.name = name;
    });
  }

  logout() {
    this.authService.logout();
  }
}
