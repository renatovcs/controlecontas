import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EntriesComponent } from './entries/entries.component';
import { EntryFormComponent } from './entry-form/entry-form.component';

const routes: Routes = [
  { path: '', component: EntriesComponent},
  { path: 'new', component: EntryFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntriesRoutingModule { }
