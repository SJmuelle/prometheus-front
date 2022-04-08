export const environment = {
    production: true,
    userName: "APPWEB",
    password: btoa("123456"),
    urlApi: 'http://demo.fintra.co:8010/api-fintra/api',
    urlApi2: 'http://demo.fintra.co:8010/api-fintra/api/generic/qry/',
    urlApi3: 'http://demo.fintra.co:8010/api-fintra/api/generic',
    urlApiNgrok: 'https://ultracem.ngrok.io/api-fintra/api',

    urlApi4: 'https://ultracem.ngrok.io/api-fintra/api/credito/tk/recursos/',
    urlApi5: 'https://ultracem.ngrok.io/api-fintra/api/generic/',
    urlApi6: 'https://ultracem.ngrok.io/api-fintra/api/archivos/guardar/',

    urlprometheus:'https://prometheus.fintra.co:8444/fintra/EndPointCoreServlet',
    adjunto:'http://demo.fintra.co:8010/api-fintra/api/pqrs',
    // envioCorreo:'http://192.168.140.197:8084'
    envioCorreo:'http://prometheus.fintra.co:8443/apicredit',
    urlUltracem: 'http://demo.fintra.co:8010/api-fintra/api'
};
