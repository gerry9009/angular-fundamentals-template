import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { SessionStorageService } from "./session-storage.service";
import { HttpClient } from "@angular/common/http";

interface User {
  name?: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly API_URL = "http://localhost:4000";
  private isAuthorized$$ = new BehaviorSubject<boolean>(
    this.sessionStorageService.getToken() !== null
  );
  public isAuthorized$ = this.isAuthorized$$.asObservable();

  constructor(
    private http: HttpClient,
    private sessionStorageService: SessionStorageService
  ) {}

  login(user: User): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, user).pipe(
      tap((response: any) => {
        if (response.result) {
          this.sessionStorageService.setToken(response.result);
          this.isAuthorized$$.next(true);
        }
      })
    );
  }

  logout() {
    this.sessionStorageService.deleteToken();
    this.isAuthorized$$.next(false);
  }

  register(user: User): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, user);
  }

  get isAuthorised(): boolean {
    return this.isAuthorized$$.value;
  }

  set isAuthorised(value: boolean) {
    this.isAuthorized$$.next(value);
  }

  getLoginUrl(): string {
    return `${this.API_URL}/login`;
  }
}
