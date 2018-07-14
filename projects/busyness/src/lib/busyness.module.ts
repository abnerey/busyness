import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BusynessComponent} from './busyness.component';
import {BusynessService} from './busyness.service';
import {BusynessConfig} from './shared/busyness-config';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        BusynessComponent
    ],
    entryComponents: [
        BusynessComponent
    ],
    exports: [
        BusynessComponent
    ]
})
export class BusynessModule {
    static forRoot(config: BusynessConfig): ModuleWithProviders {
        return {
            ngModule: BusynessModule,
            providers: [
                BusynessService,
                {provide: BusynessConfig, useValue: config}
            ]
        };
    }
}
