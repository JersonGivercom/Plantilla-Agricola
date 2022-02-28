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
    tabla +="<tbody id='selectable'>";
    for (let k = 1; k <= numFilas; k++) {
       
        numerofinal++;
            tabla += "<tr>";   
                for (let o = 1; o <= numColumnas; o++) {

                    id++;
                    tabla += "<td class='tabla_generada_td '  vid="+id+" id="+id+" >"+id+"</td>";  
                }
                tabla += "<td class='tabla_generada_celda_final'>"+numerofinal+"</td>";
            tabla += "</tr>";
    }
    tabla +="</tbody>";
    tabla += "</table>";
    contenedorTabla.innerHTML = tabla;

   
    
  };

  
// function cuadrante(){
//   const selection = new SelectionArea({
//       // All elements in this container can be selected
//       selectables: ['.ui-container > td'],
//       // The container is also the boundary in this case
//       boundaries: ['.ui-container']
//   })

 
// }

 

//   var sidOfCell;
//   var eidOfCell;


//   $( "#selectable" ).selectable({
//   });

//   $("#selectable").bind("selectableselecting", function(event, ui) {
//     Selecting();
//     removeClass();
//   });

 
//   $("#selectable").bind("selectablestart", function(event, ui) {
//     sidOfCell = parseInt($(event.originalEvent.target).attr("vid"));
//   });

//     $("#selectable").bind("selectablestop", function(event, ui) {
//       selectStop();
//       // alert("Planta " + sidOfCell + " hasta " + eidOfCell + ".");
//     });

// $("#selectable").mouseover(function(evt) {
//   eidOfCell = parseInt($(evt.originalEvent.target).attr("vid"));
// });

// // function removeClass(){

// //   var trs = ($("tr").filter(".selecTablaC"));
// //   for (var i = 0; i < trs.length; i++)
// //     $(trs[i]).removeClass("selecTablaC");



// // }
// function Selecting() {
//   //remove the class of ui-selecting from all tr selected
//   //If you use <ol>,<li>, you don't need below 3 lines
//   var trs = ($("tr").filter(".selecTabla"));
//   for (var i = 0; i < trs.length; i++)
//     $(trs[i]).removeClass("selecTabla");
//   var sumnub = ($("td").filter(".selecTabla")).length;

//   if (sumnub >= 1) {
//     //remove the class of "ui-selecting" from all selected cell
//     var snub = parseInt($(($("td").filter(".selecTabla"))[0]).attr("vid"));
//     var enub = parseInt($(($("td").filter(".selecTabla"))[sumnub - 1]).attr("vid"));

//     //console.log("---  snub=", snub, "  enub=", enub);
//     for (snub; snub <= enub; snub++) {
//       $("[vid='" + snub + "']").removeClass("selecTabla");
     
//     }
//   }
//   var snub = sidOfCell;
//   var enub = eidOfCell;
//   // console.log("===  snub=", snub, "  enub=", enub);

//   if (snub <= enub)
//     for (snub; snub <= enub; snub++) {
//       $("[vid='" + snub + "']").addClass("selecTabla");
 
//     }
//   else
//     for (enub; enub <= snub; enub++) {
//       $("[vid='" + enub + "']").addClass("selecTabla");
//     }
// }

// function selectStop() {
//   var cells = ($("td").filter(".selecTablaC"));

//   for (var i = 0; i < cells.length; i++)
//     $(cells[i]).removeClass(".selecTablaC");

//   cells = ($("td").filter(".selecTabla"));
//   for (var i = 0; i < cells.length; i++)
//     $(cells[i]).removeClass(".selecTabla");


//   var snub = sidOfCell;
//   var enub = eidOfCell;
//   console.log("last  inicio=", snub, "  fin=", enub);

//   if (snub <= enub)
//     for (snub; snub <= enub; snub++) {
//       $("[vid='" + snub + "']").addClass("selecTablaC");
//     }
//   else
//     for (enub; enub <= snub; enub++) {
//       $("[vid='" + enub + "']").addClass("selecTablaC");
//     }
//   }


// ACTIVAR PLANTA
// function QuitarPlanta(){
 

//   var sidOfCell;
//   var eidOfCell;


//   $( "#selectable" ).selectable({

//   });
//   $("#selectable").bind("selectableselecting", function(event, ui) {
//     Selecting();
//     RemoveClass();
//   });
	
 

//   $("#selectable").bind("selectablestart", function(event, ui) {
//     sidOfCell = parseInt($(event.originalEvent.target).attr("vid"));
//   });

//     $("#selectable").bind("selectablestop", function(event, ui) {
//       selectStop();
//       // alert("Planta " + sidOfCell + " hasta " + eidOfCell + ".");
//     });

