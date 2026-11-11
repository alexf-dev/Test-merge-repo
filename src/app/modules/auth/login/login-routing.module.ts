import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { SignLoginComponent } from "../sign-login/sign-login.component";

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: LoginComponent },
        { path: 'sign', loadChildren: () => import('../sign-login/sign-login.module').then(m => m.SignLoginModule)}
    ])],
    exports: [RouterModule]
})
export class LoginRoutingModule { }
