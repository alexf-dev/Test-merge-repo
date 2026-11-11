import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChangePassComponent } from './change-pass.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ChangePassComponent },
        { path: 'sign', loadChildren: () => import('../sign-login/sign-login.module').then(m => m.SignLoginModule)}
    ])],
    exports: [RouterModule]
})
export class ChangePassRoutingModule { }
