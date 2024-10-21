import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "@app/auth/services/auth.service";
import { SessionStorageService } from "@app/auth/services/session-storage.service";
import { UserService } from "@app/user/services/user.service";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent {
  @ViewChild("loginForm") public loginForm!: NgForm;
  //Use the names `email` and `password` for form controls.

  email = "";
  password = "";
  isSubmitted = false;
  errorMessage: string | null = null;

  constructor(
    private userService: UserService,
    private sessionStorageService: SessionStorageService,
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit() {
    this.isSubmitted = true;
    this.errorMessage = null;

    if (this.loginForm.valid) {
      const user = {
        email: this.email,
        password: this.password,
      };

      this.authService.login(user).subscribe({
        next: (response) => {
          console.log("Login successful!", response);
          this.router.navigate(["/courses"]);
        },
        error: (error) => {
          console.error("Login failed", error);
          this.errorMessage = "Invalid email or password.";
        },
      });
    } else {
      console.log("Invalid form");
    }
  }
}
