import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FormTestComponent } from './pages/form-test/form-test.component';
import { SignalTestComponent } from './pages/signal-test/signal-test.component';
import { PaginationTestComponent } from './pages/pagination-test/pagination-test.component';
import { PageTestComponent } from './pages/page-test/page-test.component';
import { HeroesTableComponent } from './pages/heroes-table/heroes-table.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'form-test', component: FormTestComponent },
    { path: 'signal-test', component: SignalTestComponent },
    { path: 'pagination-test', component: PaginationTestComponent },
    { path: 'page-test', component: PageTestComponent },
    { path: 'heroes-table', component: HeroesTableComponent}
];
