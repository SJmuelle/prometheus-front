import {environment} from '../../../environments/environment';

export class EndPoints {
    /**
     * @description: Url end-point base
     */
    static uriBase(url: string): string {
        return environment.urlUltracem + url;
    }
    /**
     * @description: Url para los endpoints
     */
    static uri(url: string): string {
        return environment.urlUltracem + url;
    }
    /**
     * @description: URL pagaduria
     */
     static uriPaga(url: string): string {
        return environment.urlPagaduria + url;
    }
    /**
     * @description: URL asignacion de solicitudes
     */
     static uriAsig(url: string): string {
        return environment.urlAsig + url;
    }
}
