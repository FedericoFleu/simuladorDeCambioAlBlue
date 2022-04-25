async function traerCotis(){
        const coti = await fetch("https://www.dolarsi.com/api/api.php?type=valoresprincipales");
      
        const datos = await coti.json();

        for(valores of datos){
            const divCotis = document.querySelector(".cotis")

            divCotis.innerHTML = `Dolar BNA: ${datos[0].casa.venta} / ${datos[0].casa.compra}  | Dolar CCL: ${datos[4].casa.venta} / ${datos[4].casa.venta} | Dolar Blue: ${datos[1].casa.venta} / ${datos[1].casa.compra} | Dolar solidario: ${datos[6].casa.venta} `
        }
 }

 traerCotis()

 