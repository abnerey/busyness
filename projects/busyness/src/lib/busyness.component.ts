import { Component, OnInit, OnDestroy, Optional } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { BusynessService } from './busyness.service';
import { Subscription } from 'rxjs';
import { BusynessConfig } from './shared/busyness-config';
import { LoaderType } from './shared/loader-type';
import { filter, debounceTime, tap } from 'rxjs/operators';

const inactiveStyle = style({
    opacity: 0,
    transform: 'translateY(-40px)'
});
const timing = '.3s ease';

@Component({
    selector: 'bs-busyness',
    templateUrl: './busyness.component.html',
    styleUrls: ['./_busyness.component.scss'],
    animations: [
        trigger('flyInOut', [
          transition('void => *', [
            inactiveStyle,
            animate(timing)
          ]),
          transition('* => void', [
            animate(timing, inactiveStyle)
          ])
        ])
    ]
})
export class BusynessComponent implements OnInit, OnDestroy {
    private busySubscription: Subscription;
    private debouncedSubscription: Subscription;
    private loaderSuscription: Subscription;
    private emitionsCounter = 0;
    isActive = false;
    loaderType: string;
    divs: any;

    constructor(private busynessService: BusynessService,
                @Optional() private config: BusynessConfig) {
        if (config) {
            this.initLoader(this.config.loaderType);
        } else {
            this.initLoader(LoaderType.BALL_SCALE_RIPPLE_MULTIPLE);
        }
    }

    ngOnInit() {
        this.initBusySubscriptions();
        this.initLoaderSubscription();
    }

    initLoader(loaderType: LoaderType) {
        console.log(loaderType);
        this.loaderType = loaderType.type;
        this.divs = (loaderType.divs as any) instanceof Array ? loaderType.divs : Array(loaderType.divs);
    }

    initLoaderSubscription() {
        this.loaderSuscription = this.busynessService.loaderSource.subscribe(this.initLoader.bind(this));
    }

    initBusySubscriptions() {
        this.busySubscription = this.busynessService.busynessSubject
        .pipe(
            filter(state => state),
            tap(() => {
                this.emitionsCounter++;
            }),
            filter(() => !this.isActive)
        )
        .subscribe(() => {
            this.isActive = true;
            if (this.debouncedSubscription) {
                this.debouncedSubscription.unsubscribe();
            }
            this.debouncedSubscription = this.busynessService.busynessSubject
            .pipe(
                filter(state => !state),
                tap(() => {
                    if (this.emitionsCounter > 0) {
                        this.emitionsCounter--;
                    }
                }),
                debounceTime(500),
                filter(() => this.emitionsCounter === 0),
            ).subscribe(() => {
                this.isActive = false;
            });
        });
    }



    ngOnDestroy() {
        if (this.busySubscription) {
            this.busySubscription.unsubscribe();
        }
        if (this.debouncedSubscription) {
            this.debouncedSubscription.unsubscribe();
        }
        if (this.loaderSuscription) {
            this.loaderSuscription.unsubscribe();
        }
    }

}
