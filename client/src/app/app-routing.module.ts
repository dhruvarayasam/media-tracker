import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './profile';
import { CollectionsComponent } from './collections/collections.component';

const routes: Routes = [
  { path: 'profile', component: UserProfileComponent },
  { path: 'collections', component: CollectionsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
