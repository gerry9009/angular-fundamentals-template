import { Component } from "@angular/core";
import { mockedCoursesList } from "@app/shared/mocks/mocks";

@Component({
  selector: "app-course-info",
  templateUrl: "./course-info.component.html",
  styleUrls: ["./course-info.component.scss"],
})
export class CourseInfoComponent {
  // Use the names for the input `course`.
  title: string = mockedCoursesList[0].title;
  description: string = mockedCoursesList[0].description;
  id: string = mockedCoursesList[0].id;
  creationDate: Date = new Date(mockedCoursesList[0].creationDate);
  duration: number = mockedCoursesList[0].duration;
  authors: string[] = mockedCoursesList[0].authors;
}
