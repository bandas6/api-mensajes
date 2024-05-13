

const validarCodigo = (telefono) => {

    const codigosPermitidos = ['+1'];
    const arrayTelefono = telefono.split("");

    const alfaNumericoCanadaUsa = arrayTelefono[0] + arrayTelefono[1];

    if (!codigosPermitidos.includes(alfaNumericoCanadaUsa)) {
        throw new Error('el numero ' + telefono + ' no es permitido')
    }


}

module.exports = {
    validarCodigo
}