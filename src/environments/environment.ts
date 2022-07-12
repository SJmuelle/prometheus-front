// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    userName: 'APPWEB',
    password: btoa('123456'),
    urlApi: 'http://demo.fintra.co:8011/api-fintra/api',
    urlApi2: 'http://demo.fintra.co:8011/api-fintra/api/generic/qry/',
    urlApi3: 'http://demo.fintra.co:8011/api-fintra/api/generic/',

    // urlApi: 'http://tefi.ngrok.io/api-fintra/api',
    // urlApi2: 'http://tefi.ngrok.io/api-fintra/api/generic/qry/',
    // urlApi3: 'http://tefi.ngrok.io/api-fintra/api/generic/',
    urlApi4: 'http://demo.fintra.co:8011/api-fintra/api/credito/tk/recursos/',
    urlApi5: 'http://demo.fintra.co:8011/api-fintra/api/generic/',
    urlApi6: 'http://demo.fintra.co:8011/api-fintra/api/archivos/guardar/',

    urlPagaduria: 'http://demo.fintra.co:8010/pagadurias/',

    urlprometheus:
        'http://prometheus.fintra.co:8444/fintra/EndPointCoreServlet',
    adjunto: 'http://demo.fintra.co:8010/api-fintra/api/pqrs',
    // adjunto:'http://demo.fintra.co:8010/api-fintra/api/pqrs',
    // envioCorreo:"http://192.168.140.197:8084"
    envioCorreo: 'http://prometheus.fintra.co:8443/apicredit',
    urlUltracem: 'http://demo.fintra.co:8011/api-fintra/api',

    // NGROK
    // urlApi: 'http://demo.fintra.co:8010/api-fintra/api',
    // urlApi2: 'http://demo.fintra.co:8010/api-fintra/api/generic/qry',<
    // urlApi3: 'http://demo.fintra.co:8010/api-fintra/api/generic',

    // urlprometheus:'http://prometheus.fintra.co:8444/fintra/EndPointCoreServlet',
    // adjunto:'http://demo.fintra.co:8010/api-fintra/api/pqrs',
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
