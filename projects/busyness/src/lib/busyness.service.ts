import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable()
export class BusynessService {
   private busySource = new BehaviorSubject<Promise<any>>(null);

   subscribe(callback): Subscription {
      return this.busySource.subscribe(callback);
   }

   next(...args) {
      const {length} = args;
      if (length) {
         this.busySource.next(length > 1 ? Promise.all(args) : args[0]);
      }
   }
}
