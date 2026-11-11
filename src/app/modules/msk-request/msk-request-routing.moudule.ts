import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {MskRequestFormComponent} from "./msk-request-form/msk-request-form.component";


const routes: Routes = [
  { path: '', component: MskRequestFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MskRequestRoutingMoudule {

}
