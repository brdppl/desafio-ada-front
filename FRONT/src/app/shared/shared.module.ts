import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from '../core/material.module';
import { CardComponent } from './components/card/card.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LMarkdownEditorModule } from 'ngx-markdown-editor';

@NgModule({
  declarations: [
    HeaderComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LMarkdownEditorModule
  ],
  exports: [
    HeaderComponent,
    CardComponent
  ]
})
export class SharedModule { }
