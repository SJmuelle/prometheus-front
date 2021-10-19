import {environment} from '../../../environments/environment';

export class EndPoints {
    /**
     * @description: Url para los endpoints
     */
    static uri(url: string): string {
        return environment.urlApi2 + url;
    }
    /**
     * @description: Url creditos
     */
    static uriCredito(url: string): string {
        return environment.urlApi4 + url;
    }
}
