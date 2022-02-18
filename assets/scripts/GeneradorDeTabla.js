const generarTabla = () => {
    const numFilas = document.getElementById("numFilas").value;
    const numColumnas = document.getElementById("numColumnas").value;
    const contenedorTabla = document.getElementById("contenedorTabla");

    contenedorTabla.innerHTML = "";
    var numerocolumna = 0;
    var numerofinal = 0;
    var id =0;

    

    let tabla = "<table id='datos' class='Tabla_generada'>";
    tabla +="<thead style ='background-color: darkgray'>";
             for (let o = 1; o <= numColumnas; o++) {
                
                numerocolumna++;
                tabla +="<th class='tabla_generada_encabezado' >"+numerocolumna+"</th>";
            }
    tabla +="</thead>";
    tabla +="<tbody>";
    for (let k = 1; k <= numFilas; k++) {
       
        numerofinal++;
            tabla += "<tr>";   
                for (let o = 1; o <= numColumnas; o++) {

                    id++;
                    tabla += "<td class='tabla_generada_td' id='"+id+"' onclick='cambiarColor("+id+")'>"+id+"</td>";  
                }
                tabla += "<td class='tabla_generada_celda_final'>"+numerofinal+"</td>";
                tabla += "</tr>";
        
    }
    tabla +="</tbody>";
    tabla += "</table>";
    contenedorTabla.innerHTML = tabla;
};

// window.addEventListener('load', function () {
//     document.getElementById('botonGenerar').addEventListener('click', function () {
//         generarTabla();
//     });
// });


    var elementoSeleccionado = document.getElementById("1"); 
    var activar = document.getElementById("activar");
    var desactivar = document.getElementById("desactivar");
    var vigoroza = document.getElementById("vigoroza");
    var debil = document.getElementById("debil");
    var muerta = document.getElementById("muerta");
    var replantada = document.getElementById("replantada");

    activar.onclick = function() {
        elementoSeleccionado.style.backgroundColor = "green";
        elementoSeleccionado.style.color="white";
    }
    desactivar.onclick = function() {
         elementoSeleccionado.style.backgroundColor = "White";
         elementoSeleccionado.style.color="black";
    }
    vigoroza.onclick = function() {
        elementoSeleccionado.style.backgroundColor = "green";
        elementoSeleccionado.style.color="white";
    }
    debil.onclick = function() {
        elementoSeleccionado.style.backgroundColor = "#FBA600";
        elementoSeleccionado.style.color="white";
    }
    muerta.onclick = function() {
        elementoSeleccionado.style.backgroundColor = "red";
        elementoSeleccionado.style.color="white";
    }
    replantada.onclick = function() {
        elementoSeleccionado.style.backgroundColor = "#22272B";
        elementoSeleccionado.style.color="white";
    }

// Crear un arreglo que me agrege los id y despues darle el color
    function cambiarColor(identificador) {
       let ar= new Array
       ar= elementoSeleccionado = document.getElementById(identificador);
    }

    // Buscar 
    function doSearch()
    {
        const tableReg = document.getElementById('datos');
        const searchText = document.getElementById('buscarPlanta').value.toLowerCase();
        let total = 0;

        // Recorremos todas las filas con contenido de la tabla
        for (let i = 1; i < tableReg.rows.length; i++) {


            let found = false;
            const cellsOfRow = tableReg.rows[i].getElementsByTagName('td');
            // Recorremos todas las celdas
            for (let j = 0; j < cellsOfRow.length && !found; j++) {
                const compareWith = cellsOfRow[j].innerHTML.toLowerCase();
                // Buscamos el texto en el contenido de la celda
                if (searchText.length == 0 || compareWith.indexOf(searchText) > -1) {
                    found = true;
                    total++;
                }
            }
            if (found) {
                tableReg.rows[i].style.display = '';
            } else {
                // si no ha encontrado ninguna coincidencia, esconde la
                // fila de la tabla
                tableReg.rows[i].style.display = 'none';
            }
        }
    }

    window.onload = function contar(){
        const tableReg = document.getElementById('datos');
        var contador=0
        // Recorremos todas las filas con contenido de la tabla
        for(let i = 1; i < tableReg.rows.length; i++){

            let found = false;
            const cellsOfRow = tableReg.rows[i].getElementsByTagName('td');
            for (let j = 0; j < cellsOfRow.length && !found; j++) {
                if(cellsOfRow.style.backgroundColor == 'red'){
                    contador++
                    console.log(contador)
                }
            }

        }
    }