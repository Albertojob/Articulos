	function carga(accion,codArt) {
		// Definicion de elementos
		const form = document.createElement("form");
		var elemento = document.createElement("input");

		// Variables del formulario
		form.method = 'POST';
		form.action = 'https://localhost:3000/'+accion;

		// Añadimos el elemento
		elemento.name = "dato";
		elemento.value = codArt;
		elemento.type = "hidden";
		form.appendChild(elemento);

		// Enganchamos y envimos el formulario
		document.body.appendChild(form);
		form.submit();
	};

