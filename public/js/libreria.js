	function carga(accion,codArt) {
		// Definicion de elementos
		const form = document.createElement("form");
		var elemento = document.createElement("input");

		// Variables del formulario
		form.method = 'POST';
		// Esto cambia para local o para heroku
		// form.action = 'http://localhost:3000/'+accion;
		form.action = accion;
		// Añadimos el elemento
		elemento.name = "dato";
		elemento.value = codArt;
		elemento.type = "hidden";
		form.appendChild(elemento);

		// Enganchamos y envimos el formulario
		document.body.appendChild(form);
		form.submit();
	};

