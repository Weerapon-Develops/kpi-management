import { Injectable } from '@angular/core';
import {
  HttpClient
} from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { catchError, } from 'rxjs/operators';
import { AppConfig } from '../app.config';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  protected ServerApiUrl = AppConfig.settings.ServerApiUrl;
  public isLoggedIn: boolean = false; // กำหนดสถานะล็อกอินเริ่มต้นเป็น false
  public redirectUrl: string = ''; // กำหนดตัวแปรสำหรับเก็บ url ที่จะลิ้งค์ไป
  public token: string = '';

  constructor(private http: HttpClient) { }

  async getAPIAsync(strUrl: string, resolveCallBack?: Function | null, rejectCallBack?: Function | null): Promise<Observable<any>> {
    console.log(this.token);

    return new Promise<Observable<any>>((resolve, reject) => {
      this.http.get<any>(this.ServerApiUrl + "/" + strUrl, { headers: this.getHeaderContentTypeJson() }).subscribe({
        next: (res: any) => {
          resolve(res);
          if (resolveCallBack != null) resolveCallBack(res);
        },
        error: (err: any) => {
          reject(err);
          if (rejectCallBack != null) rejectCallBack(err);
        },
        complete: () => { },
      });
    });
  }

  getAPI(strUrl: string): Observable<any> {
    return this.http.get<any>(this.ServerApiUrl + "/" + strUrl)
      .pipe(
        // tap(res => console.log(res)),
        catchError(this.handleError<any>('getAPI'))
      );
  }

  getAPIWithAuth(strUrl: string): Observable<any> {
    if (!this.token) {

      this.token = this.token = localStorage.getItem('token') ?? '';
      // console.error('Token is missing!');
    }

    return this.http.get<any>(this.ServerApiUrl + "/" + strUrl, { headers: this.getHeaderContentTypeJson() })
      .pipe(
        catchError(this.handleError<any>('getAPIWithAuth'))
      );
  }

  async postAPIAsync(strUrl: string, objBody: any, resolveCallBack?: Function | null, rejectCallBack?: Function | null): Promise<Observable<any>> {
    return new Promise<Observable<any>>((resolve, reject) => {
      this.http.post<any>(this.ServerApiUrl + "/" + strUrl, objBody, { headers: this.getHeaderContentTypeJson() }).subscribe({
        next: (res: any) => {
          resolve(res);
          if (resolveCallBack != null) resolveCallBack(res);
        },
        error: (err: any) => {
          reject(err);
          if (rejectCallBack != null) rejectCallBack(err);
        },
        complete: () => { },
      });
    });
  }


  postAPI(strUrl: string, objBody: any): Observable<any> {
    return this.http.post<any>(this.ServerApiUrl + "/" + strUrl, objBody, { headers: this.getHeaderContentTypeJson() },)
      .pipe(
        // tap(res => console.log(res)),
        catchError(this.handleError<any>('postAPI'))
      );
  }

  upload(strUrl: string, objbody: any): Observable<any> {
    let input = new FormData();
    input.append("file", objbody);
    return this.http.post<any>(this.ServerApiUrl + "/" + strUrl, input, {
      headers: this.getHeader()
    });
  }

  downloadimage(strUrl: string): Observable<Blob> {
    return this.http.get(this.ServerApiUrl + strUrl, {
      responseType: "blob",
      headers: this.getHeaderDownloadImage()
    });
  }

  getHeader() {
    const headerDict = {
      authorization: "Bearer " + this.token
    };
    return headerDict;
  }

  getHeaderDownloadImage() {
    const headerDict = {
      authorization:
        "Bearer " + this.token
    };
    return headerDict;
  }

  getHeaderContentTypeJson() {
    const headerDict = {
      authorization: "Bearer " + this.token,
      "Content-Type": "application/json"
    };
    return headerDict;
  }



  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  async login(username: string, password: string) {
    const responseLogin: any = await this.postAPIAsync("Auth/login", { username: username, password: password });

    if (responseLogin.success) {
      this.token = responseLogin.data.token;
      localStorage.setItem('token', this.token);
      localStorage.setItem('userName', responseLogin.data.user.username);
      localStorage.setItem('email', responseLogin.data.user.email);
      localStorage.setItem('userId', responseLogin.data.user.userId);
      console.log("token", this.token);

      this.isLoggedIn = responseLogin.success;
    }

    return responseLogin;

  }

}
