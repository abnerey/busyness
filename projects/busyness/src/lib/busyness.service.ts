import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';

@Injectable()
export class BusynessService {
   private readonly _busySource = new BehaviorSubject<Observable<any>>(null);

   get busynessSubject() {
      return this._busySource;
   }

   subscribe(callback): Subscription {
      return this._busySource.subscribe(callback);
   }

   next(...args) {
      const {length} = args;
      if (length) {
         this._busySource.next(length > 1 ? Promise.all(args) : args[0]);
      }
   }
}
