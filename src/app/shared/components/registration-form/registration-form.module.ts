import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/shared.module";
import { RegistrationFormComponent } from "@shared/components";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [{ path: "", component: RegistrationFormComponent }];

@NgModule({
  declarations: [],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class RegistrationModule {}
