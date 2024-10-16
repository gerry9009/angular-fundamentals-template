import { Component, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

//TEST purpose
import { mockedAuthorsList } from "@app/shared/mocks/mocks";

interface Author {
  id: string;
  name: string;
}
@Component({
  selector: "app-course-form",
  templateUrl: "./course-form.component.html",
  styleUrls: ["./course-form.component.scss"],
})
export class CourseFormComponent implements OnInit {
  isSubmitted = false;
  isPushedAddedButton = false;

  constructor(public fb: FormBuilder, public library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
  courseForm!: FormGroup;

  textValidator = Validators.compose([
    Validators.required,
    Validators.minLength(2),
  ]);

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      title: new FormControl("", this.textValidator),
      description: new FormControl("", this.textValidator),
      newAuthor: new FormControl("", [
        Validators.minLength(2),
        Validators.pattern("^[a-zA-Z0-9 ]*$"),
      ]),
      authors: new FormArray(this.createAuthorFormArray(mockedAuthorsList)),
      selectedAuthors: new FormArray([], Validators.required),
      duration: new FormControl("", [Validators.required, Validators.min(0)]),
    });
  }

  createAuthorFormArray(authors: Author[]): FormControl[] {
    return authors.map((author) => new FormControl(author));
  }

  getError(path: string, errorName: string) {
    const formControl = this.courseForm.get(path) as FormControl;

    if (formControl.untouched && !this.isSubmitted) {
      return;
    }

    return formControl.errors?.[errorName];
  }

  createAuthor() {
    this.isPushedAddedButton = true;
    const author = this.courseForm.get("newAuthor") as FormControl;

    if (author?.valid && author?.value) {
      const newAuthor: Author = {
        id: crypto.randomUUID(),
        name: author.value,
      };
      const authorsArray = this.courseForm.get("authors") as FormArray;
      authorsArray.push(new FormControl(newAuthor));

      this.courseForm.get("newAuthor")?.reset();
      this.isPushedAddedButton = false;
    }
  }

  selectAuthor(id: Author["id"]) {
    const authorsArray = this.courseForm.get("authors") as FormArray;
    const selectedAuthorsArray = this.courseForm.get(
      "selectedAuthors"
    ) as FormArray;

    const index = authorsArray.controls.findIndex(
      (author) => author.value.id === id
    );

    if (index !== -1) {
      const authorControl = authorsArray.at(index) as FormControl;

      selectedAuthorsArray.push(authorControl);
      authorsArray.removeAt(index);
    }
  }

  deleteAuthor(id: Author["id"]) {
    const authorsArray = this.courseForm.get("authors") as FormArray;

    const index = authorsArray.controls.findIndex(
      (author) => author.value.id === id
    );

    if (index !== -1) {
      authorsArray.removeAt(index);
    }
  }

  removeAuthor(id: Author["id"]) {
    const authorsArray = this.courseForm.get("authors") as FormArray;
    const selectedAuthorsArray = this.courseForm.get(
      "selectedAuthors"
    ) as FormArray;

    const index = selectedAuthorsArray.controls.findIndex(
      (author) => author.value.id === id
    );

    if (index !== -1) {
      const authorControl = selectedAuthorsArray.at(index) as FormControl;

      authorsArray.push(authorControl);
      selectedAuthorsArray.removeAt(index);
    }
  }

  onCancel() {
    console.log("Return");
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.courseForm.valid) {
      console.log("Form is valid and submitted.");
      console.log(this.courseForm.value);
    } else {
      console.log("Form is invalid.");
    }
  }
}
