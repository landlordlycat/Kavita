import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { ConfigData } from './app/_models/config-data';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

function fetchConfig(): Promise<ConfigData> {
  // const baseElem = document.querySelector('base');
  // const baseHref = (baseElem?.attributes['href' as keyof NamedNodeMap] as any).value;
  // if (baseHref != "/") {
  //   console.log('Overridding api url as base href was found!')
  //   environment.apiUrl = baseHref + 'api/';
  //   console.log('New API Url: ', environment.apiUrl);
  // }
  
  return fetch(environment.apiUrl + 'settings/base-url')
    .then(response => response.text())
    .then(response => {
      const data = new ConfigData(response);
      if (data.baseUrl != "/") {
        console.log('Overridding api url as base href was found!')
        environment.apiUrl = data.baseUrl + 'api/';
        console.log('New API Url: ', environment.apiUrl);
      }
      return data;
    });
}

fetchConfig().then(config => {
  platformBrowserDynamic([ { provide: ConfigData, useValue: config } ])
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));
});