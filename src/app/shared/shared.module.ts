import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { CategoryPipe } from './pipes/category.pipe';
import { DateFormatPipe } from './pipes/date-format.pipe';



@NgModule({
  declarations: [
    ErrorDialogComponent,
    CategoryPipe,
    DateFormatPipe
  ],
  imports: [
    CommonModule,
    AppMaterialModule
  ],
  exports: [
    ErrorDialogComponent,
    CategoryPipe,
    DateFormatPipe
  ]
})
export class SharedModule { }
