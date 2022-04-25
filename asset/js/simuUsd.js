//obtenemos las etiquetas que vamos a usar
const boton = document.querySelector("#abrirModal"); //boton para enviar

const modalConteainer = document.querySelector(".modalContainer"); //div modal 

const h4 = document.querySelector(".dolares"); //titulo del modal

const resutaldoModal = document.querySelector("#resultado") //contendor del modal

const botonInicio = document.querySelector("#volverInicio"); //boton para volver al inicio


boton.addEventListener("click", (ev) =>{
    ev.preventDefault();//no se recargue la pagian cuando se hace click en el boton

    let ingreso = parseFloat(document.querySelector("#ingreso").value); //obtenemos el valor del input

    async function traerCotiVenta(){
      const coti = await fetch("https://www.dolarsi.com/api/api.php?type=valoresprincipales");
    
      const datos = await coti.json();
    
      const usdCompra = parseInt(datos[1].casa.compra); //precio de venta

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
  
        let calculo = ingreso * usdCompra; //calculo de la  venta 
        
        modalConteainer.classList.add("modalActive"); // le agregamos la class para que se muestre el modal

        h4.innerHTML = `Cotizacion del dia: $ ${usdCompra}`; //titulo del modal
  
        resutaldoModal.innerHTML = `<p>Ingresaste: $ ${ingreso} USD</p> <br> <p>Recibiras: $ ${calculo} Pesos</p>`; //cuerpo del modal
      }
    }
    traerCotiVenta(); 
})

//le quitamos la clase para que se cierre el modal
cerrarModal.addEventListener("click", () => {
    modalConteainer.classList.remove("modalActive"); 
});

botonInicio.addEventListener("click", () =>{
  location.href = "/index.html"; //redirrecionamos al usuario a la pagina de inicio
})

traerCotis()
