import { bootstrapApplication } from '@angular/platform-browser';
import { ApplicationRef } from '@angular/core';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

export default function bootstrap(): Promise<ApplicationRef> {
  return bootstrapApplication(AppComponent, config)
    .then((appRef) => {
      return appRef;
    })
    .catch((err) => {
      console.error('Server bootstrap failed:', err);
      throw err;
    });
}
