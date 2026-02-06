import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay, withIncrementalHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { responseInterceptor } from './shared/interceptors/response.interceptor';
import { requestInterceptor } from './shared/interceptors/request.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // provideZoneChangeDetection({ eventCoalescing: true }),
    provideZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(withEventReplay(),withIncrementalHydration()),
    provideHttpClient(
      withFetch(),
      withInterceptors([responseInterceptor, requestInterceptor])
    )

  ]
};
