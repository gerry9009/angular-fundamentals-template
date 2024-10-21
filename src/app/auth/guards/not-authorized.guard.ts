import { Injectable } from "@angular/core";
import { CanActivate, UrlTree, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class NotAuthorizedGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    if (!this.authService.isAuthorised) {
      return true;
    } else {
      return this.router.createUrlTree(["/courses"]);
    }
  }
}
