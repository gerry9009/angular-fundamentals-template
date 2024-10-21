import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CoursesComponent } from "./courses.component";
import { CourseFormComponent } from "@app/shared/components";
import { SharedModule } from "@app/shared/shared.module";
import { CourseInfoComponent } from "../course-info/course-info.component";
import { AdminGuard } from "@app/user/guards/admin.guard";
import { CoursesListComponent } from "./courses-list/courses-list.component";
import { CommonModule } from "@angular/common";

const routes: Routes = [
  { path: "", component: CoursesComponent },
  { path: "add", component: CourseFormComponent, canActivate: [AdminGuard] },
  { path: ":id", component: CourseInfoComponent },
  {
    path: "edit/:id",
    component: CourseFormComponent,
    canActivate: [AdminGuard],
  },
];

@NgModule({
  declarations: [CoursesComponent, CoursesListComponent],
  imports: [SharedModule, RouterModule.forChild(routes), CommonModule],
})
export class CoursesModule {}
