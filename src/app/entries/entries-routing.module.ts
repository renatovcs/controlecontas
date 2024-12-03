import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EntriesComponent } from './entries/entries.component';
import { EntryFormComponent } from './entry-form/entry-form.component';
import { entryResolver } from './guards/entry.resolver';

const routes: Routes = [
  { path: '', component: EntriesComponent},
  { path: 'new', component: EntryFormComponent, resolve: { entry: entryResolver}},
  { path: 'edit/:id', component: EntryFormComponent, resolve: { entry: entryResolver}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntriesRoutingModule { }
