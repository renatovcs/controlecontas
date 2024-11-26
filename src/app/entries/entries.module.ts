import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AppMaterialModule } from '../shared/app-material/app-material.module';

import { EntriesRoutingModule } from './entries-routing.module';
import { EntriesComponent } from './entries/entries.component';




@NgModule({
  declarations: [
    EntriesComponent
  ],
  imports: [
    CommonModule,
    EntriesRoutingModule,
    AppMaterialModule,
    SharedModule
  ]
})
export class EntriesModule { }
