import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CoursesStoreService } from "@app/services/courses-store.service";

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
  authors: Author[] = [];
  course = null;

  isCreate = true;

  constructor(
    private route: ActivatedRoute,
    private coursesStoreService: CoursesStoreService
  ) {}

  ngOnInit(): void {
    this.initCourse();
    this.initAuthors();
  }

  initCourse() {
    this.route.params.subscribe((params) => {
      const courseId = params["id"];

      if (courseId) {
        this.isCreate = false;

        this.coursesStoreService.getCourse(courseId).subscribe((course) => {
          this.course = course;
        });
      }
    });
  }

  initAuthors() {
    this.coursesStoreService.getAllAuthors();
    this.coursesStoreService.authors$.subscribe((authors) => {
      this.authors = authors;
    });
  }
}
