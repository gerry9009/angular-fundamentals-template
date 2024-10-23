import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { Course } from "@app/store/courses.model";
import { CoursesStateFacade } from "@app/store/courses/courses.facade";
import { Observable } from "rxjs";

interface Author {
  id: string;
  name: string;
}

@Component({
  selector: "app-course-info",
  templateUrl: "./course-info.component.html",
  styleUrls: ["./course-info.component.scss"],
})
export class CourseInfoComponent implements OnInit {
  //course: Course | null = null;
  course$: Observable<Course | null> = this.coursesFacade.course$;
  authors: Author[] = [];

  creationDate: Date = new Date(0);
  duration: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private coursesStoreService: CoursesStoreService,

    private coursesFacade: CoursesStateFacade
  ) {}

  ngOnInit(): void {
    this.initCourse();
    this.initAuthors();
  }

  initCourse() {
    this.route.params.subscribe((params) => {
      const courseId = params["id"];

      this.coursesFacade.getSingleCourse(courseId);

      this.course$.subscribe((course) => {
        if (course) {
          if (course.creationDate) {
            this.creationDate = new Date(course.creationDate);
            this.duration = course.duration;
          }
        }
      });
    });
  }

  initAuthors() {
    this.coursesStoreService.getAllAuthors();
    this.coursesStoreService.authors$.subscribe((authors) => {
      this.authors = authors;
    });
  }

  getAuthor(id: string) {
    return this.authors.find((author) => author.id === id)?.name;
  }

  onClick() {
    this.router.navigate(["/courses"]);
  }
}
