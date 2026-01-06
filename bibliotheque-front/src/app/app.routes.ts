import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { LibraryComponent } from './library.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'library', component: LibraryComponent },
  { path: '**', redirectTo: '' }
];
