export interface ICredito {
    identificacion: string;
    numeroSolicitud: number;
    tipoCliente: string;
    tipoCredito: string;
    agencia: string;
    unidadNegocio: string;
    codigoNegocio: string;
    fechaSolicitud: Date;
    fechaAprobacion: Date;
    estado: string;
    subestado: string;
    valorNegocio: number;
    valorDisponible: number;
}
