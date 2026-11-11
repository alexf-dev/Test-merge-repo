import {RouterModule, Routes} from "@angular/router";
import {DashboardPageComponent} from "./dashboard-page/dashboard-page.component";
import {NgModule} from "@angular/core";

const routes: Routes = [
  {path: '', component: DashboardPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {
}
