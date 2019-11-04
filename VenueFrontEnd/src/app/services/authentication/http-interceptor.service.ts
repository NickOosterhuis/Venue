import { Injectable } from '@angular/core';
import {HttpHandler, HttpRequest} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): any {
    if(sessionStorage.getItem('email') && sessionStorage.getItem('token')) {
      request = request.clone({
        setHeaders: {
          Authorization: sessionStorage.getItem('token')
        }
      });
    }

    return next.handle(request);
  }
}
