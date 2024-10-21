import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CoursesStoreService } from "@app/services/courses-store.service";

interface Course {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  duration: number;
  authors: string[];
}

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
  course: Course | null = null;
  authors: Author[] = [];

  creationDate: Date = new Date(0);
  duration: number = 0;

  constructor(
    private router: Router,
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

      this.coursesStoreService.getCourse(courseId).subscribe((course) => {
        this.course = course;

        this.creationDate = new Date(course.creationDate);
        this.duration = course.duration;
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
