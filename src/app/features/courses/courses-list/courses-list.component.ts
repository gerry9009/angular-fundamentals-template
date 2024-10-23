import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Course } from "@app/store/courses.model";

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

  handleShowCourse(courseId?: string) {
    if (courseId) {
      this.showCourse.emit(courseId);
    }
  }

  handleEditCourse(courseId?: string) {
    if (courseId) {
      this.editCourse.emit(courseId);
    }
  }

  handleDeleteCourse(courseId?: string) {
    if (courseId) {
      this.deleteCourse.emit(courseId);
    }
  }
}
