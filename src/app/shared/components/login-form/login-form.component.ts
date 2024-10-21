import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "@app/auth/services/auth.service";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent {
  @ViewChild("loginForm") public loginForm!: NgForm;

  email = "";
  password = "";
  isSubmitted = false;
  errorMessage: string | null = null;

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit() {
    this.isSubmitted = true;
    this.errorMessage = null;

    if (this.loginForm.valid) {
      const user = {
        email: this.email,
        password: this.password,
      };

      this.authService.login(user).subscribe({
        next: () => {
          this.router.navigate(["/courses"]);
        },
        error: () => {
          this.errorMessage = "Invalid email or password.";
        },
      });
    }
  }
}
