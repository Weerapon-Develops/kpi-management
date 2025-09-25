
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAppConfig } from './Interfaces/app-config';



@Injectable()
export class AppConfig {
    static settings: IAppConfig;
    static objOven: any;
    constructor(private http: HttpClient) { }

    async load() {
        await this.loadConfig();
    }

    async loadConfig() {
        const jsonFile = 'assets/config/config.json';
        const promise = new Promise<void>((resolve, reject) => {
            this.http.get<any>(jsonFile).subscribe({
                next: (res: any) => {
                    AppConfig.settings = <IAppConfig>res;
                    resolve();
                },
                error: (err: any) => {
                    reject(err);
                },
                complete: () => { },
            });
        });
        return promise;
    }
}
