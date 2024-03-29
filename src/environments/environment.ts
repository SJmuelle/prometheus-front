// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    userName: "APPWEB",
    password: btoa("123456"),
    // apiUrl: "http://localhost:8010/",
    // apiUrl: "https://fae7-181-57-229-82.ngrok-free.app/",
    // apiUrl: "https://prometheus.fintra.co:8443/",
    // apiUrl: "http://demo.fintra.co:8084/",
    apiUrl: "https://prometheus.fintra.co:8443/",
    alfaFintra: "http://alfa.fintra.co:3100/",
    urlprometheus: 'https://prometheus.fintra.co:8444/fintra/EndPointCoreServlet',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
