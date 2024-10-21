import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { UserService } from "./user.service";

@Injectable({
  providedIn: "root",
})
export class UserStoreService {
  private name$$ = new BehaviorSubject<string>("");
  private isAdmin$$ = new BehaviorSubject<boolean>(false);

  public name$: Observable<string> = this.name$$.asObservable();
  public isAdmin$: Observable<boolean> = this.isAdmin$$.asObservable();

  constructor(private userService: UserService) {}

  getUser(): void {
    this.userService
      .getUser()
      .pipe(
        tap((response) => {
          const user = response.result;

          if (user.name) {
            this.name$$.next(user.name);
          } else {
            this.name$$.next(user.email);
          }

          if (user.role) this.isAdmin$$.next(true);
        })
      )
      .subscribe();
  }

  get isAdmin(): boolean {
    return this.isAdmin$$.getValue();
  }

  set isAdmin(value: boolean) {
    this.isAdmin$$.next(value);
  }
}
