import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {
  CourseCardComponent,
  CourseFormComponent,
  LoginFormComponent,
  RegistrationFormComponent,
} from "./shared/components";
import { CoursesComponent } from "./features/courses/courses.component";

export const routes: Routes = [
  /* Add your code here */
  {
    path: "login",
    loadChildren: () =>
      import("./shared/components/login-form/login-form.module").then(
        (m) => m.LoginModule
      ),
  },
  {
    path: "registration",
    loadChildren: () =>
      import(
        "./shared/components/registration-form/registration-form.module"
      ).then((m) => m.RegistrationModule),
  },
  {
    path: "courses",
    loadChildren: () =>
      import("./features/courses/courses.module").then((m) => m.CoursesModule),
  },
  {
    path: "**",
    redirectTo: "courses",
  },

  //   { path: "registration", component: RegistrationFormComponent },
  //   { path: "", component: CoursesComponent },
  //   { path: "courses/add", component: CourseFormComponent },
  //   { path: "courses/:id", component: CourseCardComponent },
  //   { path: "courses/edit/:id", component: CourseFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
