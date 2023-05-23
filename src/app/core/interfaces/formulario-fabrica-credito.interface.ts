export interface FormularioCreditoInterface {
    numeroSolicitud: number;
    tipo: string;
    emision: string;
    codigoEstado: string;
    descripcionEstado: string;
    codigoSubEstado: string;
    descripcionSubestado: string;
    contadorEmbargos: number;
    cupoTotal: number;
    cupoReservado: number;
    cupoDisponible: number;
    nivelRiesgo: string;
    nivelEndeudamiento: number;
    tipoDocumento: string;
    identificacion: string;
    nombreCompleto: string;
    primerNombre: string;
    segundoNombre: string;
    primerApellido: string;
    segundoApellido: string;
    telefono: string;
    celular: string;
    email: string;
    genero: string;
    descripcionGenero: string;
    nacionalidad: string;
    fechaNacimiento: string;
    codigoDepartamentoNacimiento: string;
    codigoCiudadNacimiento: string;
    descripcionCiudadNacimiento: string;
    tipoVivienda: string;
    descripcionTipoVivienda: string;
    codigoDepartamento: string;
    descripcionDepartamento: string;
    codigoCiudad: string;
    descripcionCiudad: string;
    codigoBarrio?: number;
    descripcionBarrio: string;
    direccionResidencial: string;
    nivelEstudio: string;
    descripcionNivelEstudio: string;
    viveEnNegocio: string;
    descripcionViveNegocio: string;
    fechaMatricula: string;
    comprasSemanales: number;
    antiguedadComprasSemanales: number;
    ventasMensuales: number;
    activos: number;
    declarante: string;
    descripcionDeclarante: string;
    codigoDepartamentoNegocio: string;
    descripcionDepartamentoNegocio: string;
    codigoCiudadNegocio: string;
    descripcionCiudadNegocio: string;
    codigoBarrioNegocio: number;
    descripcionBarrioNegocio: string;
    direccionNegocio: string;
    telefonoNegocio: string;
    antiguedadNegocio: number;
    camaraComercio: string;
    descripcionCamaraComercio: string;
    nitNegocio: string;
    digitoVerificacion?: number;
    score?: number;
    fechaExpedicionDocumento?: string;
    codigoDepartamentoExpedicion?: string;
    codigoCiudadExpedicion?: string;
    salarioBasico?: number;
    numeroCuentaBancaria?: string;
    descuentoNomina?: number;
    comisionesHorasExtras?: number;
    valorSolicitado?: number;
    fechaVinculacion?: string;
    fechaFinalizacionContrato?: string;
    otrosIngresos?: number;
    ingresos?: number;
    plazo?: number;
    nodificado?: string;
    modificadoPolitica?: string;
    annosTiempoResidencia?: number;
    mesesTiempoResidencia?: number;
    descripcionTipoCliente?: string;
    nombreConvenio?: string;
    descripcionTipoConsumo?: string;
    valorCuotaDiaria?: number;
    valorCuota?: number;
    nombreEmpresa?: string;
    actividadEconomica?: string;
    actividadEspecifica?: string;
    pasivos?: number;
    tarjetaPropiedad?: string;
    tipoServicio?: string;
    numeroTarjetaCirculacion?: string;
    turnoVehiculo?: string;
    tipoCombustible?: string;
    diasTrabajados?: string;
    ingresosDiarios?: string;
    marcaVehiculo?: string;
    lineaVehiculo?: string;
    modeloVehiculo?: string;
    numeroPlacaVehiculo?: string;
    costoTransaccion?: string;
}
export interface FormularioCreditoPlexa {
    unidadNegocio: number;
    tipo: string;
    tipoDocumento: string;
    identificacion: string;
    primerNombre: string;
    primerApellido: string;
    nombreCompleto: string;
    celular: string;
    email: string;
    fechaNacimiento: string;
    numeroSolicitud: number;
    convenio: number;
    tipoCliente: string;
    tarjetaPropiedad: string;
    tipoCredito: string;
    tipoServicio: string;
    numeroTarjetaCirculacion: string;
    antiguedadNegocio: number;
    ocupacion: string;
    marcaVehiculo: string;
    lineaVehiculo: string;
    modeloVehiculo: string;
    numeroPlacaVehiculo: string;
    segundoNombre: string;
    segundoApellido: string;
    estadoCivil: string;
    nivelEstudio: string;
    fechaExpedicion: string;
    codigoDepartamentoExpedicion: string;
    codigoCiudadExpedicion: string;
    codigoDepartamento: string;
    codigoCiudad: string;
    barrioResidencia: number;
    direccionResidencial: string;
    direccionTipoVia: string;
    direccionViaPrincipal: string;
    direccionNumeroVia: string;
    direccionDistanciaVia: string;
    direccionComplemento: string;
    annosTiempoResidencia: number;
    mesesTiempoResidencia: number;
    genero: string;
    tipoVivienda: string;
    valorSolicitado: number;
    plazo: number;
    nombreEmpresa: string;
    fechaVinculacion: string;
    tipoContrato: string;
    cargo: string;
    actividadEconomica: string;
    actividadEspecifica: string;
    fechaAntiguedadNegocio: string;
    telefonoNegocio: string;
    direccionNegocio: string;
    direccionNegocioVia: string;
    direccionNegocioPrincipal: string;
    direccionNegocioNroVia: string;
    direccionNegocioDistanciaVia: string;
    direccionNegocioCompleto: string;
    otrosIngresos: number;
    ingresos: number;
    activos: number;
    pasivos: number;
    turnoVehiculo: string;
    diasTrabajados: string;
    tipoCombustible: string;
    ingresosDiarios: number;
    compraDia: number;
    tanqueoDia: number;
    tipoCuentaBancaria: string;
    numeroCuentaBancaria: string;
    entidadBancaria: string;
    celularNequi: string;
    costoTransaccion: number;
}

