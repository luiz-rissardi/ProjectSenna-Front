import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { SignInComponent } from './components/shared/forms/sign-in/sign-in.component';
import { SignUpComponent } from './components/shared/forms/sign-up/sign-up.component';
import { RecoverPasswordComponent } from './components/shared/forms/recover-password/recover-password.component';
import { ConversartionsComponent } from './components/conversartions/conversartions.component';
import { GroupsComponent } from './components/groups/groups.component';
import { ContactsComponent } from './components/contacts/contacts.component';


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
                component:GroupsComponent
            },
            {
                path: "contact",
                component:ContactsComponent
            },
        ]
    }
];

// dificuldade que aa pessoas tem de se comunicar em linguas diferentes
//oportunidade perdidas de negocios e pessoais