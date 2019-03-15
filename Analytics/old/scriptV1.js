$(document).ready(function() {

	
/*
	var obj = {
		initials: {
			team_id: 1747,
			match_no: 0,
			pos: ["N","N"],
			gamepiece: "N",
			preloaded: [],
		},
		sandstorm: {
			autonomous: false,
			hit_1747: false,
			points: []
		},
		teleop: {
			points: []
		},
		endgame: {
			climb_level: -1,
			buddy_climb: [0,false],
			win: false
		},
		notes: ""
	}	
	
	obj.initials.team_id
	//outputs: 1747
*/
//indices.sort((a, b) => b - a);
//console.log("ready!");
//console.log(arr[10].initials.team_id);
	
let teams = [];
let bigObj;
$('.teams').on('input', function() {
	//console.log("input");
	bigObj = [];
	//reset our container
	$('.container').html("");
	teams = $('.teams').val().split(',');
	console.log("NEW SCRIPT ->");
	
	//Build a schema for each team in our array
	for (let i = 0; i < teams.length; i++) {
		console.log("teams["+i+"] = " + teams[i]);
		
		//Clear up some confusion for myself
		currentTeamNo = teams[i];
		
		
		//In order to do anything useful with our data, we're going to need to find the 
		//indices of our gigantic array where data about our team is present
		//So, let's build ourselves an array that contains the indices in our array for our data:
		let indices = [];
		for (let j = 0; j < arr.length; j++) {
			//if our currentTeamNo matches the current object, push our indice:
			if (currentTeamNo == arr[j].initials.team_id) {
				indices.push(j);
			}
		}
		//This is to check that we're getting this right:
		/*
		for (let j = 0; j < indices.length; j++) {
			console.log("indices["+j+"] = " + indices[j]);
		}
		*/
		
		//Next, we're going to want to grab all the points for all our current team's matches, and 
		//push them to their respective arrays (remember, our points object don't tell whether its sandstorm or teleop).
		let sandstormPoints = [];
		let teleopPoints = [];
		let startingPos = [];
		for (let j = 0; j < indices.length; j++) {
			//So, arr[indices[j]] will point directly to each object that contains our team's data.
			//Let's set that value to currentMatch (even though we're only recording the team from the match)
			//just to clear up some confusion.
			//console.log("indices["+j+"] = "+indices[j]);
			let currentMatch = arr[indices[j]];
			
			
			//Now, the points are stored in an array in our object, so we'll need another for loop to grab those.
			//According to our structure, points are stored in the sandstorm and teleop subobjects, so we'll need a for loop for both of them.
			for (let k = 0; k < currentMatch.sandstorm.points.length; k++) {
				sandstormPoints.push(currentMatch.sandstorm.points[k]);
			}
			//Let's do the same for teleop
			for (let k = 0; k < currentMatch.teleop.points.length; k++) {
				//console.log("in loop, teleop = " + currentMatch.teleop.points[k]);
				teleopPoints.push(currentMatch.teleop.points[k]);
			}
			//now for starting position
			startingPos.push(currentMatch.initials.pos);
		}
		
		/*
		for (var j = 0; j < sandstormPoints.length; j++) {
			console.log("sandstormPoints["+j+"].cargo_type = " + sandstormPoints[j].cargo_type);
		}
		for (var j = 0; j < teleopPoints.length; j++) {
			console.log("teleopPoints["+j+"].cargo_type = " + teleopPoints[j].cargo_type);
		}
		*/
		//console.log("here, teleopPoints(0) = " + teleopPoints[0].cargo_type);
		
		//WHEW! Now that we've finished that, let's make something reasonable out of all these points.
		//I'm thinking a heatmap, and the functions are described below.
		//I've built mapPoints(teamNo,sandstormPoints,teleopPoints), which returns a string containing the div to put on our heatmap
		//NOTE: arrs passed to mapPoints should ONLY contain data points.
		//console.log("PASSED ARRAY SANDSTORMPOINTS = ");
		
		let teamHeatMap = mapPoints(currentTeamNo,sandstormPoints,teleopPoints, startingPos);
		
		
		$('.container').append(teamHeatMap);
		//For our current team,  we're going to want to build ourselves a heatmap:
		
		
		
		
	}
	function mapPoints(teamNo, sandstormPoints, teleopPoints, startingPos) {
		console.log("UNDER MAP POINTS:");
		console.log("SO, TELEOPPOINTS[0].CARGO_TYPE = " + teleopPoints[0].cargo_type);
		/*
			So I've been to the moon and back with function. Just to let you know, we'll have quite a few arrays to mess with:
			lRocketSandstorm
			lRocketTeleop
			rRocketSandstorm
			rRocketTeleop
			cargoSandstorm
			cargoTeleop
			
			Now I know that it seems unnecessary to divide each part by sandstorm and teleop, but my poor brain can't handle all of this. I really just want to take this apart piece by piece
		*/
		
		//These are important for our arrays. You'll notice these variables later.
		const panel = 0;
		const cargo = 1;
		//First thing we need to do is to declare our div:
		var div = "";
		//Just to keep everything the same, I've initialized it blank. We'll add onto it.
		div += "<div class=\"points-grid\">";
		//Here comes some confusion: Our rocket is rotate 90deg counter-clockwise. We'll have to account for that below
		
		//I'm thinking that for our columns, they'll be described like this:
		//<tr class="<team no>-lrocket-<column no>">
		
		//Lets go ahead and build this thing
		//So we'll want to build an array like this:
		/*
		var lRocket = [
				CLOSE FAR
				  p,c
		TOP		[[0,1], 	[1,1]],
				[[3,1],		[5,4]],
		BOTTOM	[[0,2], 	[1,0]]
		]
		so lRocket[row][column][0=panel,1=cargo]
		
		*/
		
		//Get our arrays and store them
		let lRocketSandstorm = buildMapArr(sandstormPoints, "lRocket");
		let lRocketTeleop = buildMapArr(teleopPoints, "lRocket");
		let rRocketTeleop = buildMapArr(teleopPoints, "rRocket");
		let rRocketSandstorm = buildMapArr(sandstormPoints, "rRocket");
		let shipSandstorm = buildMapArr(sandstormPoints, "ship");
		let shipTeleop = buildMapArr(teleopPoints, "ship");
		
		currentObj = {
			teamNo: teamNo,
			lRocketSandstorm: lRocketSandstorm,
			lRocketTeleop: lRocketTeleop,
			rRocketTeleop: rRocketTeleop,
			rRocketSandstorm: rRocketSandstorm,
			shipSandstorm: shipSandstorm,
			shipTeleop: shipTeleop
		};
		bigObj.push(currentObj);
			
		
		/*
		console.log("lRocketSandstorm = ");
		logArray(lRocketSandstorm, 3);
		console.log("lRocketTeleop = ");
		logArray(lRocketTeleop, 3);
		console.log("rRocketTeleop = ");
		logArray(rRocketTeleop, 3);
		console.log("ship teleop = ");
		logArray(shipTeleop, 3);
		*/
		
		
		div += buildVehicle(teamNo, lRocketSandstorm || [], lRocketTeleop || [], "lRocket");
		div += buildVehicle(teamNo, shipSandstorm || [], shipTeleop || [], "ship");
		div += buildVehicle(teamNo, rRocketSandstorm || [], rRocketTeleop || [], "rRocket");
		
		
		//Now lets build the function to append these tables
		//close off the table
		div += "</div>";
		
		
		//Now for our initials-grid
		div += "<div class=\"initials-grid\">";
		div += buildStartingPos(teamNo, startingPos);
		div += "</div>";
		
		console.log("div = " + div);
		console.log("END MAP POINTS");
		return div;
	} //mapPoints
	
	/*
		REQUIRES THE FOLLOWING:
		(arr) points - [arr of obj.sandstorm.points OR obj.teleop.points]
		(string) type - [lRocket, rRocket, ship]
		
		returns a array in mapArr format (which can now be used for our buildVehicle function)
		
	*/
	function buildMapArr(points, type) {
		const panel = 0;
		const cargo = 1;
		//points[i].cargo_type
		try {
			var newArr;
			if (type == "lRocket" || type == "rRocket") {		
				newArr = [
					[[0,0], [0,0]],
					[[0,0], [0,0]],
					[[0,0], [0,0]]
				];
			} else if (type == "ship") {
				newArr = [
					[[0,0], [0,0]],
					[[0,0], [0,0]],
					[[0,0], [0,0]],
					[[0,0], [0,0]]
				];
			} else {
				console.log("no map");
				//console.log("no map, name = " + name);
				return null;
			}
			
			for (let m = 0; m < points.length; m++) {
				if (points[m].vehicle == type) {
					//this object actually has our col and row already, so we'll use them.
					let row = points[m].row;
					let col = points[m].col;
					let obj = points[m].cargo_type;
					newArr[row][col][panel] += (obj == "panel" || obj == "both") ? 1 : 0;
					newArr[row][col][cargo] += (obj == "cargo" || obj == "both") ? 1 : 0;
				}
			}
			
			return newArr;
		} catch (e) {
			console.error("FAILED TO BUILD MAP POINTS...", e);
			//return "
		}
	}	
	
	/*
		This function is pretty similar to buildMapArr(), but is distinctly for the starting position. Hopefully we'll come back and revise this code one day.
		
		
	*/
	
	function buildPosArr(arr) {
	}
	
	/*
		REQUIRES THE FOLLOWING:
		(string) Team number
		(mapArr/arr) sandstorm
		(mapArr/arr) teleop
		(string) type - [lRocket, rRocket, Ship]
	*/
	function buildVehicle(teamNo, sandstorm, teleop, type) {
		const panel = 0;
		const cargo = 1;
		let section = "";
		
		//Let's define our table
		if (type == "lRocket")
			section += "<table class=\"l-rocket\">";
		else if (type == "ship")
			section += "<table class=\"cargo-ship\">";
		else if (type == "rRocket")
			section += "<table class=\"r-rocket\">";
		
		//Then, let's add our tbody
		section += "<tbody>";

		var total;
		
		if (type == "lRocket" || type == "rRocket") {
			total = [
				[[0,0], [0,0]],
				[[0,0], [0,0]],
				[[0,0], [0,0]]
			];
		} else if (type == "ship") {
			total = [
				[[0,0], [0,0]],
				[[0,0], [0,0]],
				[[0,0], [0,0]],
				[[0,0], [0,0]]
			];
		} else {
			console.log("no map");
			return null;
		}
		
		
		for (let i = 0; i < sandstorm.length; i++) {
			for (let j = 0; j < sandstorm[i].length; j++) {
				for (let k = 0; k < sandstorm[i][j].length; k++) {
					total[i][j][k] += sandstorm[i][j][k];
					
				}
			}
		}
		for (let i = 0; i < teleop.length; i++) {
			for (let j = 0; j < teleop[i].length; j++) {
				for (let k = 0; k < teleop[i][j].length; k++) {
					total[i][j][k] += teleop[i][j][k];
				}
			}
		}	
		console.log(type + " log:");
		logArray(total, 3);
		
		
		//Now that we have our total, let's figure out max val
		/*
			**IMPORTANT REGARDING SCORING**:
			Hatch Panels are worth (2) points.
			One cargo is worth (3) points.
			
			maxVal will hold the max value of a single section (hatch panels and cargo)
		*/
		let maxVal = 0;
		for (let i = 0; i < total.length; i++) {
			for (let j = 0; j < total[i].length; j++) {
				let sectionVal = 0;
				for (let k = 0; k < total[i][j].length; k++) {
					//K is only equal to 0 or 1. 0 for panel, 1 for cargo
					//These contain all points scored per section, so lets multiply
					sectionVal += (k == 0) ? (total[i][j][k] * 2) : (total[i][j][k] * 3);
				}
				//If section value is more than maxVal, set maxVal to sectionVal, otherwise set it to itself.
				maxVal = (sectionVal > maxVal) ? sectionVal : maxVal;
			}
		}			
		
		//With our total array, we can now render it. Each render is different, so just assume this code is correct.
		if (type == "lRocket") {
			for (let i = 1; i >= 0; i--) {
				section += "<tr class=\""+teamNo+"-"+type+"-"+i+"\">";
				for (let j = 0; j < total.length; j++) {
					let currentHatchPanels = total[j][i][panel];
					let currentCargo = total[j][i][cargo];
					let hpVals = currentHatchPanels * 2;
					let cargoVals = currentCargo * 3;
					//TODO: this code may be wrong:
					section += "<th type=\""+type+"\" teamNo=\""+teamNo+"\" row=\""+j+"\" col=\""+i+"\"><div style=\"opacity:"+((+hpVals + +cargoVals)/maxVal)+";\"></div></th>";
				}
				section += "</tr>";
			}
		} else if (type == "ship") {
			for (let i = 0; i < total.length; i++) {
				section += "<tr class=\""+teamNo+"-"+type+"-"+i+"\">";
				for (let j = 0; j < total[i].length; j++) {
					let currentHatchPanels = total[i][j][panel];
					let currentCargo = total[i][j][cargo];
					let hpVals = currentHatchPanels * 2;
					let cargoVals = currentCargo * 3;
					section += "<th type=\""+type+"\" teamNo=\""+teamNo+"\" row=\""+i+"\" col=\""+j+"\"><div style=\"opacity:"+((+hpVals + +cargoVals)/maxVal)+";\"></div></th>";
				}
				section += "</tr>";
			}
		} else if (type == "rRocket") {
			for (let i = 0; i < total[i].length; i++) {
				section += "<tr class=\""+teamNo+"-"+type+"-"+i+"\">";
				for (let j = total.length - 1; j >= 0; j--) {
					let currentHatchPanels = total[j][i][panel];
					let currentCargo = total[j][i][cargo];
					let hpVals = currentHatchPanels * 2;
					let cargoVals = currentCargo * 3;
					section += "<th type=\""+type+"\" teamNo=\""+teamNo+"\" row=\""+j+"\" col=\""+i+"\"><div style=\"opacity:"+((+hpVals + +cargoVals)/maxVal)+";\"></div></th>";
				}
				section += "</tr>";
			}
		}
		
		//Finally, let's close off our grid
		section += "</tbody></table>";
		
		return section;
	}
	
	function buildStartingPos(teamNo, startingPos) {
		let section = "<table class=\"starting-pos\">";
		section += "<tbody>";
		/*
			startingPos[indice][0 = col, 1 = row];
			
			startingPos = [
				["0","0"],
				["1","0"],
				["2","1"],
				["0","1"]
			]
		*/
		//Lets turn our data into an array to make more sense.
		//arr[row][col]
		let arr = [
			[0, 0, 0],
			[0, 0, 0]
		]
		
		//Put our data into this new array
		for (let i = 0; i < startingPos.length; i++) {
			if (isNaN(startingPos[i][0]) || isNaN(startingPos[i][1])) {
			} else {
				let col = startingPos[i][0];
				let row = startingPos[i][1];
				arr[row][col] += 1;
			}
		}
		//find our maxVal for our heatmap
		let maxVal = 0;
		for (let i = 0; i < arr.length; i++) {
			for (let j = 0; j < arr[i].length; j++) {
				maxVal = (maxVal < arr[i][j]) ? arr[i][j] : maxVal;
			}
		}
		
		//Now display this array in html form
		// below is the order of our html. We'll want to fill out the first row, so it's called like this:
		//arr[0][0]
		//arr[0][1]
		//arr[0][2]
		//arr[1][0]
		//arr[1][1]
		//arr[1][2]
		// 1 2 3
		// 4 5 6
		for (let i = 0; i < arr.length; i++) {
			section += "<tr>";
			for (let j = 0; j < arr[i].length; j++) {
				section += "<th type=\"starting-pos\" teamNo=\""+teamNo+"\" row=\""+i+"\" col=\""+j+"\"><div style=\"opacity:"+arr[i][j]/maxVal+";\"></div></th>";
			}
		}
		
		section += "</tbody>";
		section += "</table>";
		return section;
	}
	
	function logArray(arr, dim) {
		if (dim == 1) {
			let statement = "[";
			
			for (let v = 0; v < arr.length; v++) {
				statement += arr[v] + ", ";
			}
			statement += "]";
			console.log(statement);
			
		} else if (dim == 3) {
			for (let i = 0; i < arr.length; i++) {
				//TODO work here
			}
			if (arr[0][0].length) {
				/*					
				newArr = 
				[
					[[0,0], [0,0]],
					[[0,0], [0,0]],
					[[0,0], [0,0]]
				];
				*/
				console.log("[");
				for (let v = 0; v < arr.length; v++) {
					console.log("["+arr[v][0][0]+","+arr[v][0][1]+"], ["+arr[v][1][0]+","+arr[v][1][1]+"],");
				}
				console.log("]");
			}
		}
		//console.log(statement);
	}
		

});


let currentBlock = 500;
$(document).on('mouseenter','th', function() {
	let indice;
	try {
		for (let i = 0; i < bigObj.length || 0; i++) {
			if (bigObj[i].teamNo == $(this).attr("teamno")) {
				indice = i;
			}
		}
	} catch (e) {
	}
	//Whenever its clicked, do the following
	//console.log("Row = " + $(this).attr("row"));
	//console.log("Column = " + $(this).attr("col"));
	let width = 180;
	let height = 100;
	let row = $(this).attr("row");
	let col = $(this).attr("col");
	const panel = 0;
	const cargo = 1;
	const spacer = 5;
	
	let divX = $(this).width()/2;
	let divY = 0;
	
	
	let blockY = (divY - (spacer+height));
	let blockX = (divX - (width/2));
	let divObj = bigObj[indice];
	let div = "<div class=\"information\" id=\""+currentBlock+"\"style=\"top:"+blockY+"px;left:"+blockX+"px;\">";
	if ($(this).attr("type") == "lRocket") {
		div += "<span>Sandstorm hatch panels: " + divObj.lRocketSandstorm[row][col][panel] + "</span><br>";
		div += "<span>Teleop hatch panels: " + divObj.lRocketTeleop[row][col][panel] + "</span><br>";
		div += "<span>Sandstorm cargo: " + divObj.lRocketSandstorm[row][col][cargo] + "</span><br>";
		div += "<span>Teleop cargo: " + divObj.lRocketTeleop[row][col][cargo] + "</span><br>";
	} else if ($(this).attr("type") == "ship") {
		div += "<span>Sandstorm hatch panels: " + divObj.shipSandstorm[row][col][panel] + "</span><br>";
		div += "<span>Teleop hatch panels: " + divObj.shipTeleop[row][col][panel] + "</span><br>";
		div += "<span>Sandstorm cargo: " + divObj.shipSandstorm[row][col][cargo] + "</span><br>";
		div += "<span>Teleop cargo: " + divObj.shipTeleop[row][col][cargo] + "</span><br>";
	} else if ($(this).attr("type") == "rRocket") {
		div += "<span>Sandstorm hatch panels: " + divObj.rRocketSandstorm[row][col][panel] + "</span><br>";
		div += "<span>Teleop hatch panels: " + divObj.rRocketTeleop[row][col][panel] + "</span><br>";
		div += "<span>Sandstorm cargo: " + divObj.rRocketSandstorm[row][col][cargo] + "</span><br>";
		div += "<span>Teleop cargo: " + divObj.rRocketTeleop[row][col][cargo] + "</span><br>";		
	} else if ($(this).attr("type") == "starting-pos") {
		//This currently doesn't exist in divObj
		div += "<span>Starting this position: "++"</span><br>";
	}
	div += "</div>";
	
	$(this).append(div);
	//$(this).append("<div class=\"information\" id=\""+currentBlock+"\"style=\"top:"+blockY+"px;left:"+blockX+"px;\" ></div>");
	
	
});
$(document).on('mouseleave','div', function() {
	$('.information').remove();
	currentBlock++;
	
});
});