export interface FormularioCreditoMicro {
    experienciaActividad: String,
    numeroSolicitud: String;
    fechaVinculacion: String;
    tipo: String;
    fechaDesvinculacion: String;
    fechaIngresoFabrica: String,
    tipoDocumento: String;
    identificacion: String;
    nombreCompleto: String;
    celular: String;
    primerNombre: String;
    segundoNombre: String;
    primerApellido: String;
    segundoApellido: String;
    estadoCivil: String;
    email: String;
    genero: String;
    nacionalidad: String;
    fechaNacimiento: String;
    nivelEstudio: String;
    numeroHijos: Number;
    personasACargo: Number;
    fechaExpedicion: String;
    codigoDepartamentoExpedicion: String;
    codigoCiudadExpedicion: String;
    estrato: Number;
    codigoDepartamento: String;
    codigoCiudad: String;
    barrioResidencia: Number;
    direccionResidencial: String;
    direccionTipoVia: String;
    direccionViaPrincipal: String;
    direccionNumeroVia: String;
    direccionDistanciaVia: String;
    direccionComplemento: String;
    tipoVivienda: String;
    annosTiempoResidencia: String;
    mesesTiempoResidencia: String;
    tipoActividad: String;
    actividadEconomica: String;
    actividadEspecifica: String;
    antiguedadActividad: Number;
    antiguedadNegocio: String;
    camaraComercio: String;
    tieneRut: String;
    nitNegocio: String;
    nombreNegocio: String;
    codigoDepartamentoNegocio: String;
    codigoCiudadNegocio: String;
    codigoBarrioNegocio: String;
    direccionNegocio: String;
    direccionNegocioVia: String;
    direccionNegocioPrincipal: String;
    direccionNegocioNroVia: String;
    direccionNegocioDistanciaVia: String;
    direccionNegocioCompleto: String;
    telefonoNegocio: String;
    tipoLocal: String;
    antiguedadLocal: number;
    nombreArrendador: String;
    celularArrendador: String;
    tipoUbicacionNegocio: String;
    numeroEmpleados: String;
    nombreAtiendeNegocio: String;
    tieneOtrosPuntos: String;
    tipoDocumentoConyuge: String;
    identificacionConyuge: String;
    nombreCompletoConyuge: String;
    celularConyuge: String;
    primerNombreConyuge: String;
    segundoNombreConyuge: String;
    primerApellidoConyuge: String;
    segundoApellidoConyuge: String;
    emailConyuge: String;
    tipoEmpleoConyuge: String;
    nombreEmpresaConyuge: String;
    cargoConyuge: String;
    salarioConyuge: String;
    telefonoEmpresaConyuge: String;
    poseeCuentaBancaria: String;
    tipoCuentaBancaria: String;
    entidadBancaria: String;
    numeroCuentaBancaria: String;
    autorizacionBanco: String;
    tipoDeudor: String;
    legalCargoPublico: String;
    cargoPublico: String;
    entidadPublico: String;
    vinculadoActualPublico: String;
    fechaDesvinculacionPublico: String;
    legalPersonalExpuesta: String;
    vinculacionExpuesta: String;
    nombreExpuesta: String;
    tipoIdentificacionExpuesta: String;
    identificacionExpuesta: String;
    nacionalidadExpuesta: String;
    entidadExpuesta: String;
    cargoExpuesta: String;
    vinculadoActualExpuesta: String;
    fechaDesvinculacionExpuesta: String;
    legalDesarrollaActividadApnfd: String;
    legalCargoPartidoPolitico: String;
    legalOperacionCriptomoneda: String;
    tipoOperacionCriptomoneda: String;
    legalOperacionExtranjera: String;
    tipoOperacionExtranjera: String;
    declaroIngresoDeclaracionAuto: String;
    otroIngresoDeclaracionAuto: String;
    autoricacionDatosPersonalClaracionAuto: String;
    clausulaAnticurrupcionClaracionAuto: String;
    plazo: Number;
    modificadaSolicitud: String;
    valorSolicitado: Number;
    destinoCredito: String;
    declaraRenta: String;
    actividadNoDesignada: String
}

