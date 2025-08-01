import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login-component/login-component';

import { AdminGuard } from './services/admin-guard';
import { SignupComponent } from './pages/admin/signup-component/signup-component';
import { UserGuard } from './services/user-guard';
import { DashboardComponent } from './pages/dashboard-component/dashboard-component';
import { WelcomeComponent } from './pages/welcome-component/welcome-component';
import { ProfileComponent } from './pages/profile-component/profile-component';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'admin',
        component: DashboardComponent,
        canActivate: [AdminGuard],
        children: [
            {
                path: '',
                component: WelcomeComponent
            },
            {
                path: 'profile',
                component: ProfileComponent
            },
            {
                path: 'signup',
                component: SignupComponent
            },
        ]
    },
    {
        path: 'user',
        component: DashboardComponent,
        canActivate: [UserGuard],
        children: [
            {
                path: '',
                component: WelcomeComponent
            },
            {
                path: 'profile',
                component: ProfileComponent
            },
            
        ]
    },
];
