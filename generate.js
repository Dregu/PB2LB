const fs = require('fs');
let levels = {
  "1-01": "Ten Meter Simple Bridge",
  "1-02": "A New Slope",
  "1-03": "Bridge of Steel",
  "1-04": "Fourteen Meter Overpass",
  "1-05": "Checkpoints",
  "1-06": "First Drawbridge",
  "1-07": "Taxi Task",
  "1-08": "Rope Support",
  "1-09": "Budget Cuts",
  "1-10": "First Jump",
  "1-11": "Stop N' Go",
  "1-12": "Rock Rest",
  "1-13": "Redraw",
  "1-14": "Land Brace",
  "1-15": "Hydraulic Management",
  "1-16": "Large Bridge",
  "2-01": "Unity",
  "2-02": "Long Drawbridge",
  "2-03": "Low Rider",
  "2-04": "Buggy Bouncer",
  "2-05": "Rockin'",
  "2-06": "Roundabout",
  "2-07": "Double Decker Highway",
  "2-08": "Split Level",
  "2-09": "Anchors Away",
  "2-10": "Fork in the Road",
  "2-11": "Air Show",
  "2-12": "Momentum",
  "2-13": "Compression",
  "2-14": "Dip N' Draw",
  "2-15": "Weight Distribution",
  "2-16": "Stow Away",
  "3-01": "Loop Hole",
  "3-02": "Big Dipper",
  "3-03": "String Theory",
  "3-04": "Double Down",
  "3-05": "Semi Slope",
  "3-06": "Rock Skipping",
  "3-07": "Support Cable",
  "3-08": "Crossed Paths",
  "3-09": "Wibbly Wobbly",
  "3-10": "Shafted",
  "3-11": "Cross Jump",
  "3-12": "Emergency Interference",
  "3-13": "Diagonal Elevator",
  "3-14": "Low Flyer",
  "3-15": "Looper's Revenge",
  "3-16": "Monster Truck Rally",
  "4-01": "Edgy",
  "4-02": "Collision Warning",
  "4-03": "Sloped Drawbridge",
  "4-04": "Trap Door",
  "4-05": "Triple Decker Drawbridge",
  "4-06": "Safety Gap",
  "4-07": "Big Spender",
  "4-08": "Thread the Needle",
  "4-09": "Tipping Tower",
  "4-10": "Drawbridge in Disguise",
  "4-11": "Lean on Me",
  "4-12": "Trailblazer",
  "4-13": "Diagonal Drawbridge",
  "4-14": "Big Rigs",
  "4-15": "Twists and Turns",
  "4-16": "Don't Leave Me",
  "5-01": "Falling Into Place",
  "5-02": "Truck Way In",
  "5-03": "Trading Places",
  "5-04": "Acceleration",
  "5-05": "Sorting",
  "5-06": "Brake Pad",
  "5-07": "Passing By",
  "5-08": "Bus Routes",
  "5-09": "Springboard",
  "5-10": "All Together Now",
  "5-11": "Gettin' Loppy",
  "5-12": "Crash Course",
  "5-13": "Spring and a Miss",
  "5-14": "In Suspence",
  "5-15": "Double Duty",
  "5-16": "Leverage",
  "6-01": "Earthquake",
  "6-02": "Canyon Carriage",
  "6-03": "Parkade Elevator",
  "6-04": "Bridgelike Motion",
  "6-05": "Edgeworks",
  "6-06": "Spring Loaded",
  "6-07": "Get a Grip",
  "6-08": "How the Turntables",
  "6-09": "Squeeze Through",
  "6-10": "Bridge-in-a-Box",
  "6-11": "Wall Jumpin'",
  "6-12": "Mind the Gap",
  "6-13": "Pinball",
  "6-14": "Spin Cycle",
  "6-15": "Special Delivery",
  "6-16": "Rube Goldbridge",
  "1-01C": "Ten Meter Simple Bridge",
  "1-02C": "A New Slope",
  "1-03C": "Bridge of Steel",
  "1-04C": "Fourteen Meter Overpass",
  "1-05C": "Checkpoints",
  "1-06C": "First Drawbridge",
  "1-07C": "Taxi Task",
  "1-08C": "Rope Support",
  "1-09C": "Budget Cuts",
  "1-10C": "First Jump",
  "1-11C": "Stop N' Go",
  "1-12C": "Rock Rest",
  "1-13C": "Redraw",
  "1-14C": "Land Brace",
  "1-15C": "Hydraulic Management",
  "1-16C": "Large Bridge",
  "2-01C": "Unity",
  "2-02C": "Long Drawbridge",
  "2-03C": "Low Rider",
  "2-04C": "Buggy Bouncer",
  "2-05C": "Rockin'",
  "2-06C": "Roundabout",
  "2-07C": "Double Decker Highway",
  "2-08C": "Split Level",
  "2-09C": "Anchors Away",
  "2-10C": "Fork in the Road",
  "2-11C": "Air Show",
  "2-12C": "Momentum",
  "2-13C": "Compression",
  "2-14C": "Dip N' Draw",
  "2-15C": "Weight Distribution",
  "2-16C": "Stow Away",
  "3-01C": "Loop Hole",
  "3-02C": "Big Dipper",
  "3-03C": "String Theory",
  "3-04C": "Double Down",
  "3-05C": "Semi Slope",
  "3-06C": "Rock Skipping",
  "3-07C": "Support Cable",
  "3-08C": "Crossed Paths",
  "3-09C": "Wibbly Wobbly",
  "3-10C": "Shafted",
  "3-11C": "Cross Jump",
  "3-12C": "Emergency Interference",
  "3-13C": "Diagonal Elevator",
  "3-14C": "Low Flyer",
  "3-15C": "Looper's Revenge",
  "3-16C": "Monster Truck Rally",
  "4-01C": "Edgy",
  "4-02C": "Collision Warning",
  "4-03C": "Sloped Drawbridge",
  "4-04C": "Trap Door",
  "4-05C": "Triple Decker Drawbridge",
  "4-06C": "Safety Gap",
  "4-07C": "Big Spender",
  "4-08C": "Thread the Needle",
  "4-09C": "Tipping Tower",
  "4-10C": "Drawbridge in Disguise",
  "4-11C": "Lean on Me",
  "4-12C": "Trailblazer",
  "4-13C": "Diagonal Drawbridge",
  "4-14C": "Big Rigs",
  "4-15C": "Twists and Turns",
  "4-16C": "Don't Leave Me",
  "5-01C": "Falling Into Place",
  "5-02C": "Truck Way In",
  "5-03C": "Trading Places",
  "5-04C": "Acceleration",
  "5-05C": "Sorting",
  "5-06C": "Brake Pad",
  "5-07C": "Passing By",
  "5-08C": "Bus Routes",
  "5-09C": "Springboard",
  "5-10C": "All Together Now",
  "5-11C": "Gettin' Loppy",
  "5-12C": "Crash Course",
  "5-13C": "Spring and a Miss",
  "5-14C": "In Suspence",
  "5-15C": "Double Duty",
  "5-16C": "Leverage"
}
function thousands(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
fs.readdir('data', function(err, files) {
	for(file of files) {
		const level = file.split('.')[0].toUpperCase();
		let name = levels[level];
		if(!name && level.startsWith('W')) {
			name = 'Weekly Challenge #'+parseInt(level.substr(1));
		} else if(!name) {
			name = '???';
		}
		console.log(level, name);
		let data = fs.readFileSync('data/'+file);
		let lb = JSON.parse(data);
		let any = 'Poly Bridge 2 - '+level+' "'+name+'" any% leaderboard (* = breaks)\nUpdated '+new Date().toISOString()+'\n'+lb.any.top1000.length+'/'+lb.any.metadata.uniqueRanksCount+' unique ranks shown\n\n';
		let unb = 'Poly Bridge 2 - '+level+' "'+name+'" unbreaking leaderboard\nUpdated '+new Date().toISOString()+'\n'+lb.unbroken.top1000.length+'/'+lb.unbroken.metadata.uniqueRanksCount+' unique ranks shown\n\n';
		let maxlen = thousands(lb.any.top1000[lb.any.top1000.length-1].value).length;
		let n = 1;
		for(s of lb.any.top1000) {
			let line = ((s.didBreak?'*':' ')+String(n)).padStart(5, ' ') + ". $"+String(thousands(s.value)).padEnd(maxlen, ' ') + ' ' + s.owner.display_name;
			n++;
			any += line+"\n";
		}
		fs.writeFile('leaderboards/'+level.toLowerCase()+"_any.txt", any, function (err) {
			if (err) return console.log(err);
		});

		maxlen = thousands(lb.unbroken.top1000[lb.unbroken.top1000.length-1].value).length;
		n = 1;
		for(s of lb.unbroken.top1000) {
			let line = String(n).padStart(5, ' ') + ". $"+String(thousands(s.value)).padEnd(maxlen, ' ') + ' ' + s.owner.display_name;
			n++;
			unb += line+"\n";
		}
		fs.writeFile('leaderboards/'+level.toLowerCase()+"_unbreaking.txt", unb, function (err) {
			if (err) return console.log(err);
		});
	}
});
