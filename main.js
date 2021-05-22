const obtenerParametro = parametro => new URLSearchParams(location.search).get(parametro);

async function consumirAPI(url) {
	await fetch(url)
		.then(res => res.json())
		.then(res => res.results)
		.then(res => res.forEach(personaje => {
			const estado = personaje.status == "Alive" ? "Vivo :)" : "Muerto :(";

			document.getElementById("main").innerHTML += String(
				`<article class="personaje">`+
					`<img class="imagen" src=${personaje.image}>`+
					`<h2 class="titulo">${personaje.name}</h2>`+
					`<h2 class="especie">${personaje.species}</h2>`+
					`<h3 class="estado"><i class="fas fa-circle icono-${estado.replace(/^[\:\(\)\s]+/, "").toLowerCase()}"></i> ${estado}</h3>`+
				`</article>`
			);
		})).catch(err => console.log(err))
		agregarEventos();
}

function agregarEventos() {
	document.getElementById("btn_buscar_personaje").addEventListener("click", () => location.href = `./?name=${document.getElementById("buscar_personaje").value}`);
	document.getElementById("btn_anterior").addEventListener("click", () => {
		if (obtenerParametro("tab") != "1") location.href = `./?tab=${obtenerParametro("tab") - 1}`;
		else if (obtenerParametro("tab") == "1") Swal.fire("Ya te encuentras en la primer página");
	});
	document.getElementById("btn_siguiente").addEventListener("click", () => {
		if (obtenerParametro("tab") != "34") location.href = `./?tab=${(parseInt(obtenerParametro("tab")) + 1)}`;
		else if (obtenerParametro("tab") == "34") Swal.fire("Ya te encuentras en la ultmima página");
	});
}

if (Number(obtenerParametro("tab")) >= 1 && !isNaN(obtenerParametro("tab")) && obtenerParametro("tab") != null && obtenerParametro("name") == null) consumirAPI(`https://rickandmortyapi.com/api/character?page=${parseInt(obtenerParametro("tab"))}`);
else if (obtenerParametro("name") != null && obtenerParametro("tab") == null)	consumirAPI(`https://rickandmortyapi.com/api/character?name=${obtenerParametro("name")}`);
else location.href = "./?tab=1";

if (obtenerParametro("tab") <= 4 || obtenerParametro("tab") == 34) document.getElementById(`enlace_pagina_${obtenerParametro("tab")}`).className = "enlace pagina_actual";
else document.getElementById("pagina_actual").innerHTML = (
	`<span class="enlace pagina_actual">${obtenerParametro("tab")}</span> ...`
);
