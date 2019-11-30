var members = data.results[0].members;

var stadistics = {
	"results":[{
	"Partys":[{
		"name":"Democrat",
		"party":"D",
		"voteWithParty":0,
		"members":[],
	},
	{
		"name":"Republican",
		"party":"R",
		"voteWithParty":0,
		"members":[],
	},
	{
		"name":"Independent",
		"party":"I",
		"voteWithParty":0,
		"members":[],
	}	
	],
	"less_engaged": [],
	"most_engaged": [],
	"less_loyal": [],
	"most_loyal": [],
	"tenPercent":Math.round(members.length/10),
}]}

calcularMiembros(members);

function calcularMiembros(members){
	var voteWithPartyD = 0;
	var voteWithPartyR = 0;
	var voteWithPartyI = 0;

	members.forEach(element => {
		if(element.party === "D"){
			stadistics.results[0].Partys[0].members.push(element);
			voteWithPartyD = voteWithPartyD + element.votes_with_party_pct;
			stadistics.results[0].Partys[0].voteWithParty = (voteWithPartyD/stadistics.results[0].Partys[0].members.length).toFixed(2);
		}	

		if(element.party === "R"){
			stadistics.results[0].Partys[1].members.push(element);
			voteWithPartyR = voteWithPartyR + element.votes_with_party_pct;
			stadistics.results[0].Partys[1].voteWithParty = (voteWithPartyR/stadistics.results[0].Partys[1].members.length).toFixed(2);
		}	
		if(element.party === "I"){
			stadistics.results[0].Partys[2].members.push(element);
			voteWithPartyI = voteWithPartyI + element.votes_with_party_pct;
			stadistics.results[0].Partys[2].voteWithParty = (voteWithPartyI/stadistics.results[0].Partys[2].members.length).toFixed(2);
		}	
	});

	// stadistics.results[0].Partys[0].voteWithParty = (voteWithPartyD/stadistics.results[0].Partys[0].members.length).toFixed(2);
	// stadistics.results[0].Partys[1].voteWithParty = (voteWithPartyR/stadistics.results[0].Partys[1].members.length).toFixed(2);
	// stadistics.results[0].Partys[2].voteWithParty = (voteWithPartyI/stadistics.results[0].Partys[2].members.length).toFixed(2);
}


function compareLoyal(members) {
	members.sort(function (a, b) {
	if (a.votes_with_party_pct > b.votes_with_party_pct) {
		return 1;
	}
	if (a.votes_with_party_pct < b.votes_with_party_pct) {
		return -1;
	}
	// a must be equal to b
	return 0;
	});
	return members;
}

function less(members){
	members = this.compareLoyal(members);
	members.forEach(element =>{
		if (stadistics.results[0].less_loyal.length>=stadistics.results[0].tenPercent){			
			if(stadistics.results[0].less_loyal[stadistics.results[0].tenPercent - 1].votes_with_party_pct != element.votes_with_party_pct){
		 		return false;}
		}
		stadistics.results[0].less_loyal.push(element);
	})
}

less(members);

function most(members){
	members = this.compareLoyal(members);
	members.reverse();
	members.forEach(element =>{
		if (stadistics.results[0].most_loyal.length>=stadistics.results[0].tenPercent){			
			if(stadistics.results[0].most_loyal[stadistics.results[0].tenPercent - 1].votes_with_party_pct != element.votes_with_party_pct){
		 		return false;
		}
		}
		stadistics.results[0].most_loyal.push(element);
	})
}

most(members);

function compareEngaged(members) {
	members.sort(function (a, b) {
	if (a.missed_votes_pct > b.missed_votes_pct) {
		return 1;
	}
	if (a.missed_votes_pct < b.missed_votes_pct) {
		return -1;
	}
	return 0;
	});
	return members;
}

function lessEngaged(members){
	members = this.compareEngaged(members);
	members.forEach(element =>{
		if (stadistics.results[0].less_engaged.length>=stadistics.results[0].tenPercent){			
			if(stadistics.results[0].less_engaged[stadistics.results[0].tenPercent - 1].missed_votes_pct != element.missed_votes_pct){
		 		return false;}
		}
		stadistics.results[0].less_engaged.push(element);
	})
}

lessEngaged(members);

function mostEngaged(members){
	members = this.compareEngaged(members);
	members.reverse();
	members.forEach(element =>{
		if (stadistics.results[0].most_engaged.length>=stadistics.results[0].tenPercent){			
			if(stadistics.results[0].most_engaged[stadistics.results[0].tenPercent - 1].missed_votes_pct != element.missed_votes_pct){
		 		return false;
		}
		}
		stadistics.results[0].most_engaged.push(element);
	})
}

mostEngaged(members);
