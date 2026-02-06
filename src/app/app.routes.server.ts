import { RenderMode, ServerRoute } from '@angular/ssr';
export const serverRoutes: ServerRoute[] = [
    {
        path: ':email/recover/password',
        renderMode: RenderMode.Client,
    },
    {
        path: 'home',
        renderMode: RenderMode.Server,
    },
    {
        path: 'auth',
        renderMode: RenderMode.Client,
    },
    {
        path: 'auth/sign-in',
        renderMode: RenderMode.Prerender,
    },
    {
        path: 'auth/sign-up',
        renderMode: RenderMode.Prerender,
    },
    {
        path: 'auth/recover-password',
        renderMode: RenderMode.Prerender,
    },
    // Rotas para home e suas sub-rotas
    {
        path: 'home/conversation',
        renderMode: RenderMode.Server,
    },
    {
        path: 'home/group',
        renderMode: RenderMode.Server,
    },
    {
        path: 'home/contact',
        renderMode: RenderMode.Server,
    },
    {
        path: 'home/configuration',
        renderMode: RenderMode.Server,
    },
    {
        path: 'home/edit-user',
        renderMode: RenderMode.Prerender,
    },
    {
        path: 'home/privacy',
        renderMode: RenderMode.Prerender,
    },
    {
        path: 'home/edit-privacy',
        renderMode: RenderMode.Prerender,
    },
    {
        path: 'home/account',
        renderMode: RenderMode.Prerender,
    },
    {
        path: 'home/add',
        renderMode: RenderMode.Prerender,
    },
    {
        path:"home/edit/group",
        renderMode: RenderMode.Server,
    },
    {
        path: 'home/add/group',
        renderMode: RenderMode.Server,
    },
    {
        path:"**",
        renderMode:RenderMode.Prerender
    }

];
