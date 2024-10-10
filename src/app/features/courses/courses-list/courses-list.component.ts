import { Component, EventEmitter, Input, Output } from "@angular/core";

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
export class CoursesListComponent {
  @Input() courses: Course[] = [];
  @Input() editable = false;

  @Output() showCourse = new EventEmitter<string>();
  @Output() editCourse = new EventEmitter<string>();
  @Output() deleteCourse = new EventEmitter<string>();

  handleShowCourse(courseId: string) {
    this.showCourse.emit(courseId);
  }

  handleEditCourse(courseId: string) {
    this.editCourse.emit(courseId);
  }

  handleDeletCourse(courseId: string) {
    this.deleteCourse.emit(courseId);
  }
}
