const sandstorm = 0;
const teleop = 1;
const panel = 0;
const cargo = 1;
/*
	WELCOME TO TEAM #1747'S SCRIPT (V2)!
	
	If you're new to this file, it'd be best to take a step back and read all this information before gazing into the depths below.
	
	This header is going to be a bit long, and I'm sorry that I'm not using ES6 import statements yet (mainly it's cuz im nervous about importing since I've had such a problem with it already)
	
	This script caters to a specific file (data.js) which holds all our data in a gigantic array. Without proper object structure, this script WILL NOT run correctly.
	
	Our array holds objects that look like this: (just an example):
	
	{
		"initials":
		{
			"team_id":"4795",
			"match_no":"420",
			"pos":["2","0"],
			"gamepiece":"hatch",
			"preloaded":[
				{"cargo_type":"panel","row":"0","col":"0"},
				{"cargo_type":"panel","row":"0","col":"1"},
				{"cargo_type":"panel","row":"1","col":"0"},
				{"cargo_type":"panel","row":"1","col":"1"},
				{"cargo_type":"panel","row":"2","col":"0"},
				{"cargo_type":"panel","row":"2","col":"1"}
			]
		},
		"sandstorm": {
			"autonomous":"false",
			"hit_1747":"false",
			"points":[]
		},
		"teleop":{
				"points":[
				{"cargo_type":"cargo","vehicle":"ship","row":"0","col":"1"},
				{"cargo_type":"cargo","vehicle":"ship","row":"1","col":"1"},
				{"cargo_type":"cargo","vehicle":"ship","row":"2","col":"1"}
				]
		},
		"endgame":{
			"climb_level":"",
			"buddy_climb":["0","false"],
			"win":"true"
		},
		"notes":"lvl 3 climb \t\t74"
	}
	
	Note that obj.sandstorm.points is empty. That means that this team scored 0 points in sandstorm. Any object in that array follows the structures in obj.teleop.points.
	
	You'll notice that some of these attributes named weirdly (like "cargo_type," which should be "point"). This was my own mistake. If I have enough time, I'll go back and rename some of those keys. If it hasn't been done and you wanna do it, please let Daniel know.
	
	
	IF YOU HAVE ANY QUESTIONS ABOUT THIS OBJECT AND WHAT EACH PROPERTY MEANS, PLEASE EMAIL DANIEL G. AT dgallups@purdue.edu.
	If Daniel isn't available, then look for Elan Mizhiritsky, or any programmer.
	
	
	Now we have our setup out of the way, this file works like this:
	1. Receive data from data.js (loaded by script tag in html file), should be stored in an array named `arr`
	2. find the indices in `arr` relevant to our team, and return an array with ONLY those values.
	3. Run through team data, build a new object for easier data distribution (More info above the function name) TODO: give this function a name
	4. Use this new object to build our heatmap, and to supply supplemental information.
	
	These four steps are divided into the following functions, respectively:
	1. No function for this. I'll comment //arr just to pretend like we loaded it inline.
	2. buildTeamObjArr([STRING] teamNo, [OBJ] arr), returns arr of relevant objects pertaining to teamno. 
	3. buildDataObj([OBJ] arr), returns an object which contains useable arrays to map our data.
	4. buildHeatmap([dataOBJ] dataArr), returns HTML string that accurately maps our points.
	
*/

//Now, let's get started
$(document).ready(function() {
	//This'll hold our teams
	let teams = [];
	
	//This is our event listener which triggers our script
	$('.teams').on('input',function() {
		//From a java perspective, this is our "main" function that executes after every input
		
		//Store our teams
		teams = $('.teams').val().split(',');
		
		//reset the container
		$('.container').html("");
		
		//Build data for each team in arr
		for (let i = 0; i < teams.length; i++) {
			let currentTeam = teams[i];
			
			//Per our instructions:
			//arr already exists
			let teamObj = buildTeamObjArr(currentTeam, arr);
			
			let dataObj = buildDataObj(teamObj);
			
			let section = buildHeatMap(dataObj, currentTeam);
			
			$('.container').append(section);
			
		}
		//aaaaand we're done! cake, right?
	});
	
});

/*
	buildTeamArr(teamNo, arr) requires two inputs:
	
		teamNo - a string containing the number of the team we want to analyze (e.g. "1747", "238", "6925")
		
		arr - The array that contains all of our data. Usually the array passed here is located in a different file due to its size.
		
	Returns an array of objects (which has the same structure as our passed array) that matches the teamNo.
*/
function buildTeamObjArr(teamNo, arr) {
	let indices = [];
	
	//Find relevant indices
	for (let i = 0; i < arr.length; i++) {
		if (teamNo == arr[i].initials.team_id) {
			indices.push(i);
		}
	}
	
	//define our new array to return
	let teamArr = [];
	//push all those objects to this teamArr
	for (let i = 0; i < indices.length; i++) {
		teamArr.push(arr[indices[i]]);
	}
	return teamArr;
}

