import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CoursesComponent } from "./courses.component";
import { CourseFormComponent } from "@app/shared/components";
import { SharedModule } from "@app/shared/shared.module";
import { CourseInfoComponent } from "../course-info/course-info.component";

const routes: Routes = [
  { path: "", component: CoursesComponent },
  { path: "add", component: CourseFormComponent },
  { path: ":id", component: CourseInfoComponent },
  { path: "edit/:id", component: CourseFormComponent },
];

@NgModule({
  declarations: [CoursesComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class CoursesModule {}
