import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';

@NgModule({
  declarations: [BreadcrumbComponent, PageHeaderComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  exports: [
    // shared modules
    CommonModule,
    ReactiveFormsModule,
    RouterModule,

    // shared components
    BreadcrumbComponent,
    PageHeaderComponent,
  ],
})
export class SharedModule {}
