


/// <reference lib="webworker" />
import { Buffer } from "buffer";

export function BufferToUrl(buffer:any){
    const photoArrayBlob = buffer?.data
    if(!Reflect.has(photoArrayBlob || {},"length")){
      return "../../assets/icons/do-utilizador.png";
    }
    const photoBuffer = Buffer.from(photoArrayBlob);
    return URL.createObjectURL(new Blob([photoBuffer]))
}