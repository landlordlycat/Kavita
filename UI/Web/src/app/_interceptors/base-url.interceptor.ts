import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigData } from '../_models/config-data';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {

  constructor(private configData: ConfigData) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request);
  }

  // intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

  //   request = request.clone({
  //     url
  //   });

  //   // Take 1 means we don't have to unsubscribe because we take 1 then complete
  //   this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
  //     currentUser = user;

  //     if (currentUser) {
  //       request = request.clone({
  //         setHeaders: {
  //           Authorization: `Bearer ${currentUser.token}`
  //         }
  //       });
  //     }
  //   });

  //   return next.handle(request);
  // }
}
