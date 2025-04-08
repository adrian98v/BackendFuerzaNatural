export const usuarioController = (err, resultado) => {

    if (err) {
      console.error('Error al hacer la consulta: ', err);
      return;
    }
  
    console.log('Resultados:', resultado);
    res.send(resultado)
}

