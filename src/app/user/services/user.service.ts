import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SessionStorageService } from "@app/auth/services/session-storage.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private URL = "http://localhost:4000";

  constructor(
    private http: HttpClient,
    private sessionStorageService: SessionStorageService
  ) {}

  getUser(): Observable<any> {
    const token = this.sessionStorageService.getToken();

    const headers = new HttpHeaders().set("Authorization", `${token}`);

    return this.http.get<any>(`${this.URL}/users/me`, { headers });
  }
}
