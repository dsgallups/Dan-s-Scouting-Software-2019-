$(document).ready(function() {
	
	
	/*
			var obj = {
				initials: {
					team_id: 0,
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
	*/
	//indices.sort((a, b) => b - a);
	//console.log("ready!");
	//console.log(arr[10].initials.team_id);
	
let teams = [];

$('.teams').on('input', function() {
	//console.log("input");
	$('.container').html("");
	teams = $('.teams').val().split(',');
	
	
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
		var sandstormPoints = [];
		var teleopPoints = [];
		for (let j = 0; j < indices.length; j++) {
			//So, arr[indices[j]] will point directly to each object that contains our team's data.
			//Let's set that value to currentMatch (even though we're only recording the team from the match)
			//just to clear up some confusion.
			console.log("indices["+j+"] = "+indices[j]);
			let currentMatch = arr[indices[j]];
			
			
			//Now, the points are stored in an array in our object, so we'll need another for loop to grab those.
			//According to our structure, points are stored in the sandstorm and teleop subobjects, so we'll need a for loop for both of them.
			for (let k = 0; k < currentMatch.sandstorm.points.length; k++) {
				sandstormPoints.push(currentMatch.sandstorm.points[k]);
			}
			//Let's do the same for teleop
			for (let k = 0; k < currentMatch.teleop.points.length; k++) {
				console.log("in loop, teleop = " + currentMatch.teleop.points[k]);
				teleopPoints.push(currentMatch.teleop.points[k]);
			}
		}
		console.log("here, teleopPoints(0) = " + teleopPoints[0]);
		logArray(teleopPoints);
		//WHEW! Now that we've finished that, let's make something reasonable out of all these points.
		//I'm thinking a heatmap, and the functions are described below.
		//I've built mapPoints(teamNo,sandstormPoints,teleopPoints), which returns a string containing the div to put on our heatmap
		//NOTE: arrs passed to mapPoints should ONLY contain data points.
		
		let teamHeatMap = mapPoints(currentTeamNo,sandstormPoints,teleopPoints);
		
		$('.container').append(teamHeatMap);
		//For our current team,  we're going to want to build ourselves a heatmap:
		
		
		
		
	}

	function mapPoints(teamNo, sandstormPoints, teleopPoints) {
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
		TOP		[[0,1], 	[1,1]],
				[[3,1],		[5,4]],
		BOTTOM	[[0,2], 	[1,0]]
		
		so lRocket[row][column][0=panel,1=cargo]
		
		*/
		
		//Get our arrays and store them
		logArray(teleopPoints);
		let lRocketSandstorm = buildMapArr(sandstormPoints, "lRocket");
		let rRocketTeleop = buildMapArr(teleopPoints, "rRocket");
		let rRocketSandstorm = buildMapArr(sandstormPoints, "rRocket");
		let lRocketTeleop = buildMapArr(teleopPoints, "lRocket");
		let cargoSandsotrm = buildMapArr(sandstormPoints, "cargo");
		let cargoTeleop = buildMapArr(teleopPoints, "cargo");
		function buildMapArr(points, name) {
				try {
				var newArr;
				if (points.length == 3) {		
					newArr = [
						[[0,0], [0,0]],
						[[0,0], [0,0]],
						[[0,0], [0,0]]
					];
				} else if (points.length == 4) {
					newArr = [
						[[0,0], [0,0]],
						[[0,0], [0,0]],
						[[0,0], [0,0]],
						[[0,0], [0,0]]
					];
				} else {
					console.log("no map");
					return null;
				}
				
				for (let m = 0; m < sandstormPoints.length; m++) {
					if (sandstormPoints[m].vehicle == name ) {
						//this object actually has our col and row already, so we'll use them.
						let row = points[m].row;
						let col = points[m].col;
						let type = points[m].cargo_type;
						cargoSandstorm[row][col][panel] += (type == "panel") ? 1 : 0;
						cargoSandstorm[row][col][cargo] += (type == "cargo") ? 1 : 0;			
					}
				}
				
				return newArr;
				} catch (e) {
					//return "
				}
		}
		/*
		let lRocketSandstorm = buildMapArr(sandstormPoints, "lRocket");
		let rRocketTeleop = buildMapArr(teleopPoints, "rRocket");
		let rRocketSandstorm = buildMapArr(sandstormPoints, "rRocket");
		let lRocketTeleop = buildMapArr(teleopPoints, "lRocket");
		let cargoSandsotrm = buildMapArr(sandstormPoints, "cargo");
		let cargoTeleop = buildMapArr(teleopPoints, "cargo");
		*/
		//Append our new maps
		div += buildSection(lRocketSandstorm, lRocketTeleop, "lRocket");
		div += buildSection(cargoSandstorm, cargoTeleop, "cargo");
		div += buildSection(rRocketSandstorm, rRocketTeleop, "rRocket");
		
		
		//Now lets build the function to append these tables
		function buildSection(sandstorm, teleop, type) {
			var section = "";
			var total;
			if (sandstorm.length == 3 && teleop.length == 3) {
				total = [
					[[0,0], [0,0]],
					[[0,0], [0,0]],
					[[0,0], [0,0]]
				];
			} else if (sandstorm.length == 4 && teleop.length == 4) {
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
			console.log("log:");
			logArray(total);
			//get our max val to determine opacity
			let maxVal = 0;
			for (let i = 0; i < total.length; i++) {
				for (let j = 0; j < total[i].length; j++) {
					for (let k = 0; k < total[i][j].length; k++) {
						maxVal = (total[i][j][k] > maxVal) ? total[i][j][k] : maxVal;
					}
				}
			}			
			
			//Now lets use our total array
			for (let i = 0; i < total[i].length; i++) {
				section += "<tr class=\""+teamNo+"-"+type+"-"+i+"\">";
				for (let j = 0; j < total.length; j++) {
						currentSandstormPoints = total[j][i][0];
						currentTeleopPoints = total[j][i][1];
						section += "<th><div style=\"opacity:"+(+currentSandstormPoints+ +currentTeleopPoints)/maxVal+";\"></div></th>";
						
				}
				section += "</tr>";
			}
			return section;
		}
		//close off the table:
		div += "</div>";
		return div;
	} //mapPoints
	

	
	//lets do debugging
	function logArray(arr) {
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
				console.log("["+arr[v][0][0]+","+arr[v][0][1]+"], ["+arr[v][1][0]+","+arr[v][1][1]+"]],");
			}
			console.log("]");
		} else {
			console.log("noarr");
		}
	}
		

});

});
