import { Injectable } from '@angular/core';
import {EndPoints} from './end-points';

@Injectable()
export class AppSettingsService {
    /**
     * @description: End-point agenda de completacion
     */
    public agendaCompletacion = {
        url: {
            base: EndPoints.uri('agendas-credito/CO')
        }
    };


}
