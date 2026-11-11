import {TranslateService} from "@ngx-translate/core";
import {Injectable, Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "dateFormat",
    pure: false,
    standalone: true
})
@Injectable({
    providedIn: "root"
})
export class DateFormatPipe implements PipeTransform {
    constructor(private translate: TranslateService) {
    }

    transform(value: Date | string | number, format: string = 'dd.MM.yyyy'): string {
        if (!value) return '';

        const date = new Date(value);
        if (isNaN(date.getTime())) return this.translate.instant('COMMON.INVALID_DATE');

        const options: Intl.DateTimeFormatOptions = this.getFormatOptions(format);

        // @ts-ignore
        return new Intl.DateTimeFormat('ru', options).format(date).replaceAll(',', '').replaceAll('/', '.');
    }

    private getFormatOptions(format: string): Intl.DateTimeFormatOptions {
        const formatOptions: { [key: string]: Intl.DateTimeFormatOptions } = {
            'short': {year: '2-digit', month: '2-digit', day: '2-digit'},
            'medium': {year: 'numeric', month: 'short', day: '2-digit'},
            'long': {year: 'numeric', month: 'long', day: '2-digit', weekday: 'long'},
            'full': {year: 'numeric', month: 'long', day: '2-digit', weekday: 'long', hour: '2-digit', minute: '2-digit'},
            'datetime': {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false},
            'dd.MM.yyyy': {day: '2-digit', month: '2-digit', year: 'numeric'},
            'dd.MM.yyyy HH:mm:ss': {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false},
            'yyyy-MM-dd': {year: 'numeric', month: '2-digit', day: '2-digit'},
            'yyyy-MM-dd HH:mm:ss': {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false}
        };

        return formatOptions[format] || formatOptions['dd.MM.yyyy'];
    }
}
