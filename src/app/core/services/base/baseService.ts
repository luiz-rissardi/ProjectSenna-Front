
import { HttpClient } from "@angular/common/http"
import { inject } from "@angular/core";

export class Service {

    protected options = {
        observe: "response" as const,
    }

    protected http = inject(HttpClient)
    protected uri:string;

    constructor(baseUri:string = "http://localhost:3000"){
        this.uri = baseUri;
    }

    protected toFormData(object: any) {
        const mappedFormData = new FormData();
        Object.keys(object).map(key => {
            mappedFormData.append(key, object[key])
        })
        return mappedFormData;
    }
}