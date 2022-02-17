// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    // urlApi: 'http://192.168.190.237:8010/api-fintra/api',
    urlApi: 'https://ultracem.ngrok.io/api-fintra/api',
    // urlApi: 'http://192.168.140.241:8010/api-fintra/api',
    urlApi2: 'https://ultracem.ngrok.io/api-fintra/api/generic/qry/',
   //  urlApi2: 'http://192.168.190.237:8010/api-fintra/api/generic/qry/',
    urlApi3: 'http://192.168.140.241:8010/api-fintra/api/generic',
    urlApi4: 'https://ultracem.ngrok.io/api-fintra/api/credito/tk/recursos/',
    urlApi5: 'https://ultracem.ngrok.io/api-fintra/api/generic/',
    urlApi6: 'https://ultracem.ngrok.io/api-fintra/api/archivos/guardar/',
    urlApi7: 'http://tefi.ngrok.io/api-fintra/api/transferencia/',

    urlprometheus:'https://prometheus.fintra.co:8444/fintra/EndPointCoreServlet',
    adjunto:'http://192.168.140.241:8010/api-fintra/api/pqrs',
    // envioCorreo:"http://192.168.140.197:8084"
    envioCorreo:"http://prometheus.fintra.co:8443/apicredit",

    urlGetFile: "http://tefi.ngrok.io/api-fintra/api/generic/qry/tk/",
    urlDonwloadFile: "http://tefi.ngrok.io/api-fintra/api/transferencia/"


    // NGROK
    // urlApi: 'https://tefi.ngrok.io/api-fintra/api',
    // urlApi2: 'https://tefi.ngrok.io/api-fintra/api/generic/qry',
    // urlApi3: 'https://tefi.ngrok.io/api-fintra/api/generic',

    // urlprometheus:'https://prometheus.fintra.co:8444/fintra/EndPointCoreServlet',
    // adjunto:'https://tefi.ngrok.io/api-fintra/api/pqrs',
    // // envioCorreo:"http://192.168.140.197:8084"
    // envioCorreo:"http://prometheus.fintra.co:8443/apicredit"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
