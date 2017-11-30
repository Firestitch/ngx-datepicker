import { Injectable, Inject, Optional } from '@angular/core';
import { FsUtil } from '../common/fsutil.service';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpRequest, HttpEvent, HttpParams, HttpEventType, HttpHeaders } from '@angular/common/http';

@Injectable()
export class FsApiConfig {
  public headers?: object = {};
  public encoding?: string = null;
  public key?: string = null;
  public search?: object = {};

  constructor(@Optional() @Inject('FsApiConfig') private config?: any) {
    Object.assign(this, config || {});
  }

  public appendHeader(name: string, value: string) {
     this.headers[name] = value;
  }
}

@Injectable()
export class FsApi {
  constructor(private FsApiConfig: FsApiConfig, private FsUtil: FsUtil, private http: HttpClient) {}

  public get(url, config?: FsApiConfig) {
    return this.request('GET', url, {}, config);
  }

  public post(url, data?: object, config?: FsApiConfig): Observable<any> {
    return this.request('POST', url, data, config);
  }

  public put(url, data?: object, config?: FsApiConfig): Observable<any> {
    return this.request('PUT', url, data, config);
  }

  public delete(url, data?: object, config?: FsApiConfig): Observable<any> {
      return this.request('DELETE', url, data, config);
  }

  public request(method: string, url: string, data?: object, config?: FsApiConfig): Observable<any> {

    config = Object.assign({}, this.FsApiConfig, config);
    //clearSlowAlert();
    let headers = new HttpHeaders();
    this.FsUtil.each(config.headers, function(value, name) {
      headers = headers.set(name, value);
    });

    data = Object.assign({}, data);

    let hasFile = false;
    //this.sanitize(request);

    this.FsUtil.each(data, function(item) {
       if (item instanceof File || item instanceof Blob) {
        hasFile = true;
        config.encoding = 'formdata';
      }
    });

    if (config.encoding === 'url') {
      headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');

    } else if (config.encoding === 'json') {
      headers = headers.set('Content-Type', 'text/json');

    } else if (config.encoding === 'formdata') {
      headers = headers.delete('Content-Type');
        //config.transformRequest = angular.identity;
        // var request = new FormData();
        // angular.forEach(body, function(item, key) {
        //     if (item != null && item.name) {
        //         request.append(key, item, item.name);
        //     } else {
        //         request.append(key, item);
        //     }
        // });
    }

    //begin(request, headers, config);

    // var timeout = config.uploadTimeout;
    //   var slowTimeout = null;

    //     if(!hasFile) {
    //       timeout = config.timeout;
    //       if(config.slowTimeout) {
    //         slowTimeout = setTimeout(function() {
    //           fsAlert.info('Your request is still processing, please wait...',{ hideDelay: 0, toastClass: 'fs-api-slow-timeout' });
    //         },config.slowTimeout * 1000);
    //     }
    //if(url.match(/^http/)) {


   // let url = config.url + url;
    // if(config.forceHttps && !url.match(/^https/)) {

    //   if(url.match(/^http/)) {
    //     url = url.replace(/^https/,'https');
    //   } else {
    //     url = 'https://' + $location.$$host + ($location.$$port==80 ? '' : ':' + $location.$$port) + url;
    //   }
    // }

    //debugger;

    const body = JSON.stringify(data);

    let params = new HttpParams();
    this.FsUtil.each(config.search, function(value, name) {
      params = params.append(name, value);
    });

    const request = new HttpRequest(method, url, body, {
      headers: headers,
      params: params
    });

    return Observable.create(observer => {

        this.intercept(config, request, new FsApiHandler(this.http))
        .subscribe((event: HttpEvent<any>) => {
          if (event.type === HttpEventType.Sent) {
            return;
          }

          if (event.type === HttpEventType.ResponseHeader) {
            return;
          }

          if (event.type === HttpEventType.DownloadProgress) {
            const kbLoaded = Math.round(event.loaded / 1024);
            return;
          }

          if (event.type === HttpEventType.Response) {
            observer.next(event.body);
          }
      },
      err => {
        observer.error(err);
      },
      () => observer.complete() );
    });
  }

  public intercept(config: FsApiConfig, request: HttpRequest<any>, next: FsApiHandler) {
    return next.handle(request);
  }

  private iso8601(date) {

        const tzo = -date.getTimezoneOffset(),
            dif = tzo >= 0 ? '+' : '-',
            pad = function(num) {
                const norm = Math.abs(Math.floor(num));
                return (norm < 10 ? '0' : '') + norm;
            };

        return date.getFullYear()
                + '-' + pad(date.getMonth() + 1)
                + '-' + pad(date.getDate())
                + 'T' + pad(date.getHours())
                + ':' + pad(date.getMinutes())
                + ':' + pad(date.getSeconds())
                + dif + pad(tzo / 60)
                + ':' + pad(tzo % 60);
    }

    private sanitize(obj) {

        // this.FsUtil.each(obj, function(value, key) {
        //     if (moment && moment.isMoment(value)) {
        //         obj[key] = value.format();

        //     } else if (value instanceof Date) {
        //         obj[key] = this.iso8601(value);

        //     } else if (value === undefined) {
        //         delete obj[key];

        //     } else if (angular.isObject(value)) {
        //         this.sanitize(value);
        //     }
        // });

        return obj;
    }
}


export class FsApiHandler {

  constructor(private http: HttpClient) {}

  handle(request: HttpRequest<any>) {
    return this.http.request(request);
  }
}
