export interface FormularioCreditoInterface {
    numeroSolicitud:                number;
    tipo:                           string;
    emision:                        string;
    codigoEstado:                   string;
    descripcionEstado:              string;
    codigoSubEstado:                string;
    descripcionSubestado:           string;
    cupoTotal:                      number;
    cupoReservado:                  number;
    cupoDisponible:                 number;
    descripcionScore:               string;
    nivelEndeudamiento:             number;
    tipoDocumento:                  string;
    identificacion:                 string;
    nombreCompleto:                 string;
    primerNombre:                   string;
    segundoNombre:                  string;
    primerApellido:                 string;
    segundoApellido:                string;
    telefono:                       string;
    celular:                        string;
    email:                          string;
    genero:                         string;
    descripcionGenero:              string;
    nacionalidad:                   string;
    fechaNacimiento:                string;
    codigoDepartamentoNacimiento:   string;
    codigoCiudadNacimiento:         string;
    descripcionCiudadNacimiento:    string;
    tipoVivienda:                   string;
    descripcionTipoVivienda:        string;
    codigoDepartamento:             string;
    descripcionDepartamento:        string;
    codigoCiudad:                   string;
    descripcionCiudad:              string;
    codigoBarrio:                   number;
    descripcionBarrio:              string;
    direccionResidencial:           string;
    nivelEstudio:                   string;
    descripcionNivelEstudio:        string;
    viveEnNegocio:                  string;
    descripcionViveNegocio:         string;
    fechaMatricula:                 string;
    comprasSemanales:               number;
    antiguedadComprasSemanales:     number;
    ventasMensuales:                number;
    activos:                        number;
    declarante:                     string;
    descripcionDeclarante:          string;
    codigoDepartamentoNegocio:      string;
    descripcionDepartamentoNegocio: string;
    codigoCiudadNegocio:            string;
    descripcionCiudadNegocio:       string;
    codigoBarrioNegocio:            number;
    descripcionBarrioNegocio:       string;
    direccionNegocio:               string;
    telefonoNegocio:                string;
    antiguedadNegocio:              number;
    camaraComercio:                 string;
    descripcionCamaraComercio:      string;
    nitNegocio:                     string;
    digitoVerificacion?:            number;
}

export interface FormularioDatosTitularInterface {
    id?:                            number;
    numeroSolicitud?:               number;
    emision?:                       Date;
    descripcionEstado?:             string;
    codigoEstado?:                  string;
    codigoSubEstado?:               string;
    cupoTotal?:                     number;
    cupoReservado?:                 number;
    cupoDisponible?:                number;
    score?:                         string;
    descripcionScore?:              string;
    nivelEndeudamiento?:            number;
    comprasSemanales?:              number;
    antiguedadComprasSemanales?:    number;
    ventasMensuales?:               number;
    activos?:                       number;
    declarante?:                    string;
    codigoDepartamentoNegocio?:     string;
    codigoCiudadNegocio?:           string;
    codigoBarrioNegocio?:           string;
    direccionNegocio?:              string;
    telefonoNegocio?:               string;
    antiguedadNegocio?:             number;
    camaraComercio?:                string;
    nitNegocio?:                    string;
}

export interface FormularioRepresentanteInterface {
    tipoDocumento?:           string;
    identificacion?:          string;
    primerNombre?:            string;
    segundoNombre?:           string;
    primerApellido?:          string;
    segundoApellido?:         string;
    nombreCompleto?:          string;
    telefono?:                string;
    celular?:                 string;
    email?:                   string;
    genero?:                  string;
    descripcionGenero?:       string;
    nacionalidad?:            string;
    descripcionTipoVivienda?: string;
    codigoDepartamento?:      string;
    descripcionDepartamento?: string;
    codigoCiudad?:            string;
    descripcionCiudad?:       string;
    codigoBarrio?:            number;
    descripcionBarrio?:       string;
    direccionResidencial?:    string;
    descripcionNivelEstudio?: string;
    descripcionViveNegocio?:  string;
}
