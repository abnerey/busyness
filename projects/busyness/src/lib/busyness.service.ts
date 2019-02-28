import { Injectable } from '@angular/core';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';

@Injectable()
export class BusynessService {
   private readonly _busySource = new BehaviorSubject<boolean>(false);

   get busynessSubject() {
      return this._busySource;
   }

   subscribe(callback): Subscription {
      return this._busySource.subscribe(callback);
   }

   next(...args) {
      const {length} = args;
      const [first] = args;
      if (length) {
         if (first instanceof Promise) {
            this._busySource.next(true);
            const promise = length > 1 ? Promise.all(args) : first;
            (promise as any).finally(() => this._busySource.next(false));
         }

         if (typeof first === 'boolean') {
            this._busySource.next(first);
         }
      }
   }
}
