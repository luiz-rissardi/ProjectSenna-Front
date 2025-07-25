import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { SignInComponent } from './components/shared/forms/sign-in/sign-in.component';
import { SignUpComponent } from './components/shared/forms/sign-up/sign-up.component';
import { RecoverPasswordComponent } from './components/shared/forms/recover-password/recover-password.component';
import { authGuard } from './shared/guards/auth/auth.guard';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { CreateGroupComponent } from './components/shared/forms/create-group/create-group.component';
import { EditGroupComponent } from './components/shared/forms/edit-group/edit-group.component';
import { fetchFirstConversationsResolver } from './resolvers/firstConversations/fetch-first-conversations.resolver';
import { fetchFirstGroupsResolver } from './resolvers/firstGroups/fetch-first-groups.resolver';
import { fetchFirstContactsResolver } from './resolvers/firstContacts/fetch-first-contacts.resolver';


export const routes: Routes = [
    {
        path:":email/recover/password",
        component:ChangePasswordComponent,
    },
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
        canActivate:[authGuard],
        resolve:{
            chats:fetchFirstConversationsResolver,
            groups:fetchFirstGroupsResolver,
            contacts:fetchFirstContactsResolver
        },
        loadComponent: () => import("./pages/home/home.component").then(c => c.HomeComponent),
        children: [
            {
                path: "conversation",
                loadComponent: () => import('./components/conversartions/conversartions.component').then(c => c.ConversartionsComponent)
            },
            {
                path: "group",
                loadComponent: () => import('./components/group-component/groups/groups.component').then(c => c.GroupsComponent)
            },
            {
                path: "contact",
                loadComponent: () => import('./components/contacts/contacts.component').then(c => c.ContactsComponent)
            },
            {
                path: "configuration",
                loadComponent: () => import('./components/configuration/configuration.component').then(c => c.ConfigurationComponent)
            },
            {
                path: "edit-user",
                loadComponent: () => import('./components/shared/forms/edit-user/edit-user.component').then(c => c.EditUserComponent)
            },
            {
                path: "privacy",
                loadComponent: () => import('./components/privacy/privacy.component').then(c => c.PrivacyComponent)
            },
            {
                path: "edit-privacy",
                loadComponent: () => import('./components/shared/forms/edit-privacy-data/edit-privacy-data.component').then(c => c.EditPrivacyDataComponent)
            },
            {
                path: "account",
                loadComponent: () => import('./components/account/account.component').then(c => c.AccountComponent)
            },
            {
                path: "add",
                loadComponent: () => import('./components/add/add.component').then(c => c.AddComponent),
            },
            {
                path:"add/group",
                component:CreateGroupComponent
            },
            {
                path:"edit/group",
                component:EditGroupComponent
            },
        ]
    },
    {
        path:"**",
        redirectTo:"home/conversation"
    }
];
