import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { Course } from "@app/store/courses.model";
import { CoursesStateFacade } from "@app/store/courses/courses.facade";

interface Author {
  id: string;
  name: string;
}

@Component({
  selector: "app-course",
  templateUrl: "./course.component.html",
  styleUrls: ["./course.component.scss"],
})
export class CourseComponent implements OnInit, OnChanges {
  @Input() authorsList: Author[] = [];
  @Input() course: Course | null = null;
  @Input() isCreate = true;

  isSubmitted = false;
  isPushedAddedButton = false;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private coursesStoreService: CoursesStoreService,
    private coursesFacade: CoursesStateFacade
  ) {}
  courseForm!: FormGroup;

  textValidator = Validators.compose([
    Validators.required,
    Validators.minLength(2),
  ]);

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.initForm();
    }
  }

  initForm() {
    let selectedAuthorsList: Author[] = [];
    let availableAuthors: Author[] = this.authorsList;

    if (this.course?.authors.length) {
      selectedAuthorsList = this.course.authors
        .map((id) => {
          return availableAuthors.find((author) => author.id === id);
        })
        .filter((author) => author !== undefined) as Author[];

      availableAuthors = availableAuthors.filter(
        (author) => !this.course?.authors.includes(author.id)
      );
    }

    this.courseForm = this.fb.group({
      title: new FormControl(this.course?.title || "", this.textValidator),
      description: new FormControl(
        this.course?.description || "",
        this.textValidator
      ),
      newAuthor: new FormControl("", [
        Validators.minLength(2),
        Validators.pattern("^[a-zA-Z0-9 ]*$"),
      ]),
      authors: new FormArray(this.createAuthorFormArray(availableAuthors)),
      selectedAuthors: new FormArray(
        this.createAuthorFormArray(selectedAuthorsList),
        Validators.required
      ),
      duration: new FormControl(this.course?.duration || "", [
        Validators.required,
        Validators.min(0),
      ]),
    });
  }

  getError(path: string, errorName: string) {
    const formControl = this.courseForm.get(path) as FormControl;

    if (formControl.untouched && !this.isSubmitted) {
      return;
    }

    return formControl.errors?.[errorName];
  }

  createAuthorFormArray(authors: Author[]): FormControl[] {
    return authors.map((author) => new FormControl(author));
  }

  createAuthor() {
    this.isPushedAddedButton = true;
    const author = this.courseForm.get("newAuthor") as FormControl;

    if (author?.valid && author?.value) {
      this.coursesStoreService.createAuthor(author.value);

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
    console.log("Delete Author: ", id);
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
    this.router.navigate([`/courses`]);
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.courseForm.valid) {
      const formValue = this.courseForm.value;

      const course: Course = {
        title: formValue.title,
        description: formValue.description,
        duration: formValue.duration,
        authors: formValue.selectedAuthors.map((author: Author) => author.id),
      };

      if (this.isCreate) {
        this.coursesFacade.createCourse(course);
      } else if (this.course?.id) {
        this.coursesFacade.editCourse(this.course.id, course);
      }

      this.router.navigate([`/courses`]);
    }
  }
}
