import {Component, OnInit, OnDestroy, Optional} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {BusynessService} from './busyness.service';
import {Subscription} from 'rxjs';
import {BusynessConfig} from './shared/busyness-config';
import {LoaderType} from './shared/loader-type';
import {filter, debounceTime } from 'rxjs/operators';

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
    isActive = false;
    loaderType = LoaderType.BALL_SCALE_RIPPLE_MULTIPLE.type;
    divs = Array(LoaderType.BALL_SCALE_RIPPLE_MULTIPLE.divs - 1);

    constructor(private busynessService: BusynessService,
                @Optional() private config: BusynessConfig) {
        if (config) {
            this.loaderType = this.config.loaderType.type;
            this.divs = Array(this.config.loaderType.divs - 1);
        }
    }

    ngOnInit() {
        this.busySubscription = this.busynessService.busynessSubject
        .pipe(
            filter(() => !this.isActive)
        )
        .subscribe(() => {
            this.isActive = true;
            if (this.debouncedSubscription) {
                this.debouncedSubscription.unsubscribe();
            }
            this.debouncedSubscription = this.busynessService.busynessSubject
            .pipe(
                debounceTime(1000)
            ).subscribe(() => this.isActive = false);
        });
    }

    ngOnDestroy() {
        if (this.busySubscription) {
            this.busySubscription.unsubscribe();
        }
        if (this.debouncedSubscription) {
            this.debouncedSubscription.unsubscribe();
        }
    }

}
