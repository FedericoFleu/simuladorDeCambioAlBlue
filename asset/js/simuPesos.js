//obtenemos las etiquetas que vamos a usar
const boton = document.querySelector("#abrirModal"); // obtenemos el btn calcular

const modalConteainer = document.querySelector(".modalContainer"); //div del modal

const resutaldoModal = document.querySelector("#resultado") //contenido del modal

const h3 = document.querySelector("#peso"); //titulo del modal      

const botonInicio = document.querySelector("#inicio"); //btn para volver al inicio


boton.addEventListener("click", (ev) =>{
    ev.preventDefault(); //no se recargue la pagina cuando se hace click en el boton

    let ingreso = parseFloat(document.querySelector("#ingreso").value); // obtenemos el valor del input

    async function traerCotiCompra(){
      const coti = await fetch("https://www.dolarsi.com/api/api.php?type=valoresprincipales");
    
      const datos = await coti.json();
    
      const usdCompra = parseInt(datos[1].casa.compra); //precio de compra

      if(ingreso <= 0){
        Swal.fire({
          title: 'No ingresaste un valor valido para hacer un intercambio',
          text: 'Ingresa un numero mayor a 0',
          icon: 'error',
          confirmButtonText: 'Ingresar otro monto'
        })

        document.querySelector("#ingreso").value = ""; //limpiamos los valores del input

      }else {
        Swal.fire({
          title: 'Calculo realizado exitosamente',
          icon: 'success',
          confirmButtonText: 'Ver cotizacion'
        })
        document.querySelector("#ingreso").value = ""; 

        let calculo = ingreso / usdCompra; //calculo de la compra 

        modalConteainer.classList.add("modalActive"); // le agregamos la class para que se muestre el modal

        h3.innerHTML = `Cotizacion del dia: $ ${usdCompra}` //titulo del modal

        resutaldoModal.innerHTML = `<p>Ingresaste: $ ${ingreso}</p> <br> <p>Recibiras: $ ${calculo} USD </p>`; //cuerpo del modal
      }
    }
    traerCotiCompra()
})



//para cerrar el modal
cerrarModal.addEventListener("click", () => {
    modalConteainer.classList.remove("modalActive");
})

//redirrecionamos al usuario a la pagina de inicio
botonInicio.addEventListener("click", () => {
    location.href = "/index.html"; 
})
