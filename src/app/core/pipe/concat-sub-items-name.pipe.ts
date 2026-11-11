import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'concatSubItemsNames',
    standalone: true
})
export class ConcatSubItemsNamePipe implements PipeTransform {
    transform(value: any[], path: string): string {
        if (!Array.isArray(value) || !path) return '';

        const keys = path.split('.');

        return value
            .map(item => {
                let current = item;
                for (const key of keys) {
                    if (current && typeof current === 'object') {
                        current = current[key];
                    } else {
                        return null;
                    }
                }
                return current;
            })
            .filter(v => !!v)
            .join(', ');
    }
}
