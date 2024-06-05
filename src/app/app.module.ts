import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { LOCALE_ID, NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { registerLocaleData } from '@angular/common';

import { AppComponent } from './app.component';
import { AppLayoutModule } from './core/layout';
import { AppMenuModule } from './components/menu';
import { AppPageNotFoundComponent } from './features/misc/app-page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { AppTrendsModule } from './features/trends';
import { httpInterceptorProviders } from './core/interceptors/app-http-interceptors';
import { reducers } from './core/store/reducers';

import localeEs from '@angular/common/locales/es';
import { AppProgressBarModule } from './components/progress-bar/progress-bar.module';
import { AppFabButtonModule } from './components/fab-button/fab-button.module';
import { AppDialogModule } from './components/dialog/dialog.module';
registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    AppPageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppTrendsModule,
    AppRoutingModule,
    AppLayoutModule,
    AppMenuModule,
    AppProgressBarModule,
    AppFabButtonModule,
    AppDialogModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot()
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }, httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
