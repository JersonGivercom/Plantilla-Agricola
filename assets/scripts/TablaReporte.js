var tablaReporte = document.querySelector("#reporte tbody"), //Cuerpo de la primera tabla
    btnCopiarFila = document.querySelector("#CopiarFila"), //Botón que copiará los datos de las filas seleccionadas
    seleccion = [], 
    seleccionFila = function(event){ //Función a ejecutarse para seleccionar una fila
        if (event.target.tagName == "TD"){ //Si se pulsó una celda
            var fila = event.target.parentNode; //Se almacena en una variable a la fila que la contiene
            
            //Si está seleccionada
            if (fila.dataset.selected < 1){
                fila.style.backgroundColor = "#43594f"; //Se la pinta de rojo
                fila.checked =true;
                fila.style.color = "white"; //Con un texto en blanco
                fila.dataset.selected = 1; //Se asigna el valor 1 al pseudoatributo "data-selected"
                seleccion.push(fila); //Se añade la fila al arreglo de filas seleccionadas
            }
            //Si no está seleccionada
            else{
                fila.style.backgroundColor = ""; //Se retira el color de fondo
                fila.style.color = ""; //Y el del texto
                fila.dataset.selected = 0; //El valor del pseudoatributo retorna a 0
                seleccion.splice(seleccion.indexOf(fila), 1); //Se elimina la fila del arreglo  
            }           
        }
    },
    copiar = function(){ //Función a ejecutarse para copiar los datos de las filas seleccionadas en la segunda fila
        if (seleccion.length){ //Si hay filas seleccionadas
            console.log(seleccion)
            
        }
    };

     //Cuando se produzca el evento "click" en la primera tabla, se ejecutará la función "callback"
     tablaReporte.addEventListener("click", seleccionFila, false);

     //Cuando se pulse el botón, se ejecutará el siguiente conjunto de instrucciones
     btnCopiarFila.addEventListener("click", copiar, false);