export const environment = {
    production: true,
    userName: "APPWEB",
    password: btoa("123456"),
    urlApi: 'http://localhost:8010/api-fintra/api',
    urlApi2: 'http://localhost:8010/api-fintra/api/generic/qry/',
    urlApi3: 'http://localhost:8010/api-fintra/api/generic',
    urlApiNgrok: 'http://localhost:8010/api-fintra/api',

    urlApi4: 'http://localhost:8010/api-fintra/api/credito/tk/recursos/',
    urlApi5: 'http://localhost:8010/api-fintra/api/generic/',
    urlApi6: 'http://localhost:8010/api-fintra/api/archivos/guardar/',
    urlPagaduria: 'http://demo.fintra.co:8010/pagadurias/',

    urlprometheus:'http://prometheus.fintra.co:8444/fintra/EndPointCoreServlet',
    adjunto:'http://localhost:8010/api-fintra/api/pqrs',
    // envioCorreo:'http://192.168.140.197:8084'
    envioCorreo:'http://prometheus.fintra.co:8443/apicredit',
    urlUltracem: 'http://localhost:8010/api-fintra/api'

};
