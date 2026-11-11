import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SignLoginComponent } from "./sign-login.component";

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: SignLoginComponent}
    ])],
    exports: [RouterModule]
})
export class SignLoginRoutingModule { }
