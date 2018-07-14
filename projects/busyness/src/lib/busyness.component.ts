import {Component, OnInit, OnDestroy, Optional} from '@angular/core';
import {BusynessService} from './busyness.service';
import {Subscription} from 'rxjs';
import {BusynessConfig} from './shared/busyness-config';
import {LoaderType} from './shared/loader-type';

@Component({
    selector: 'bs-busyness',
    templateUrl: './busyness.component.html',
    styleUrls: ['./_busyness.component.scss']
})
export class BusynessComponent implements OnInit, OnDestroy {
    private busySuscription: Subscription;
    isBusy = false;
    isInactive = true;
    loaderType = LoaderType.BALL_SCALE_RIPPLE_MULTIPLE.type;
    divs = Array(LoaderType.BALL_SCALE_RIPPLE_MULTIPLE.divs - 1);

    constructor(private busynessService: BusynessService,
                @Optional() private config: BusynessConfig) {
        if (config) {
            this.loaderType = config.loaderType.type;
            this.divs = Array(config.loaderType.divs - 1);
        }
    }

    ngOnInit() {
        this.busySuscription = this.busynessService.subscribe((busyble: Promise<any>) => {
            if (busyble) {
                this.switchBusyness(() => this.isInactive = false);
                busyble.then(() => {
                    this.switchBusyness(() => {
                        setTimeout(() => {
                            this.isInactive = true;
                        }, 1000);
                    });
                });
            }
        });
    }

    ngOnDestroy() {
        this.busySuscription.unsubscribe();
    }

    switchBusyness(callback) {
        callback();
        this.isBusy = !this.isBusy;
    }
}