/*
	buildDataObj(arr) requires one input:
		arr - An array that contains objects that match our original structure.
		       
	Returns an OBJECT that's structured like this:
	obj = {
		lRocket: [],
		ship: [],
		rRocket: [],
		startingPos: []
	}
	For more detail, read the first few lines of the function.
	
	To access points, lRocket, ship, and rRocket follow the same rule:
		arr[sandstorm/teleop][row][col][cargo/panel]
		
	(remember, `sandstorm`,`teleop`,`cargo`,`panel` are constants defined at the top of this file).

*/
function buildDataObj(arr) {
	let obj = {
		lRocket: [
			[
				[[0,0],[0,0]],
				[[0,0],[0,0]],
				[[0,0],[0,0]]
			],
			[
				[[0,0],[0,0]],
				[[0,0],[0,0]],
				[[0,0],[0,0]]				
			]
		],
		ship: [
			[
				[[0,0],[0,0]],
				[[0,0],[0,0]],
				[[0,0],[0,0]],
				[[0,0],[0,0]]
			],
			[
				[[0,0],[0,0]],
				[[0,0],[0,0]],
				[[0,0],[0,0]],
				[[0,0],[0,0]]
			]
		],
		rRocket: [
			[
				[[0,0],[0,0]],
				[[0,0],[0,0]],
				[[0,0],[0,0]]
			],
			[
				[[0,0],[0,0]],
				[[0,0],[0,0]],
				[[0,0],[0,0]]				
			]
		],
		startingPos: [
			[0,0,0],
			[0,0,0]
		]
	}
	
	//Now, let's compile this data
	//REMINDER: arr[sandstorm/teleop][row][col][cargo/panel]
	for (let i = 0; i < arr.length; i++) {
		//Sandstorm
		for (let j = 0; j < arr[i].sandstorm.points.length; j++) {
			let row = arr[i].sandstorm.points[j].row;
			let col = arr[i].sandstorm.points[j].col;
			let vehicle = arr[i].sandstorm.points[j].vehicle;
			
			//make this easier for ourselves
			let point = (arr[i].sandstorm.points[j].cargo_type == "panel") ? panel : cargo;
			
			//Eval for object
			if (vehicle == "ship") {
				obj.ship[sandstorm][row][col][point] += 1;
			} else if (vehicle == "rRocket") {
				obj.rRocket[sandstorm][row][col][point] += 1;
			} else if (vehicle == "lRocket") {
				obj.lRocket[sandstorm][row][col][point] += 1;
			}
			
			
		}
		//Teleop
		for (let j = 0; j < arr[i].teleop.points.length; j++) {
			let row = arr[i].teleop.points[j].row;
			let col = arr[i].teleop.points[j].col;
			let vehicle = arr[i].teleop.points[j].vehicle;
			let point = (arr[i].teleop.points[j].cargo_type == "panel") ? panel : cargo;
			
			//Eval for object
			if (vehicle == "ship") {
				obj.ship[teleop][row][col][point] += 1;
			} else if (vehicle == "rRocket") {
				obj.rRocket[teleop][row][col][point] += 1;
			} else if (vehicle == "lRocket") {
				obj.lRocket[teleop][row][col][point] += 1;
			}
		}
		
		//Starting position:
		//Note, earlier records didn't have this information, and therefore those values are "N". To combat this, we'll if statement it
		let sCol = arr[i].initials.pos[0];
		let sRow = arr[i].initials.pos[1];
		
		//If both are numbers
		if (!isNaN(col) && !isNaN(row)) {
			obj.startingPos[sRow][sCol] += 1;
		}
			
	}
	
	return obj;
	
}

/*
	buildHeatMap(obj) requires one input:
		obj - The object returned by buildDataObj(arr). Please don't put anything else in this function.
		
	Returns a string containing html elements that should be appended to a container element.
	
	Specs:
		Combines both sandstorm and teleop points.

*/
function buildHeatMap(obj, teamNo) {
	//before we do anything else, we'll need max values for each section
	//max values are calculated by sum of sandstorm and teleop in a particular section
	let lRocketMaxVal = getMaxVal(obj.lRocket);
	let shipMaxVal = getMaxVal(obj.ship);
	let rRocketMaxVal = getMaxVal(obj.rRocket);
	
	
	
	
	let map = "<div class=\"heatMap\">";
	
	//points-grid is separate from initials-grid, contains our heatmap for points
	map += "<div class=\"points-grid\">";
	
		map += "<table class=\"l-rocket\"><tbody>";
			for (let i = 1; i >= 0; i--) {
				map += "<tr class=\""+teamNo+"-lRocket\">";
					for (let j = 0; j < obj.lRocket[teleop].length; j++) {
						let hatchPanelVal = total[j][i][panel] * 2;
						let cargoVal = total[j][i][cargo] * 3;
						map += "<th type=\"lRocket\" teamNo=\""+teamNo+
						\" row=\""+j+"\" col=\""+i+"\"><div style=\"opacity:"+((+hatchPanelVal + +cargoVal)/lRocketMaxVal)+";\"></div></th>";
					}
				map += "</tr>";
			}
		
		map += "</tbody></table>";
		
		map += "<table class=\"cargo-ship\"><tbody>";
		map += "</tbody></table>";
		
		map += "<table class=\"r-rocket\"><tbody>";
		map += "</tbody></table>";
		
	map += "</div>";
	
	
	//for starting pos
	map += "<div class=\"initials-grid\">";
		map += "<table class=\"starting-pos\"><tbody>";
		map += "</tbody></table>";
	map += "</div>";
	
	
	map += "</div>";
	return map;
}

//specific function, not to be used outside buildHeatMap()
function getMaxVal(arr) {
	//arr[sandstorm/teleop][row][col][cargo/panel]
	let maxVal = 0;
	for (let i = 0; i < arr[teleop].length; i++) {
		for (let j = 0; j < arr[teleop][i].length; j++) {
			let hatchPanelSum = (arr[sandstorm][i][j][panel] + arr[teleop][i][j][panel]) * 2;
			let cargoSum = (arr[sandstorm][i][j][cargo] + arr[teleop][i][j][cargo]) * 3;	
			maxVal = ((cargoSum + hatchPanelSum) > shipMaxVal) ? cargoSum + hatchPanelSum : maxVal;
		}
	}
	return maxVal;
}