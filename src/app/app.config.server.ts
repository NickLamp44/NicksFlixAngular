import { Injectable } from '@angular/core';
import { ApplicationConfig } from '@angular/platform-browser';

export const config: ApplicationConfig = {
  providers: [], // Add required providers here
};

@Injectable({
  providedIn: 'root',
})
export class AppConfig {
  static readonly API_ENDPOINT =
    'https://nicks-flix-364389a40fe7.herokuapp.com/';
}
