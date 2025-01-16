import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { CollectionsComponent } from './collections/collections.component';
import { MoviesComponent } from './movies/movies.component';
import { MusicComponent } from './music/music.component';

export const appRoutes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: 'collections', component: CollectionsComponent },
  {path: 'movies', component: MoviesComponent},
  {path: 'music', component: MusicComponent}
];