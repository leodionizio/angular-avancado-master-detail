import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriesModule } from './pages/categories/categories.module';
import { EntriesModule } from './pages/entries/entries.module';
import { ReportsModule } from './pages/reports/reports.module';

const routes: Routes = [
  {
    path: 'categories',
    loadChildren: () => CategoriesModule,
  },
  {
    path: 'entries',
    loadChildren: () => EntriesModule,
  },
  {
    path: 'reports',
    loadChildren: () => ReportsModule,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
