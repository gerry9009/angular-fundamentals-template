import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthorizedGuard } from "./auth/guards/authorized.guard";
import { NotAuthorizedGuard } from "./auth/guards/not-authorized.guard";

export const routes: Routes = [
  /* Add your code here */
  {
    path: "login",
    canActivate: [NotAuthorizedGuard],
    loadChildren: () =>
      import("./shared/components/login-form/login-form.module").then(
        (m) => m.LoginModule
      ),
  },
  {
    path: "registration",
    canActivate: [NotAuthorizedGuard],
    loadChildren: () =>
      import(
        "./shared/components/registration-form/registration-form.module"
      ).then((m) => m.RegistrationModule),
  },
  {
    path: "courses",
    canLoad: [AuthorizedGuard],
    loadChildren: () =>
      import("./features/courses/courses.module").then((m) => m.CoursesModule),
  },
  {
    path: "**",
    redirectTo: "courses",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
