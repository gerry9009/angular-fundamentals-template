import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-registration-form",
  templateUrl: "./registration-form.component.html",
  styleUrls: ["./registration-form.component.scss"],
})
export class RegistrationFormComponent implements OnInit {
  registrationForm!: FormGroup;
  isSubmitted = false;

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
      console.log("Form is valid and submitted.");
      console.log(this.registrationForm.value);
    } else {
      console.log("Form is invalid.");
    }
  }
}
