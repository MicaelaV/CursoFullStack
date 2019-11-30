dataOnline();

function dataOnline(){
	var app = new Vue({
		el:'#app',
			data:{
				"miembros" : [],
				"miembrosfiltrados": []
			},
			created(){
				const url = urldata;
				const init={
						method: 'GET',
						mode: 'cors',
						headers: {'X-API-Key': 'ytokQmbWVhwnX4OCsHINSSJiiqN9jPQQiJOYTuQT'}
			};
			fetch(url,init)
				.then(respuesta => 
					respuesta.ok ? 
					respuesta.json().then(datos => {
						app.miembros=datos.results[0].members;
						app.miembrosfiltrados = datos.results[0].members;
							calcularEstadisticas(datos.results[0].members);
						})
					: console.log("Error"));	
			},
			methods:{
				filtro: function(){					
					miembros= app.miembros;
					valoresParty = Array.from(document.querySelectorAll('input[name=party_type]:checked')).map(elt => elt.value);
					valoresStates = document.querySelector('#destinations').value;

					if (valoresStates === "ALL") { 
						app.miembrosfiltrados = miembros.filter(function(valor){ 
							return valoresParty.includes(valor.party);});
					} else {
						app.miembrosfiltrados = miembros.filter(function(valor){ 
							return valoresParty.includes(valor.party) && valoresStates.includes(valor.state);});
					}
				}
				
			}			
	
	})
}