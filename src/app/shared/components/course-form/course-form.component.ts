import { Component, OnInit } from "@angular/core";

//TEST purpose
import { mockedAuthorsList } from "@app/shared/mocks/mocks";

@Component({
  selector: "app-course-form",
  templateUrl: "./course-form.component.html",
  styleUrls: ["./course-form.component.scss"],
})
export class CourseFormComponent implements OnInit {
  initAuthors = mockedAuthorsList;

  // constructor(public fb: FormBuilder, public library: FaIconLibrary) {
  //   library.addIconPacks(fas);
  // }
  // courseForm!: FormGroup;

  //TODO if add a course -> change the authors list -> id => author object

  ngOnInit(): void {}
}
