import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { CollectionsComponent } from './collections/collections.component';

export const appRoutes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: 'collections', component: CollectionsComponent },
];