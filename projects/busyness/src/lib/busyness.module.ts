import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusynessComponent } from './busyness.component';
import { BusynessService } from './busyness.service';
import { BusynessConfig } from './shared/busyness-config';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BusynessInterceptor } from './shared/interceptors/busyness.interceptor';

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
                {provide: BusynessConfig, useValue: config},
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: BusynessInterceptor,
                    multi: true
                }
            ]
        };
    }
}
