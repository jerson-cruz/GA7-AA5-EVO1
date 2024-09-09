<?php
// Conexión con la base de datos
include("conexion.php");

// Creando variables
$nombre = $_POST['nombre'];
$apellido = $_POST['apellido'];
$cedula = $_POST['cedula'];
$contrasena = $_POST['contrasena'];
$confirmar_contrasena = $_POST['confirmar_contrasena'];

// Comparar las contraseñas
if ($contrasena != $confirmar_contrasena) {
    die('Las contraseñas no coinciden, Verifique <br /> <a href="formulario_Agregar.php">Volver</a>');
}

// Encriptar la contraseña
$contrasenaUser = password_hash($contrasena, PASSWORD_DEFAULT);

// Ingresamos la información a la base de datos usando declaraciones preparadas
$stmt = $conexion->prepare("INSERT INTO registro (Id_cliente, nombre, apellido, cedula, contrasena) VALUES 
(NULL,?,?,?,?)");

// Enlazar los parámetros
$stmt->bind_param("ssss", $nombre, $apellido, $cedula, $contrasena);

// Ejecutar la consulta
if ($stmt->execute()) {
    echo "CORRECTO";
} else {
    echo "INCORRECTO: " . $stmt->error;
}

// Cerrar la declaración y la conexión
$stmt->close();
$conexion->close();
