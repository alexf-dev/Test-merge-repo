import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {AuthComponent} from "./auth.component";

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: AuthComponent,
            children: [
                { path: '', redirectTo: 'login', pathMatch: 'full'},
                { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
                { path: 'changepass', loadChildren: () => import('./change-pass/change-pass.module').then(m => m.ChangePassModule) },
            ]
        }
    ])],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
