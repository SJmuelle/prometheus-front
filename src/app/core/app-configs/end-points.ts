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
     * @description: URL transferencia
     */
    static uriTransferencia(url: string): string {
        return environment.urlApi7 + url;
    }
    /**
     * @description: URL lista de archivos
     */
     static uriGetFiles(url: string): string {
        return environment.urlGetFile + url;
    }
    /**
     * @description: URL ver archivos
     */
     static uriShowFiles(url: string): string {
        return environment.urlApi7 + url;
    }
}
