import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "@app/auth/services/auth.service";

@Component({
  selector: "app-registration-form",
  templateUrl: "./registration-form.component.html",
  styleUrls: ["./registration-form.component.scss"],
})
export class RegistrationFormComponent implements OnInit {
  registrationForm!: FormGroup;
  isSubmitted = false;

  errorMessage: string[] | null = null;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(6)]),
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    });
  }

  getError(path: string, errorName: string) {
    const formControl = this.registrationForm.get(path) as FormControl;

    if (formControl.untouched && !this.isSubmitted) {
      return;
    }

    return formControl.errors?.[errorName];
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.registrationForm.valid) {
      const user = this.registrationForm.value;

      this.authService.register(user).subscribe({
        next: () => {
          this.authService
            .login(user)
            .subscribe(() => this.router.navigate(["/courses"]));
        },
        error: (error) => {
          this.errorMessage = error.error.errors;
        },
      });
    }
  }
}
