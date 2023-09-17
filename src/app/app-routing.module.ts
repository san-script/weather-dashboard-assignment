import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardModule } from './dashboard/dashboard.module';

const routes: Routes = [
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) }, // Lazy-loaded module

  { path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) }, // Your regular routes
  { path: '**', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) }, // The default route for unmatched routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
