import { Observable } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { forkJoin, from } from 'rxjs';
import { tap, map, mergeMap, switchMap } from 'rxjs/operators';

import { User, Device, App } from './interface';

export const app = () =>{
  const API_URL = 'https://rx-microadmin.herokuapp.com';

  const extractResponse = <T>() => {
    return map((res: AjaxResponse) => res.response as T);
  };
// Fetching all the users
  const getDataUserDevice = ajax({
    url: `${API_URL}/users`,
    responseType:'json'
  })
  .pipe(
    extractResponse<Array<User>>(),
    switchMap((users: Array<User>): Observable<Array<User>> =>{
      const devices$ = [].concat(users).slice().map(user => {
        const deviceUrl = `${API_URL}/devices?user_id=${user.id}`;
        // Fetching user's devices
        return ajax(deviceUrl).pipe(
          extractResponse<Array<Device>>(),
          map((devices:Array<Device>):User =>{
            // Merging each user object with devices
            return{
              ...user, 
              devices
            }
          })
        )
      })
      // Running users' devices reqeusts concurrently (like Promise.all)
      return forkJoin(devices$)
    }), 

    switchMap((users: Array<User>):Observable<Array<User>> =>{
      const users$ = users.map(user => {
        // For each users' device fetch those apps
        const userDevices$ = user.devices.map(devices => {
          const apps$ = ajax(`${API_URL}/apps?host_id=${devices.id}`)
          return apps$.pipe(
            extractResponse<Array<App>>(),
            map((apps: Array<App>): Device => {
            // calculate total app's size 
              const appSizeTotal = apps.reduce((total, app) => {
                return total + app["size"]
              }, 0)
              // calculate device load percentage for each user's device 
              const load = Math.round(appSizeTotal*100/devices.capacity)        
              return { 
                ...devices,
                apps,
                load
              };
            })  
          );
        }); 
        // Running orders' items request concurrently         
        return forkJoin(userDevices$).pipe(
          map(devices => {
            return {
              ...user,
              devices
            }
          })
        );
      });
      return forkJoin(users$);
    })
  )
  
  getDataUserDevice.subscribe(result => {
    console.log(result)
  });

}