let flex = document.getElementById('flex');
let cerrar = document.getElementById('close');


cerrar.addEventListener('click', function(e){
    miModal.style.display='none';
    e.stopPropagation();
});

window.addEventListener('click', function(e){
    if(e.target == flex){
        miModal.style.display='none';
    }
    e.stopPropagation();
});

window.addEventListener('load', function(){
    miModal.style.display='none';
});


function botonEliminar(codigo,modelo,destino) {
    document.getElementById('modal_eliminar').action = destino;
    document.getElementById('miModal').style.display='block';
    document.getElementById('codigo').value = codigo;
    document.getElementById('textoEliminar').innerHTML = "Esta seguro que quiere eliminar el Combustible ID:"+codigo+"<br>Descripcion:"+modelo;
}

function eliminar(){
    var url = "../controlador/controlador_articulos.php";
    let datos = new FormData(modal_eliminar);
    datos.append("aceptarEliminar","");
    fetch(url,{
         method: "POST",
         body: datos
    })
        .then( res => res.text())
        .then(response => {
            document.getElementById("eliminar_respuesta").value = response.mensaje;
            modal.style.display='none';
            getdetails(1);
    })
   
}