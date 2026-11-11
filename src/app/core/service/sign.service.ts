import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs";
import Client, { Response } from "../../../assets/ncalayer/dist";

@Injectable({
    providedIn: 'root'
})
export class SignService {
    private wsUrl: string;
    private storageName: string;
    private ws: WebSocket;
    private client: Client;

    constructor(
        private messageService: MessageService,
        private translateService: TranslateService
    ) {
        this.wsUrl = 'wss://127.0.0.1:13579/';
        this.storageName = 'PKCS12';
        this.ws = new WebSocket(this.wsUrl);
        this.client = new Client(this.ws);
    }

    signXml(
        xmlData: string,
        keyAlias: 'SIGN' | 'AUTHENTICATION' = 'AUTHENTICATION'
    ): Observable<Response> {
        xmlData = xmlData || '<?xml version="1.0" encoding="utf-8"?><test>1234567</test>';
        return new Observable(observer => {
            if (this.ws.readyState !== 1) {
                this.showNcaNotFound();
                observer.error('ncaLayerNotFound')
            } else {
                this.client.signXml(this.storageName, keyAlias, xmlData, response => {
                    observer.next(response);
                    observer.complete();
                })
            }
        })
    }

    signXmls(
        xmls: string[],
        keyAlias: 'SIGN' | 'AUTHENTICATION' = 'SIGN'
    ): Observable<Response> {
        return new Observable(observer => {
            if (this.ws.readyState !== 1) {
                this.showNcaNotFound();
                observer.error('ncalayerNotFound')
            } else {
                this.client.signXmls(this.storageName, keyAlias, xmls, response => {
                    observer.next(response);
                    observer.complete();
                })
            }
        })
    }

    showNcaNotFound() {
        this.messageService.add({
            severity: 'warn',
            summary: this.translateService.instant(''),
            detail: this.translateService.instant('')
        })
    }

}
