import { Injectable } from '@angular/core';
import { Service } from '../base/baseService';

@Injectable({
  providedIn: 'root'
})
export class TranslateService extends Service {

  constructor() { 
    super("http://127.0.0.1:5000")
  }

  translateText(texts:string[],destLanguage:string){
    return this.http.post(this.uri + "/translate",{
      texts,
      target_language:destLanguage
    })
  }
}
