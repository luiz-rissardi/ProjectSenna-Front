import { Observable } from "rxjs";

export function StreamToJson(source: Observable<any>) {
    return new Observable(subscriber => {
        source.subscribe((data) => {
            const result = `[${data}]`.replace(/}({)/g, '},$1')
            subscriber.next(JSON.parse(result));
        })
    })
}