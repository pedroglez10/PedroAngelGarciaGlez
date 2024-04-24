import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./products/components/table/table.component').then(m => m.TableComponent)
    },
    {
        path: 'producto',
        loadComponent: () => import('./products/components/form/form.component').then(m => m.FormComponent)
    },
    {
        path: '**',
        redirectTo: ''
    }
];
