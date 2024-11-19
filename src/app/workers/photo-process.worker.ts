/// <reference lib="webworker" />
import { Buffer } from "buffer";

addEventListener('message', ({ data }) => {
  const photoArrayBlob = data.data
  if(!Reflect.has(photoArrayBlob,"length")){
    postMessage("../../assets/icons/do-utilizador.png");
  }
  const photoBuffer = Buffer.from(photoArrayBlob);
  const url = URL.createObjectURL(new Blob([photoBuffer]))
  postMessage(url);
});
