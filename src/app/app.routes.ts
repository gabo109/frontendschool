import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login-component/login-component';
import { AdminGuard } from './services/admin-guard';
import { SignupComponent } from './pages/admin/signup-component/signup-component';
import { UserGuard } from './services/user-guard';
import { DashboardComponent } from './pages/dashboard-component/dashboard-component';
import { WelcomeComponent } from './pages/welcome-component/welcome-component';
import { ProfileComponent } from './pages/profile-component/profile-component';
import { DatosComponent } from './pages/user/datos-component/datos-component';
import { NivelComponent } from './pages/admin/nivel-component/nivel-component';
import { AreaComponent } from './pages/admin/area-component/area-component';
import { AsignaturaComponent } from './pages/admin/asignatura-component/asignatura-component';

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
            {
                path: 'nivel-component',
                component: NivelComponent
            },
            {
                path: 'area-component',
                component: AreaComponent
            },
            {
                path: 'asignatura-component',
                component: AsignaturaComponent
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
            {
                path: 'datos-component',
                component: DatosComponent
            },
        ]
    },
];
