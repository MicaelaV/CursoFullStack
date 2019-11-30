var dataTable = data.results[0].members;//le asigno a la variable todos los objetos
var dataStadistics = stadistics.results[0]; 
var less_loyal = stadistics.results[0].less_loyal; //array ordenado
var most_loyal = stadistics.results[0].most_loyal;
var less_engaged = stadistics.results[0].less_engaged; //array ordenado
var most_engaged = stadistics.results[0].most_engaged;

function tableHead(){
	return '<table><thead><tr><th>Name</th><th>Party</th><th>State</th><th>Years in Office</th><th>% Votes w/ Party</th></tr></thead>';
}

function tableBody(){
	var filtroRow = this.filtro();
	var html = this.tableHead();
	html += '<tbody>'; 
	for(let valor of filtroRow){ 
		if (valor.middle_name == null) {
			html +=` 
			<tr>
			<td>  <a href= "${valor.url}" > ${valor.last_name+" "+valor.first_name} </a></td>
			`
		}else{
			html +=`
			<tr>
			<td> <a href= "${valor.url}" > ${valor.last_name+" "+valor.first_name+" "+valor.middle_name} </a></td>
			`
		}
			html += `
			<td> ${valor.party} </td>
			<td> ${valor.state} </td>
			<td> ${valor.seniority} </td>    
			<td> ${valor.votes_with_party_pct+" % "}  </td>                    
			</tr>
			`					
	}
	html += "</tbody></table>";	
	document.getElementById("dataTables").innerHTML = html;
	return html;
}

function partySelected() {
	return Array.from(document.querySelectorAll('input[name=party_type]:checked')).map(elt => elt.value);
}


function filtro() {
	let valoresParty = this.partySelected();
	let valoresStates = this.filtroStates();
	if (valoresStates === "ALL") { 
		return dataTable.filter(function(valor){ 
  			return valoresParty.includes(valor.party);});
	} else {
		return dataTable.filter(function(valor){ 
  			return valoresParty.includes(valor.party) && valoresStates.includes(valor.state);});
	}
}


function filtroStates(){
	return document.querySelector('#destinations').value;
}


//Table Senate at a glance
function tableStadistics(){
  var html = '<table><thead><tr><th>Party</th><th>Number of Reps</th><th>% Voted with Party</th></tr></thead>';
	let valor = dataStadistics;
	//Make three lists, one for each party, and get the length
	html += '<tbody><tr>'; 
			html += `
			<td> Republican </td>
			<td> ${valor.Partys[1].members.length} </td>
			<td> ${valor.Partys[1].voteWithParty} % </td>                     
			</tr>
            `
            html += `
			<td> Democrat </td>
			<td>${valor.Partys[0].members.length}</td>
			<td> ${valor.Partys[0].voteWithParty} % </td>                     
			</tr>
            `
            html += `
			<td> Independent </td>
			<td>${valor.Partys[2].members.length}</td>
			<td> ${valor.Partys[2].voteWithParty} % </td>                     
			</tr>
			`					
	html += "</tbody></table>";	
	document.getElementById("dataStadistics").innerHTML = html;
	return html;
}

function tableLeastLoyal(){
	var html = '<table><thead><tr><th>Name</th><th>Number Party Votes</th><th>% Party Votes</th></tr></thead>';
	html += '<tbody>'; 
	//var dato = less_loyal;
	for(dato of less_loyal){
		if (dato.middle_name == null) {
			//armo filas
			html +=` 
			<tr>
			<td>  <a href= "${dato.url}" > ${dato.last_name+" "+dato.first_name} </a></td>
			`
		}else{
			html +=`
			<tr>
			<td> <a href= "${dato.url}" > ${dato.last_name+" "+dato.first_name+" "+dato.middle_name} </a></td>
			`
		}
			html += `
			<td>${dato.missed_votes_pct}</td>
			<td>${dato.votes_with_party_pct} % </td>                      
			</tr>
			`					
	};
	html += "</tbody></table>";	
	document.getElementById("tableLeastLoyal").innerHTML = html;
	return html;
}

function tableMostLoyal(){
	var html = '<table><thead><tr><th>Name</th><th>Number Party Votes</th><th>% Party Votes</th></tr></thead>';
	html += '<tbody>'; 
	for(dato of most_loyal){
		if (dato.middle_name == null) {
			//armo filas
			html +=` 
			<tr>
			<td>  <a href= "${dato.url}" > ${dato.last_name+" "+dato.first_name} </a></td>
			`
		}else{
			html +=`
			<tr>
			<td> <a href= "${dato.url}" > ${dato.last_name+" "+dato.first_name+" "+dato.middle_name} </a></td>
			`
		}
			html += `
			<td>${dato.total_votes}</td>
			<td>${dato.votes_with_party_pct} % </td>                      
			</tr>
			`					
	};
	html += "</tbody></table>";	
	document.getElementById("tableMostLoyal").innerHTML = html;
	return html;
}

function tableLeastEngaged(){
	var html = '<table><thead><tr><th>Name</th><th>Number Missed Votes</th><th>% Missed</th></tr></thead>';
	html += '<tbody>'; 
	for(dato of less_engaged){
		if (dato.middle_name == null) {
			html +=` 
			<tr>
			<td>  <a href= "${dato.url}" > ${dato.last_name+" "+dato.first_name} </a></td>
			`
		}else{
			html +=`
			<tr>
			<td> <a href= "${dato.url}" > ${dato.last_name+" "+dato.first_name+" "+dato.middle_name} </a></td>
			`
		}
			html += `
			<td>${dato.missed_votes}</td>
			<td>${dato.missed_votes_pct} % </td>                      
			</tr>
			`					
	};
	html += "</tbody></table>";	
	document.getElementById("tableLeastEngaged").innerHTML = html;
	return html;
}

function tableMostEngaged(){
	var html = '<table><thead><tr><th>Name</th><th>Number Missed Votes</th><th>% Missed</th></tr></thead>';
	html += '<tbody>'; 
	for(dato of most_engaged){
		if (dato.middle_name == null) {
			html +=` 
			<tr>
			<td>  <a href= "${dato.url}" > ${dato.last_name+" "+dato.first_name} </a></td>
			`
		}else{
			html +=`
			<tr>
			<td> <a href= "${dato.url}" > ${dato.last_name+" "+dato.first_name+" "+dato.middle_name} </a></td>
			`
		}
			html += `
			<td>${dato.missed_votes}</td>
			<td>${dato.missed_votes_pct} % </td>                      
			</tr>
			`					
	};
	html += "</tbody></table>";	
	document.getElementById("tableMostEngaged").innerHTML = html;
	return html;
}