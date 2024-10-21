import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

interface Course {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  duration: number;
  authors: string[];
}

@Component({
  selector: "app-courses-list",
  templateUrl: "./courses-list.component.html",
  styleUrls: ["./courses-list.component.scss"],
})
export class CoursesListComponent implements OnInit {
  @Input() courses: Course[] = [];
  @Input() editable = false;

  @Output() showCourse = new EventEmitter<string>();
  @Output() editCourse = new EventEmitter<string>();
  @Output() deleteCourse = new EventEmitter<string>();

  ngOnInit(): void {}

  handleShowCourse(courseId: string) {
    this.showCourse.emit(courseId);
  }

  handleEditCourse(courseId: string) {
    this.editCourse.emit(courseId);
  }

  handleDeleteCourse(courseId: string) {
    this.deleteCourse.emit(courseId);
  }
}
