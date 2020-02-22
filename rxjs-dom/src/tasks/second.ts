import { Observable, fromEvent, from, of } from 'rxjs';
import { map, debounceTime, delay, switchMap, concatMap } from 'rxjs/operators';

/* Second Task 
  ** On a div click set "active" class after 
  2 seconds pause and remove it after 2 seconds**
*/
export const taskSecond = () =>{

  const boxes = Array.from(document.querySelectorAll('.betta'));

  fromEvent<MouseEvent>(boxes, 'click').pipe(
    map(event =>{
      for(let box of boxes){
        if(box["id"] === event.target["id"]){
          box.classList.add('active');
        }else{
          box.classList.remove('active');
        }
      }
    }), 
    debounceTime(2000),
    map(() =>{
      for(let box of boxes){
        box.classList.remove('active');
      }
    })
  ).subscribe()
}
 