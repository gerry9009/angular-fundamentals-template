import { Component, EventEmitter, Input, Output } from "@angular/core";

import { mockedCoursesList } from "../../mocks/mocks";

@Component({
  selector: "app-course-card",
  templateUrl: "./course-card.component.html",
  styleUrls: ["./course-card.component.scss"],
})
export class CourseCardComponent {
  @Input() editable: boolean = true;
  @Output() clickOnShow = new EventEmitter();

  title: string = mockedCoursesList[1].title;
  description: string = mockedCoursesList[1].description;
  creationDate: Date = new Date(mockedCoursesList[1].creationDate);
  duration: number = mockedCoursesList[1].duration;
  authors: string[] = mockedCoursesList[1].authors;

  handleClickOnShow() {
    this.clickOnShow.emit();
  }
}
