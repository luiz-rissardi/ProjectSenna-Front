import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { SignInComponent } from './components/forms/sign-in/sign-in.component';
import { SignUpComponent } from './components/forms/sign-up/sign-up.component';
import { RecoverPasswordComponent } from './components/forms/recover-password/recover-password.component';
import { ConversartionsComponent } from './components/conversartions/conversartions.component';


export const routes: Routes = [
    {
        path: "auth",
        component: AuthComponent,
        children: [
            {
                path: "sign-in",
                component: SignInComponent
            },
            {
                path: "sign-up",
                component: SignUpComponent
            },
            {
                path: "recover-password",
                component: RecoverPasswordComponent
            },
        ]
    },
    {
        path: "home",
        loadComponent: () => import("./pages/home/home.component").then(c => c.HomeComponent),
        children: [
            {
                path: "conversation",
                component:ConversartionsComponent
            },
            {
                path: "group",
                loadComponent: () => import("./components/groups/groups.component").then(c => c.GroupsComponent)
            },
            {
                path: "forum",
                loadComponent: () => import("./components/forums/forums.component").then(c => c.ForumsComponent)
            },
            {
                path: "contact",
                loadComponent: () => import("./components/contacts/contacts.component").then(c => c.ContactsComponent)
            },
        ]
    }
];

// dificuldade que aa pessoas tem de se comunicar em linguas diferentes
//oportunidade perdidas de negocios e pessoais