// $("#selectable").mouseover(function(evt) {
//   eidOfCell = parseInt($(evt.originalEvent.target).attr("vid"));
// });

// function RemoveClass() {

//   var cells = ($("td").filter(".selecTablaC"));

//   for (var i = 0; i < cells.length; i++)
//     $(cells[i]).removeClass(".selecTablaC");

//   cells = ($("td").filter(".selecTabla"));
//   for (var i = 0; i < cells.length; i++)
//     $(cells[i]).removeClass(".selecTabla");

// }

// function Selecting() {
//   // eliminar la clase de selección de interfaz de usuario de todos los tr seleccionados
//    //Si usa <ol>,<li>, no necesita menos de 3 líneas 

//   var trs = ($("tr").filter(".QuitarPlanta"));
//   for (var i = 0; i < trs.length; i++)
//     $(trs[i]).removeClass("QuitarPlanta");
//   var sumnub = ($("td").filter(".QuitarPlanta")).length;

//   if (sumnub >= 1) {
//    // eliminar la clase de "selección de interfaz de usuario" de todas las celdas seleccionadas 
//     var snub = parseInt($(($("td").filter(".QuitarPlanta"))[0]).attr("vid"));
//     var enub = parseInt($(($("td").filter(".QuitarPlanta"))[sumnub - 1]).attr("vid"));

//     //console.log("---  snub=", snub, "  enub=", enub);
//     for (snub; snub <= enub; snub++) {
//       $("[vid='" + snub + "']").removeClass("QuitarPlanta");
//     }
//   }
//   var snub = sidOfCell;
//   var enub = eidOfCell;
//   // console.log("===  snub=", snub, "  enub=", enub);

//   if (snub <= enub)
//     for (snub; snub <= enub; snub++) {
//       $("[vid='" + snub + "']").addClass("QuitarPlanta");
 
//     }
//   else
//     for (enub; enub <= snub; enub++) {
//       $("[vid='" + enub + "']").addClass("QuitarPlanta");
//     }
// }

// function selectStop() {
//   var cells = ($("td").filter(".QuitarPlantaC"));

//   for (var i = 0; i < cells.length; i++)
//     $(cells[i]).removeClass(".QuitarPlantaC");

//   cells = ($("td").filter(".QuitarPlanta"));
//   for (var i = 0; i < cells.length; i++)
//     $(cells[i]).removeClass(".QuitarPlanta");


//   var snub = sidOfCell;
//   var enub = eidOfCell;
//   console.log("last  inicio=", snub, "  fin=", enub);

//   if (snub <= enub)
//     for (snub; snub <= enub; snub++) {
//       $("[vid='" + snub + "']").addClass("QuitarPlantaC");
//     }
//   else
//     for (enub; enub <= snub; enub++) {
//       $("[vid='" + enub + "']").addClass("QuitarPlantaC");
//     }
//   }


// }

// window.addEventListener('load', function () {
//     document.getElementById('botonGenerar').addEventListener('click', function () {
//         generarTabla();
//     });
// });


    // var seleccionar = document.getElementById("seleccionar"); 
    // var activar = document.getElementById("activar");
    // var desactivar = document.getElementById("desactivar");
    // var vigoroza = document.getElementById("vigoroza");
    // var debil = document.getElementById("debil");
    // var muerta = document.getElementById("muerta");
    // var replantada = document.getElementById("replantada");

  //   seleccionar.onclick = function() {
  //     elementoSeleccionado.style.backgroundColor = "#F39814";
  //     elementoSeleccionado.style.color="white";
  // }

  //   activar.onclick = function() {
  //       elementoSeleccionado.style.backgroundColor = "green";
  //       elementoSeleccionado.style.color="white";
  //   }
  //   desactivar.onclick = function() {
  //        elementoSeleccionado.style.backgroundColor = "#17202A";
  //        elementoSeleccionado.style.color="white";
  //   }
    // vigoroza.onclick = function() {
    //     elementoSeleccionado.style.backgroundColor = "green";
    //     elementoSeleccionado.style.color="white";
    // }
    // debil.onclick = function() {
    //     elementoSeleccionado.style.backgroundColor = "#FBA600";
    //     elementoSeleccionado.style.color="white";
    // }
    // muerta.onclick = function() {
    //     elementoSeleccionado.style.backgroundColor = "red";
    //     elementoSeleccionado.style.color="white";
    // }
    // replantada.onclick = function() {
    //     elementoSeleccionado.style.backgroundColor = "#22272B";
    //     elementoSeleccionado.style.color="white";
    // }

// Crear un arreglo que me agrege los id y despues darle el color
    // function cambiarColor(identificador) {
    //    let ar= new Array
    //    ar= elementoSeleccionado = document.getElementById(identificador);
    // }

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

    




