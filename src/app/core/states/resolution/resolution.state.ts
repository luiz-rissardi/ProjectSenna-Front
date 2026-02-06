import { Injectable, signal } from '@angular/core';

/**
 * State para controlar quais recursos já foram carregados na sessão.
 * Evita múltiplas requisições desnecessárias e é SSR-safe.
 */
@Injectable({
    providedIn: 'root'
})
export class ResolutionState {

    private _conversationsLoaded = signal(false);
    private _groupsLoaded = signal(false);
    private _contactsLoaded = signal(false);

    readonly conversationsLoaded = this._conversationsLoaded.asReadonly();
    readonly groupsLoaded = this._groupsLoaded.asReadonly();
    readonly contactsLoaded = this._contactsLoaded.asReadonly();

    markConversationsLoaded(): void {
        this._conversationsLoaded.set(true);
    }

    markGroupsLoaded(): void {
        this._groupsLoaded.set(true);
    }

    markContactsLoaded(): void {
        this._contactsLoaded.set(true);
    }

    /**
     * Reseta todos os flags de carregamento.
     * Útil quando o usuário faz logout.
     */
    resetAll(): void {
        this._conversationsLoaded.set(false);
        this._groupsLoaded.set(false);
        this._contactsLoaded.set(false);
    }
}
