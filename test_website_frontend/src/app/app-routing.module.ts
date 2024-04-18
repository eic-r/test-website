// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes'; // Import routes from app.routes.ts

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Use the routes from app.routes.ts
  exports: [RouterModule],
})
export class AppRoutingModule {}
