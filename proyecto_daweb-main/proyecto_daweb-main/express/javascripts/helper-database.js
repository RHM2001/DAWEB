const mysql = require('mysql2/promise');

async function getConnection() {
    const connection = mysql.createConnection(
        {
            host: 'localhost',
            user: 'root',
            password: 'blusens3',
            database: 'daweb'
        });
    return connection
}

async function registerUser(connection, nombre) {
    let result = connection.execute('INSERT INTO `usuario` SET `nombre` = ?', [nombre]);
    return result
}

async function registerIncidencia(connection, usuario, restaurante, plato, descripcion) {
    const fechaCreacion = new Date(); // Obtiene la fecha actual
    console.log("FEcha -> " + fechaCreacion)

    let result = await connection.execute(
        'INSERT INTO `incidencia` (`usuario`, `restaurante`, `plato`, `descripcion`, `fecha_creacion`) VALUES (?, ?, ?, ?, ?)',
        [usuario, restaurante, plato, descripcion, fechaCreacion]
    );

    return result;
}


async function getIncidencias(connection, restaurante, plato) {
    let query = 'SELECT * FROM `incidencia` WHERE `restaurante` = ? AND `plato` = ? ORDER BY `fecha_creacion` DESC';
    let values = [restaurante, plato];
    let [rows, fields] = await connection.execute(query, values);
    return rows;
}

async function deleteIncidenciasByPlato(connection, plato, restaurante) {
    let query = 'DELETE FROM `incidencia` WHERE `plato` = ? AND `restaurante` = ?';
    let values = [plato, restaurante];
    let [result] = await connection.execute(query, values);
    return result;
}


async function deleteIncidenciasByRestaurante(connection, restaurante) {
    let query = 'DELETE FROM `incidencia` WHERE `restaurante` = ?';
    let values = [restaurante];
    let [result] = await connection.execute(query, values);
    return result;
}

exports.deleteIncidenciasByPlato = deleteIncidenciasByPlato;
exports.deleteIncidenciasByRestaurante = deleteIncidenciasByRestaurante;
exports.getConnection = getConnection
exports.registerUser = registerUser
exports.registerIncidencia = registerIncidencia
exports.getIncidencias = getIncidencias
