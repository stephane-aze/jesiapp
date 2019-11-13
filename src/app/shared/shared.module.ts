import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { LoaderComponent } from './loader/loader.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ButtonComponent, LoaderComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [ButtonComponent, CommonModule, HttpClientModule, LoaderComponent],
})
export class SharedModule {}
