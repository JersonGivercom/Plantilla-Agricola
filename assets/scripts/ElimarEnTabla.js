$(function(){
    // Obtener elementos
    var $btn = $('#BtnEliminarRegistro');
    var $btn1 = $('#eliminarEtapasFenologicas');
    var $btn2 = $('#eliminarEnfermedades');
    var $btn3 = $('#EliminarPerfil');
    var $btn4 = $('#EliminarEmpresaU');
    var $btn5 = $('#btnEliminar');
    var $btn6 = $('#btnEliminarCargadores');
    
    // BOTON O
    //seleccionar todo 
    $('#all').click(function(){
        $.each($('#BodytablaEliminar input'),function(idx,item){
            item.checked = $('#all').prop('checked');
        })
    })
 
    //Eliminar
    $btn.click(function(){
        $.each($('#BodytablaEliminar input'),function(idx,item){
            if(item.checked == true){
                item.parentNode.parentNode.remove();
            }
        })
        document.getElementById("all").checked=false;
    })
    // Fin de la empresa

    // BOTON 1
    //seleccionar todo 
    $('#all1').click(function(){
        $.each($('#bodyEtapasFenologicas input'),function(idx,item){
            item.checked = $('#all1').prop('checked');
        })
    })
 
    //Eliminar
    $btn1.click(function(){
        $.each($('#bodyEtapasFenologicas input'),function(idx,item){
            if(item.checked == true){
                item.parentNode.parentNode.remove();
            }
        })
        document.getElementById("all1").checked=false;
    })

        // FIN 
    // BOTON 2
    //seleccionar todo 
    $('#all2').click(function(){
        $.each($('#bodyEnfermedades input'),function(idx,item){
            item.checked = $('#all2').prop('checked');
        })
    })
 
    //Eliminar
    $btn2.click(function(){
        $.each($('#bodyEnfermedades input'),function(idx,item){
            if(item.checked == true){
                item.parentNode.parentNode.remove();
            }
        })
        document.getElementById("all2").checked=false;
    })
    // FIN
    // BOTON 3
    
    $('#all3').click(function(){
        $.each($('#PerfilesEliminar input'),function(idx,item){
            item.checked = $('#all3').prop('checked');
        })
    })

     //Eliminar
     $btn3.click(function(){
        $.each($('#PerfilesEliminar input'),function(idx,item){
            if(item.checked == true){
                item.parentNode.parentNode.remove();
            }
        })
        document.getElementById("all3").checked=false;
    })

       // FIN 

    // BOTON 4  
    //seleccionar todo 
    $('#all4').click(function(){
        $.each($('#empresaEliminar input'),function(idx,item){
            item.checked = $('#all4').prop('checked');
        })
    })

    //Eliminar
    $btn4.click(function(){
        $.each($('#empresaEliminar input'),function(idx,item){
            if(item.checked == true){
                item.parentNode.parentNode.remove();
            }
        })
        document.getElementById("all4").checked=false;
    })
    // FIN 
    // BOTON 5  
    //seleccionar todo 
    $('#all5').click(function(){
        $.each($('#tabla input[type=checkbox]'),function(idx,item){
            item.checked = $('#all5').prop('checked');
        })
    })
    $btn5.click(function(){
        $.each($('#tabla input[type=checkbox]'),function(idx,item){
            if(item.checked == true){
                item.parentNode.parentNode.remove();
            }
        })
        document.getElementById("all5").checked=false;
    })
    // FIN 
    // BOTON 6  
    //seleccionar todo 
    $('#all6').click(function(){
        $.each($('#tablaCargadores input[type=checkbox]'),function(idx,item){
            item.checked = $('#all6').prop('checked');
        })
    })
    $btn6.click(function(){
        $.each($('#tablaCargadores input[type=checkbox]'),function(idx,item){
            if(item.checked == true){
                item.parentNode.parentNode.remove();
            }
        })
        document.getElementById("all6").checked=false;
    })
})