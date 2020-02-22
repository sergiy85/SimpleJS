import { Observable, fromEvent, from, of } from 'rxjs';
import { map, debounceTime, delay, switchMap, concatMap } from 'rxjs/operators';

/*
Third Task
On any div click, set "active" class on all divs, except clicked div with 2 seconds pause sequentually

*/
export const taskThird = () =>{

const boxes = Array.from(document.querySelectorAll('.omega'));
// console.log(boxes) 

  fromEvent(boxes, 'click')
  .pipe(
    /* фильтруем массив элементов и возвращаем только те, на которых не было клика*/
    map(event => {
      const activeElements = [];
      for(const box of boxes){
        if(box !== event.target){
          // box.classList.remove('active');
          activeElements.push(box);
        }
      }
      // console.log(activeElements) 
      return activeElements;
    }), 

    /*возвращаем новый поток, где к каждому элементу применяем/отменяем активный класс */ 
    switchMap(activeElements => from(activeElements)),
    /*теперь к каждому элементу ставим задержку */ 
    concatMap(activeElements => of(activeElements).pipe(
      // delay(200),
      map(box => {
        box.classList.add("active");
        return box;
      }),
      delay(2000),
      map(box => {
        box.classList.remove("active");
      }),
    )), 
  )

  .subscribe()

}	  

