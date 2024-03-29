import {environment} from 'environments/environment';

export class EndPoints {
    /**
     * @description: Url end-point base
     */
    static uriBase(url: string): string {
        return environment.apiUrl+'api-fintra/api' + url;
    }
    /**
     * @description: Url para los endpoints
     */
    static uri(url: string): string {
        return environment.apiUrl+'api-fintra/api' + url;
    }
/**
     * @description: Url para los endpoints de alfa fintra
     */
    static alfa(url: string): string {
        return environment.alfaFintra+'api' + url;
    }


    /**
     * @description: URL pagaduria
     */
     static uriPaga(url: string): string {
        return environment.apiUrl + url;
    }
}
