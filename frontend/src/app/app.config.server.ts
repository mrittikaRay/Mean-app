import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { CartService } from './cart.service';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    CartService,
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
