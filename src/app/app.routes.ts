import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FormTestComponent } from './pages/form-test/form-test.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'form-test', component: FormTestComponent }
];