export interface FormularioDatosTitularInterface {
    id?: number;
    numeroSolicitud?: number;
    emision?: Date;
    descripcionEstado?: string;
    codigoEstado?: string;
    codigoSubEstado?: string;
    cupoTotal?: number;
    cupoReservado?: number;
    cupoDisponible?: number;
    score?: number;
    descripcionScore?: string;
    nivelEndeudamiento?: number;
    comprasSemanales?: number;
    antiguedadComprasSemanales?: number;
    ventasMensuales?: number;
    activos?: number;
    declarante?: string;
    codigoDepartamentoNegocio?: string;
    codigoCiudadNegocio?: string;
    codigoBarrioNegocio?: string;
    direccionNegocio?: string;
    telefonoNegocio?: string;
    antiguedadNegocio?: number;
    camaraComercio?: string;
    nitNegocio?: string;
    valorSolicitado?: string;
    tipoCredito?: string;
    destinoCredito?: string;
    plazo?: number;
    cargo?: string;
    estrato?: string;
    otroDestinoCredito?: string;
    fechaExpedicionDocumento?: string;
    annosTiempoResidencia?: number;
    mesesTiempoResidencia?: number;
    descripcionTipoCliente?: string;
    nombreConvenio?: string;
    descripcionTipoConsumo?: string;
    valorCuotaDiaria?: number;
    valorCuota?: number;
    nombreEmpresa?: string;
    actividadEconomica?: string;
    actividadEspecifica?: string;
    pasivos?: number;
    tarjetaPropiedad?: string;
    tipoServicio?: string;
    numeroTarjetaCirculacion?: string;
    turnoVehiculo?: string;
    tipoCombustible?: string;
    diasTrabajados?: string;
    ingresosDiarios?: string;
    marcaVehiculo?: string;
    lineaVehiculo?: string;
    modeloVehiculo?: string;
    numeroPlacaVehiculo?: string;
    costoTransaccion?: string;
}

export interface FormularioRepresentanteInterface {
    tipoDocumento?: string;
    identificacion?: string;
    primerNombre?: string;
    segundoNombre?: string;
    primerApellido?: string;
    segundoApellido?: string;
    nombreCompleto?: string;
    telefono?: string;
    celular?: string;
    email?: string;
    genero?: string;
    descripcionGenero?: string;
    nacionalidad?: string;
    descripcionTipoVivienda?: string;
    codigoDepartamento?: string;
    descripcionDepartamento?: string;
    codigoCiudad?: string;
    descripcionCiudad?: string;
    codigoBarrio?: number;
    descripcionBarrio?: string;
    direccionResidencial?: string;
    descripcionNivelEstudio?: string;
    descripcionViveNegocio?: string;
    numeroSolicitud?: number;
    tipo?: string;
    fechaNacimiento?: string;
    tipoVivienda?: string;
    viveEnNegocio?: string;
    nivelEstudio?: string;
    fechaExpedicionDocumento?: string;
    codigoDepartamentoExpedicion?: string;
    codigoCiudadExpedicion?: string;
    modificadoPolitica?: string;
}

export interface FormularioDeudorSolidarioInterface {
    recurso?: string;
    numeroSolicitud?: number;
    tipo?: string;
    tipoDocumento?: string;
    identificacion?: string;
    nombreCompleto?: string;
    celular?: string;
    primerNombre?: string;
    segundoNombre?: string;
    primerApellido?: string;
    segundoApellido?: string;
    estadoCivil?: string;
    email?: string;
    genero?: string;
    codigoDepartamento?: string;
    codigoCiudad?: string;
    barrioResidencia?: string;
    direccionResidencial?: string;
    direccionTipoVia?: string;
    direccionViaPrincipal?: string;
    direccionNumeroVia?: number;
    direccionDistanciaVia?: string;
    direccionComplemento?: string;
    tipoVivienda?: string;
    parentesco?: string;
}
