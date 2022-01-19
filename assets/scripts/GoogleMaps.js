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
    var mapa = new google.maps.Map(document.getElementById('google'),
    {
        zoom: 10,
        center: new google.maps.LatLng(coordenadas.lat,coordenadas.lng)
    })
    marcador = new google.maps.Marker({
        map: mapa,
        draggable: true,
        position: new google.maps.LatLng(coordenadas.lat,coordenadas.lng) 
    });
}





   

