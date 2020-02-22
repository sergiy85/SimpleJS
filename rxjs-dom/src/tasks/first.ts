import { Observable, fromEvent, from, of } from 'rxjs';
import { map, debounceTime, delay, switchMap, concatMap } from 'rxjs/operators';

/* First Task 
  ** On a div click toggle "active" class **
*/
export const taskFirst = () =>{

  const boxes = Array.from(document.querySelectorAll('.alpha'));

  fromEvent<MouseEvent>(boxes, 'click').pipe(
    map(event =>{
      for(let box of boxes){
        if(box["id"] === event.target["id"]){
          box.classList.add('active');
        }else{
          box.classList.remove('active');
        }
      }
    })
  ).subscribe()
}

 