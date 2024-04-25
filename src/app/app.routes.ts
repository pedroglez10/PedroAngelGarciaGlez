import { Routes } from '@angular/router';
import { FormComponent } from './products/components/form/form.component';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./products/components/table/table.component').then(m => m.TableComponent)
    },
    {
        path: 'producto',
        pathMatch: 'full',
        loadComponent: () => import('./products/components/form/form.component').then(m => m.FormComponent)
    },
    {
        path: 'producto/:id',
        pathMatch: 'full',
        loadComponent: () => import('./products/components/form/form.component').then(m => m.FormComponent)
    },
    {
        path: '**',
        redirectTo: ''
    }
];
