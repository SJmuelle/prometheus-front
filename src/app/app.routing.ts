import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';
import { CalendarModule } from './modules/admin/apps/calendar/calendar.module';
import { PqrModule } from './modules/admin/apps/pqr/pqr.module';
import { HojavidaModule } from './modules/admin/apps/hojavida/hojavida.module';
import { MenuModule } from './modules/admin/apps/menu/menu.module';
import { DashboardModule } from './modules/admin/apps/dashboard/dashboard.module';
import { FabricaCreditoModule } from "./modules/admin/apps/fabrica-credito/fabrica-credito.module";
import { PagaduriaModule } from './modules/admin/apps/pagaduria/pagaduria.module';
import { PagoMasivoModule } from './modules/admin/apps/pago-masivo/pago-masivo.module';
import { FechaCorridaModule } from './modules/admin/apps/fecha-corrida/fecha-corrida.module';

// @formatter:off
// tslint:disable:max-line-length
export const appRoutes: Route[] = [

    // Redirect empty path to '/example'
    {path: '', pathMatch : 'full', redirectTo: 'atencion-cliente'},

    // Redirect signed in user to the '/example'
    //
    // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'atencion-cliente'},

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {
                path: 'confirmation-required',
                loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule)},
            {path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule)},
            {path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule)},
            {path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule)},
            {path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule)},
            {path: 'sagicc', loadChildren: () => PqrModule}
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule)},
            {path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule)}
        ]
    },

    // Landing routes
    {
        path: '',
        component  : LayoutComponent,
        data: {
            layout: 'empty'
        },
        children   : [
            {path: 'home', loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.LandingHomeModule)},
        ]
    },
     // Landing routes
    
            {path: 'hv', loadChildren: () => import('app/modules/admin/apps/hojavida/hojavida.module').then(m => m.HojavidaModule)},


    // Admin routes
    {
        path       : '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component  : LayoutComponent,
        resolve    : {
            initialData: InitialDataResolver,
        },
        children   : [
            {
                path: 'dashboard',
                loadChildren: () => DashboardModule
            },
            {
                path: 'atencion-cliente',
                loadChildren: () => HojavidaModule
            },
            {
                path: 'calendar',
                loadChildren: () => CalendarModule
            },
            {
                path: 'pqr',
                loadChildren: () => PqrModule
            },
            {
                path: 'menu',
                loadChildren: () => MenuModule
            },
            {
                path: 'credit-factory',
                loadChildren: () => FabricaCreditoModule
            },
            {
                path: 'run-date',
                loadChildren: () => FechaCorridaModule
            },
            {
                path: 'activities', 
                loadChildren: () => import('app/modules/admin/pages/activities/activities.module').then(m => m.ActivitiesModule),
            },
            {
                path: 'pagaduria',
                loadChildren: () => PagaduriaModule
            }
            // {
            //     path: 'act',
            //     loadChildren: () => ActivitiesModule
            // }
        ]
    },
    // {path: 'pages', children: [

    //     // Activities
    //     {path: 'activities', loadChildren: () => import('app/modules/admin/pages/activities/activities.module').then(m => m.ActivitiesModule)},

    // ]},

    {path: '**', redirectTo: 'dashboard'}
    // {path: '**', redirectTo: 'sign-in'},
    // {path: '*', redirectTo: 'sign-in'}
];
