// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
 production: true,
    userName: "APPWEB",
    password: btoa("123456"),
    urlApi: 'https://prometheus.fintra.co:8443/api-fintra/api',
    urlApi2: 'https://prometheus.fintra.co:8443/api-fintra/api/generic/qry/',
    urlApi3: 'https://prometheus.fintra.co:8443/api-fintra/api/generic',
    urlApiNgrok: 'https://ultracem.ngrok.io/api-fintra/api',
    urlApi4: 'https://ultracem.ngrok.io/api-fintra/api/credito/tk/recursos/',
    urlApi5: 'https://ultracem.ngrok.io/api-fintra/api/generic/',
    urlApi6: 'https://ultracem.ngrok.io/api-fintra/api/archivos/guardar/',
    urlPagaduria: 'https://prometheus.fintra.co:8443/',
    urlprometheus:'https://prometheus.fintra.co:8444/fintra/EndPointCoreServlet',
    adjunto:'https://prometheus.fintra.co:8443/api-fintra/api/pqrs',
    // envioCorreo:'http://192.168.140.197:8084'
    envioCorreo:'http://prometheus.fintra.co:8443/apicredit',
    urlUltracem: 'https://prometheus.fintra.co:8443/api-fintra/api',
    urlTransportadora: 'https://62fd0a386e617f88dea3b94e.mockapi.io/'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
