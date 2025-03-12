import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitText',
  pure:true,
  standalone: true
})
export class LimitTextPipe implements PipeTransform {

  transform(value: string, limit: number = 100): string {
    if (!value) return value; // Se não houver valor, retorna como está
    
    return value.length > limit ? value.substring(0, limit) + '...' : value;
  }

}
