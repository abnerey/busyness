import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { BusynessService } from '../../busyness.service';
import { Observable } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable()
export class BusynessInterceptor implements HttpInterceptor {

    constructor(private readonly busynessService: BusynessService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.busynessService.next(true);
        const obs = next.handle(request).pipe(
            tap(() => this.busynessService.next(false))
        );
        return obs;
    }

}
