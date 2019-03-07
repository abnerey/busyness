import { NgModule } from '@angular/core';
import {
    MatStepperModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
} from '@angular/material';

@NgModule({
    exports: [
        MatStepperModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule
    ]
})
export class MaterialImplModule {
}
