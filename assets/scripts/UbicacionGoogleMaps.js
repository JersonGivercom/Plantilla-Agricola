function iniciarMapa(){
    var latitud = -12.04318;
    var longitud = -77.02824;

    coordenadas = {
        lng: longitud,
        lat: latitud
    };

    generarMapa(coordenadas);
}


function generarMapa(coordenadas){
    var mapa = new google.maps.Map(document.getElementById('mapa'),
    {
        zoom: 10,
        center: new google.maps.LatLng(coordenadas.lat,coordenadas.lng)
    })
    marcador = new google.maps.Marker({
        map: mapa,
        draggable: true,
        position: new google.maps.LatLng(coordenadas.lat,coordenadas.lng) 
    });

    marcador.addListener('dragend', function(event){
        document.getElementById("latitud").value =this.getPosition().lat();
        document.getElementById("longitud").value =this.getPosition().lng();
    })
}

var botonEnviar = document.getElementById("enviarTexto");
botonEnviar.onclick = function (){
    var lt = document.getElementById("latitud").value;
    var lg = document.getElementById("longitud").value;
    var ubicacion =lt +'  '+ lg;
   
    document.getElementById("txtUbicacion").value=ubicacion;
    
}