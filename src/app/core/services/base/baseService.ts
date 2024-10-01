
import { HttpClient } from "@angular/common/http"
import { inject } from "@angular/core";

export class Service {
    private headers = {
        'Content-Type': 'application/json'
    }
    protected options = { headers: this.headers }
    protected uri = "http://localhost:3000";

    protected http = inject(HttpClient)
}