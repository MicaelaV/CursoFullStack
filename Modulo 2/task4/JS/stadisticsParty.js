var miembros;
var app = new Vue ({
	el:"#appStadistics",
	data:{
	"democratasTotal": 0,
	"republicanosTotal": 0,
	"independentesTotal": 0,
	"voteWithPartyD": 0,
	"voteWithPartyR": 0,
	"voteWithPartyI": 0,
	"members_missed_votes":[],

	"less_loyal": [],

	"totalTenPercentLess":0,
	"totalTenPercentMost":0,
	"totalTenPercent":0,

	},
});


var stadistics = {
	"less_loyal": [],
	"most_loyal": [],

	"democratas": [],
	"republicanos": [],
	"independentes": [],

	"tenPercent":0,
}

function calcularEstadisticas(members){
	calcularMiembros(members);

	//acomodar miembros
	app.less_loyal = members.sort(function (a, b) {
	if (a.votes_with_party_pct > b.votes_with_party_pct) {return 1;}
	if (a.votes_with_party_pct < b.votes_with_party_pct) {return -1;}
	return 0;});
	app.totalTenPercentLess = porcetajeLess(app.less_loyal);
	app.totalTenPercentMost = porcetajeMost(app.less_loyal.slice().reverse());
}
  
function calcularMiembros(miembros){
	
	stadistics.democratas = miembros.filter(element => element.party === "D").map(member => member.votes_with_party_pct);
	app.democratasTotal = stadistics.democratas.length;
	stadistics.democratas.forEach(element =>{app.voteWithPartyD = app.voteWithPartyD + element;})
	app.voteWithPartyD = (app.voteWithPartyD/app.democratasTotal).toFixed(2);

	stadistics.republicanos = miembros.filter(element => element.party === "R").map(member => member.votes_with_party_pct);
	app.republicanosTotal = stadistics.republicanos.length;
	stadistics.republicanos.forEach(element =>{app.voteWithPartyR = app.voteWithPartyR + element;})
	app.voteWithPartyR = (app.voteWithPartyR/app.republicanosTotal).toFixed(2);

	stadistics.independentes = miembros.filter(element => element.party === "I").map(member => member.votes_with_party_pct);
	app.independentesTotal = stadistics.independentes.length;
	stadistics.independentes.forEach(element =>{app.voteWithPartyI = app.voteWithPartyI + element;})
	app.voteWithPartyI = (app.voteWithPartyI/app.independentesTotal).toFixed(2);
	}

function porcetajeLess(members){
	var i =0;
	members.forEach(element =>{
		if (i>=Math.round(members.length/10)){	
			if(app.less_loyal[Math.round(members.length/10) - 1].votes_with_party_pct != element.votes_with_party_pct){					
				return;}
		}
		i = i+1;
	})
	return i;
}

function porcetajeMost(members){
	let i =0;
	members.forEach(element =>{
		if (i>=Math.round(members.length/10)){	
			if(app.less_loyal[Math.round(members.length/10) - 1].votes_with_party_pct != element.votes_with_party_pct){					
				return;}
		}
		i = i+1;
	})
	return i;
}