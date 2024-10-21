import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
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
  selector: "app-course-card",
  templateUrl: "./course-card.component.html",
  styleUrls: ["./course-card.component.scss"],
})
export class CourseCardComponent implements OnInit {
  @Input() editable: boolean = true;
  @Input() course: Course | null = null;
  @Output() clickOnShow = new EventEmitter();

  creationDate: Date = new Date(0);
  duration: number = 0;

  authors: Author[] = [];

  constructor(private coursesStoreService: CoursesStoreService) {}

  ngOnInit(): void {
    if (this.course) {
      this.creationDate = new Date(this.course.creationDate);
      this.duration = this.course.duration;
    }

    this.initAuthors();
  }

  handleClickOnShow() {
    this.clickOnShow.emit(this.course?.id);
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
}
