import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class NotificationSharedService {
    private message: any;

    setMessage(data: any) {
        this.message = data;
    }

    getMessage() {
        return this.message;
    }
}
