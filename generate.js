const fs = require('fs');
function thousands(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
fs.readdir('data', function(err, files) {
	for(file of files) {
		const level = file.split('.')[0];
		let any = 'any% leaderboards PB2 level '+level+' updated '+new Date().toISOString()+"\n\n";
		let unb = 'unbreaking leaderboards PB2 level '+level+' updated '+new Date().toISOString()+"\n\n";
		console.log(level);
		let data = fs.readFileSync('data/'+file);
		let lb = JSON.parse(data);

		let maxlen = thousands(lb.any.top1000[lb.any.top1000.length-1].value).length;
		let n = 1;
		for(s of lb.any.top1000) {
			let line = ((s.didBreak?'*':' ')+String(n)).padStart(5, ' ') + ". $"+String(thousands(s.value)).padEnd(maxlen, ' ') + ' ' + s.owner.display_name;
			n++;
			any += line+"\n";
		}
		fs.writeFile('leaderboards/'+level+"_any.txt", any, function (err) {
			if (err) return console.log(err);
		});

		maxlen = thousands(lb.unbroken.top1000[lb.unbroken.top1000.length-1].value).length;
		n = 1;
		for(s of lb.unbroken.top1000) {
			let line = ((s.didBreak?'*':' ')+String(n)).padStart(5, ' ') + ". $"+String(thousands(s.value)).padEnd(maxlen, ' ') + ' ' + s.owner.display_name;
			n++;
			unb += line+"\n";
		}
		fs.writeFile('leaderboards/'+level+"_unbreaking.txt", unb, function (err) {
			if (err) return console.log(err);
		});
	}
});