import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ButtonComponent } from './button/button.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [ButtonComponent, LoaderComponent],
  imports: [CommonModule, FormsModule, HttpClientModule],
  exports: [ButtonComponent, FormsModule, CommonModule, HttpClientModule, LoaderComponent],
})
export class SharedModule {}
