import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AppMaterialModule } from '../shared/app-material/app-material.module';

import { EntriesRoutingModule } from './entries-routing.module';
import { EntriesComponent } from './entries/entries.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EntryFormComponent } from './entry-form/entry-form.component';
import { EntriesListComponent } from './entries-list/entries-list.component';


@NgModule({
  declarations: [
    EntriesComponent,
    EntryFormComponent,
    EntriesListComponent
  ],
  imports: [
    CommonModule,
    EntriesRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class EntriesModule { }
