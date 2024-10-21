import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/shared.module";
import { LoginFormComponent } from "@shared/components";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [{ path: "", component: LoginFormComponent }];

@NgModule({
  // declarations: [LoginFormComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class LoginModule {}
