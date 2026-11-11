import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class UserpassSharedService {
    private username: string;
    private password: string;
    private oldPassword: string;
    private newPassword: string;

    public setUsername(username: string): void {
        this.username = username;
    }

    public getUsername() {
        return this.username;
    }

    public setPassword(password: string): void {
        this.password = password;
    }

    public getPassword() {
        return this.password;
    }

    public setOldPassword(oldPassword: string): void {
        this.oldPassword = oldPassword;
    }

    public getOldPassword() {
        return this.oldPassword;
    }

    public setNewPassword(newPassword: string): void {
        this.newPassword = newPassword;
    }

    public getNewPassword() {
        return this.newPassword;
    }

    public setLoginPass(username, password) {
        this.username = username;
        this.password = password;
    }

    public setLoginOldNewPasses(username, oldPassword, newPassword) {
        this.username = username;
        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
    }

    public clear() {
        this.username = undefined;
        this.password = undefined;
        this.oldPassword = undefined;
        this.newPassword = undefined;
    }
}
