import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [BreadcrumbComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  exports: [CommonModule, ReactiveFormsModule, BreadcrumbComponent, RouterModule],
})
export class SharedModule {}
