const fs = require('fs');
const http = require('http');
const util = require('util');
const download_url = "http://dfp529wcvahka.cloudfront.net/manifests/leaderboards/scores/%s.json";
const weekly_url = "http://dfp529wcvahka.cloudfront.net/manifests/weeklyChallenges.json";
const download_challenges_url = "http://dfp529wcvahka.cloudfront.net/manifests/leaderboards/challenges/scores/%s.json";
const identifiers = {
"1":  ["mAp2V","NAgrb","Bbm2A","0A5Zn","JbOmn","aVeaV","5VlRA","gnR7V","7b7xA","WAGoA","ObqMb","EAaRn","Xb3Ob","1nXeV","EABGn","6Vw5A"],
"2":  ["zA0Mn","kb2wA","gb1Kn","AoQzv","MAr3n","QVYRb","JnZ2n","PV4Qb","yb8Pb","gnyrV","MAEoV","qn9JV","lnKkn","MV6DA","1nQen","bmw2n"],
"3":  ["jnL9V","vAMDb","5AWzb","bdjrn","JbDPb","mnkRA","Ap22V","abx5A","5VJBV","zAvPV","JVPon","ZbjWA","XVzGb","A5QZA","ObNoA","AgXrn"],
"4":  ["nk2rA","nKv3A","bje7V","b2qZV","VPllV","nyl7A","VY39A","Av89V","bxeQA","AW4kn","bDDrb","nQlOA","nZLOb","n9ZBV","AM8vb","V6BNV"],
"5":  ["Aa58R","b7l7x","AB1QG","nZLM2","nRM67","b1WmK","AoqEe","b3WOO","AGDKo","nKvxk","nXZMe","A0ZgM","AEOYo","VwMk5","bqYEM","VY3MR"],
"1c": ["AW7zA","bq7Mn","Aa7RV","Ao2eb","nXLen","Vw85b","V6qDn","nK8kV","b33Ob","A0rMV","nZ32V","VY4Rn","ABDGV","AEBon","b1qKb","n9dJA"],
"2c": ["VzoGb","nQOeb","b2WwA","b1p95","AMmDA","VJDBA","AvMPb","bN5oV","bDzPn","bxN5n","nklRV","VPgon","bdarA","bjMWV","nLm9V","V4LQV"],
"3c": ["Vezab","Arl3V","b83PV","A5GZV","bqYMb","AGDon","ApQ9n","ApQ2n","AgrJb","bdaqA","Agrrb","b7lxA","bmK2n","Vl5Rb","bOpmA","nRM7A"],
"4c": ["b7ljA","bOpaA","Aa5OA","VwMpA","A0ZaV","bqYob","A5GJV","b3WDb","nXZzb","nRM8A","AGD6n","AB19b","Vez1b","bmK9n","AoqpV","Vl5gb"],
"5c": ["bx3E5","nLar9","bdaJr","b8zGP","AgrJr","ArdM3","ApQj2","VzJ2G","VJGKB","V45eQ","Av8NP","bNdLo","b2Z5w","nQm4e","V6BRD","VPeKo"],
"6":  ["bOeMR","A5XOx","nR5Re","bm2OL","b7WRR","Vl2Wp","VeDY5","AGvLD","AaE79","bqe7e"]
}

function getLevel(id, name, url) {
	return new Promise((resolve, reject) => {
		const file = fs.createWriteStream('data/'+name+'.json');
		http.get(util.format(url, id), function(res) {
			res.on('end', () => {
				resolve(res);
			});
			res.on('error', (error) => {
				reject(error);
			});
			res.pipe(file);
		});
		console.log('Get', id, name);
	});
}

async function getLevels() {
	for(const [w, ids] of Object.entries(identifiers)) {
		let n = 1;
		for(id of ids) {
			let level = w[0]+'-'+String(n).padStart(2, '0')+(w[1]?w[1]:'');
			await getLevel(id, level, download_url);
			n++;
		}
	}
}

async function getChallengeIds() {
	return new Promise((resolve, reject) => {
		http.get(weekly_url, function(res){
			var body = '';
			res.on('data', function(chunk){
				body += chunk;
			});

			res.on('end', function(){
				var weeklys = JSON.parse(body);
				resolve(weeklys);
			});

			res.on('error', (error) => {
				reject(error);
			});
		});
	});
}

async function getChallenges() {
	let weeklys = await getChallengeIds();
	for(week of weeklys) {
		await getLevel(week.id, 'w'+week.week, download_challenges_url);
	}
}
async function update() {
	await getLevels();
	await getChallenges();
}

update();