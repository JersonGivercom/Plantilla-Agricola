function seleccionarTabla(){
    const numFilas = document.getElementById("numFilas").value;
    const numColumnas = document.getElementById("numColumnas").value;
    var sidOfCell;
    var eidOfCell;
    const container = document.getElementById("container-demo");

    container.innerHTML = "";
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
                    tabla += "<td class='tabla_generada_td  ui-selectable'  vid="+id+" id="+id+" >"+id+"</td>";   
                }
                tabla += "<td class='tabla_generada_celda_final'>"+numerofinal+"</td>";
            tabla += "</tr>";
    }
    tabla +="</tbody>";
    tabla += "</table>";
    container.innerHTML = tabla;
    
    
   
    const ul = container.firstElementChild;
    const selectable = new Selectable({
        appendTo: ul,
        toggle: true,
        lasso: {
            borderRadius:"5px",
          borderColor: "#fff",
          backgroundColor: "rgba(255, 255, 255, 0.2)"
        }
      });

      $( "#selectable" ).selectable({

          });
          $("#selectable").bind("selectableselecting", function(event, ui) {
            Selecting();
          });
            
            
          $("#selectable").bind("selectablestart", function(event, ui) {
            sidOfCell = parseInt($(event.originalEvent.target).attr("vid"));
          });
        
            $("#selectable").bind("selectablestop", function(event, ui) {
              selectStop();
              // alert("Planta " + sidOfCell + " hasta " + eidOfCell + ".");
            });
        
        $("#selectable").mouseover(function(evt) {
          eidOfCell = parseInt($(evt.originalEvent.target).attr("vid"));
        });

        
        function Selecting() {
          // eliminar la clase de selección de interfaz de usuario de todos los tr seleccionados
           //Si usa <ol>,<li>, no necesita menos de 3 líneas 
        
          var trs = ($("tr").filter(".ui-selectable"));
          for (var i = 0; i < trs.length; i++)
            $(trs[i]).removeClass("ui-selectable");
          var sumnub = ($("td").filter(".ui-selectable")).length;
        
          if (sumnub >= 1) {
           // eliminar la clase de "selección de interfaz de usuario" de todas las celdas seleccionadas 
            var snub = parseInt($(($("td").filter(".ui-selectable"))[0]).attr("vid"));
            var enub = parseInt($(($("td").filter(".ui-selectable"))[sumnub - 1]).attr("vid"));
        
            //console.log("---  snub=", snub, "  enub=", enub);
            for (snub; snub <= enub; snub++) {
              $("[vid='" + snub + "']").removeClass("ui-selectable");
            }
          }
          var snub = sidOfCell;
          var enub = eidOfCell;
          // console.log("===  snub=", snub, "  enub=", enub);
        
          if (snub <= enub)
            for (snub; snub <= enub; snub++) {
              $("[vid='" + snub + "']").addClass("ui-selectable");
         
            }
          else
            for (enub; enub <= snub; enub++) {
              $("[vid='" + enub + "']").addClass("ui-selectable");
            }
        }
        
        function selectStop() {
          var cells = ($("td").filter(".ui-selected"));
        
          for (var i = 0; i < cells.length; i++)
            $(cells[i]).removeClass(".ui-selected");
        
          cells = ($("td").filter(".ui-selectable"));
          for (var i = 0; i < cells.length; i++)
            $(cells[i]).removeClass(".ui-selectable");
        
        
          var snub = sidOfCell;
          var enub = eidOfCell;
          console.log("last  inicio=", snub, "  fin=", enub);
        
        //   if (snub <= enub)
        //     for (snub; snub <= enub; snub++) {
        //       $("[vid='" + snub + "']").addClass("ui-selected");
        //     }
        //   else
        //     for (enub; enub <= snub; enub++) {
        //       $("[vid='" + enub + "']").addClass("ui-selected");
        //     }
          }

        
    // const frag = document.createDocumentFragment();
    // for ( let i = 0; i < 32; i++ ) {
    //   const li = document.createElement("td");
    //   li.classList.add("ui-selectable");
    //   frag.appendChild(li);
    // }
    // ul.appendChild(frag);
    
    // selectable.add(ul.children);
}


let CrearZona = document.getElementById("CrearZona");

let registrarZona = document.getElementById("registrarZona");

var btn = document.getElementById("btnRZona");
 
registrarZona.disabled = true; 

btn.addEventListener("click",limpiartxtZona);

CrearZona.addEventListener("click", activarBTN);

function activarBTN() {
    registrarZona.disabled = false; 
}


function RegistrarZona(){
    btn.disabled = false;
}

function limpiartxtZona(){
  var txt = document.getElementById("registrarZona");
  txt.value ="";
}
