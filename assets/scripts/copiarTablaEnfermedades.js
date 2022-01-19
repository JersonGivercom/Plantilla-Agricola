var Uno = document.querySelector("#tablaEnfermedadesUno tbody"), //Cuerpo de la primera tabla
    Dos = document.querySelector("#tablaEnfermedadesDos tbody"), //Cuerpo de la segunda tabla
    btnEnfermedad = document.querySelector("#CopiarEnfermedades"), //Botón que copiará los datos de las filas seleccionadas
    seleccionEnfermedades = [], //Arreglo que almacenará a las filas seleccionadas
    seleccionarE = function(event){ //Función a ejecutarse para seleccionar una fila
        if (event.target.tagName == "TD"){ //Si se pulsó una celda
            var fila = event.target.parentNode; //Se almacena en una variable a la fila que la contiene
            
            //Si está seleccionada
            if (fila.dataset.selected < 1){
                fila.style.backgroundColor = "#43594f"; //Se la pinta de rojo
                fila.checked =true;
                fila.style.color = "white"; //Con un texto en blanco
                fila.dataset.selected = 1; //Se asigna el valor 1 al pseudoatributo "data-selected"
                seleccionEnfermedades.push(fila); //Se añade la fila al arreglo de filas seleccionadas
            }
            //Si no está seleccionada
            else{
                fila.style.backgroundColor = ""; //Se retira el color de fondo
                fila.style.color = ""; //Y el del texto
                fila.dataset.selected = 0; //El valor del pseudoatributo retorna a 0
                seleccionEnfermedades.splice(seleccionEnfermedades.indexOf(fila), 1); //Se elimina la fila del arreglo  
            }           
        }
    },
    copiar = function(){ //Función a ejecutarse para copiar los datos de las filas seleccionadas en la segunda tabla
        if (seleccionEnfermedades.length){ //Si hay filas seleccionadas
            for (var i = 0, l = seleccionEnfermedades.length; i < l; i++){ //Se recorre a dicho conjunto
                var tr = Dos.insertRow(), //Se inserta una nueva fila en la segunda tabla
                    celdas = seleccionEnfermedades[i].querySelectorAll("td"); //Se toma a las celdas de la fila seleccionada actual en el bucle

                for (var j = 0, m = celdas.length; j < m; j++){ //Se recorre a dicho conjunto de celdas
                    var td = tr.insertCell(); //Se añade una nueva celda en la nueva fila de la segunda tabla
                    td.innerHTML = celdas[j].innerHTML; //Se copia el texto de la celda de la fila seleccionada a la nueva celda
                }

                //La fila seleccionada retorna a su estado inicial
                seleccionEnfermedades[i].style.backgroundColor = "";
                seleccionEnfermedades[i].style.color = "";
                seleccionEnfermedades[i].dataset.selected = 0;
            }

            //Se eliminan a las filas seleccionadas del arreglo
            seleccionEnfermedades.length = 0;
        }
    };

    //Cuando se produzca el evento "click" en la primera tabla, se ejecutará la función "callback"
    Uno.addEventListener("click", seleccionarE, false);

    //Cuando se pulse el botón, se ejecutará el siguiente conjunto de instrucciones
    btnEnfermedad.addEventListener("click", copiar, false);