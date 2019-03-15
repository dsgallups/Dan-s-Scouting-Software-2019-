"use strict";
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
	//This'll hold data for later (heatmap details)
	let allTeamsData = [];
	
	//This is our event listener which triggers our script
	$('.teams').on('input',function() {
		//From a java perspective, this is our "main" function that executes after every input
		//Store our teams
		teams = $('.teams').val().split(',');
		
		//reset the container
		$('.container').html("");
		
		//reset our allTeamsDataObj
		allTeamsData = [];
		
		//Build data for each team in arr
		for (let i = 0; i < teams.length; i++) {
			let currentTeam = teams[i];
			let teamObjArr = buildTeamObjArr(currentTeam, arr);
			
			let section = "<div class=\"team-info\">";
			
				//TODO: see about removing commented out code below
				//section += "<div class=\"overview\">";
					//Builds our "overview" div element
					section += buildOverview(currentTeam);
				//section += "</div>";
				//Per our instructions:
				//arr already exists
				
				//buildInfo() builds our "basic-info" div
				
				section += "<div class=\"UI\">";
					section += buildInfo(teamObjArr)
				
					//<div class="heatMap">
					let dataObj = buildDataObj(teamObjArr);
					allTeamsData.push(dataObj);
					section += buildHeatMap(dataObj, currentTeam);
					//buildHeatMap(buildDataObj(buildTeamObjArr(currentTeam, arr)), currentTeam)
					//</div>
				section += "</div>";
			section += "</div>";
			
			$('.container').append(section);
			
		}
	});
	
	
	//When changing our overview parameters:
	$(document).on('change','.display',function() {
		//for testing purposes
		//console.log("changing " + $(this).attr("name") + "'s value to " + $(this).val());
		
		//fetches the teamNo so we can edit the div
		let teamNo = $(this).attr("name").split('-')[0];
		console.log(teamNo);
		
	});
	
	
	//Details to heat map
	$(document).on('mouseenter','th',function() {
		//logic to append our div
		let width = 180;
		let height = 100;
		let type = $(this).attr("type");
		let row = $(this).attr("row");
		let col = $(this).attr("col");
		let teamNo = $(this).attr("teamno");
		let spacer = 10;
		let divX = $(this).width()/2;
		let divY = 0;
		let blockY = (divY - (spacer+height));
		let blockX = (divX - (width/2));
		
		//Build our div
		let div = "<div class=\"information\" style=\"top:"+blockY+"px;left:"+blockX+"px;\">";
		
		//use our allTeamsData variable here:
		for (let i = 0; i < allTeamsData.length; i++) {
			if (teamNo == allTeamsData[i].teamNo) {
				//console.log("sandstorm: " + allTeamsData[i][type][sandstorm][row][col]);
				//console.log("teleop: " + allTeamsData[i][type][teleop][row][col]);
				if (type == "startingPos") {
					div += "<span>times started here: " + allTeamsData[i][type][row][col] + "</span><br>";
				} else {
					div += "<span>Sandstorm hatch panels: " + allTeamsData[i][type][sandstorm][row][col][panel] + "</span><br>";
					div += "<span>Teleop hatch panels: " + allTeamsData[i][type][teleop][row][col][panel] + "</span><br>";
					div += "<span>Sandstorm cargo: " + allTeamsData[i][type][sandstorm][row][col][cargo] + "</span><br>";
					div += "<span>Teleop cargo: " + allTeamsData[i][type][teleop][row][col][cargo] + "</span><br>";
				}
			}
		}
		div += "</div>";
		$(this).append(div);
	});
	//delete all elements with the tag .information
	$(document).on('mouseleave','th',function() {
		$('.information').remove();
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
	buildOverview(teamNo) requires one input:
		teamNo - a string containing the number of the team we want to analyze (e.g. "1747", "238", "6925")
	
	Returns a string containing a div with the class "overview"
	
*/
function buildOverview(teamNo) {
	let section = "<div class=\"overview\">";
	
		section += "<div class=\"overview-header\">Show Data For:</div>";
		section += "<div class=\"overview-options\">";
		
		//Our options for display. first indice is name, second indice is value.
		let types = [
			["All Matches", "all"],
			["Past Three Matches", "past-three"],
			["Gainesville", "gainesville"],
			["Tippecanoe", "tippecanoe"]
		]
		
		for (let i = 0; i < types.length; i++) {
			section += "<div class=\"display-option\">";
				section += "<div class=\"display-header\">"+types[i][0]+"</div>";
				section += "<input type=\"radio\" class=\"display\" name=\""+teamNo+"-display\" value=\""+types[i][1]+"\"";
				//first element always checked
				section += (i == 0) ? " checked>" : ">";
			section += "</div>";
		}
		section += "</div>";
	section += "</div>";
	return section;
}

function buildInfo(arr) {
	//passed array follows object structure
	
	/*
		Example of what this should return: 
		<div class="basic-info">
			<div>Team #0000 - </div><br>
			<div><span>Wins/Loses/Ties:</span> 0:0:0</div>
			<div><span>Highest climb level:</span> 0</div>
			<div><span>Is this team likely to use autonomous?</span> No (0:0)</div>
			<div><span>Most points scored in teleop:</span> 0</div>
			<div><span>Notes:</span> </div>
			<ul>
				<li>Note #1</li>
				<li>Note #2</li>
			</ul>
			
			buildHeatMap(buildDataObj(buildTeamObjArr(currentTeam, arr)), currentTeam)
		</div>
	*/
	let matchResults = getMatchResults(arr);
	let hasAuto = (usingAutonomous) ? "Yes" : "No";
	let pieces = getPreloadedGamePieces(arr);
	
	let section = "<div class=\"basic-info\">";
		section += "<div>Team #" + arr[0].initials.team_id + " - </div><br>";
		section += "<div><span>Wins/Losses/Ties:</span> "+matchResults["wins"]+":"+matchResults["losses"]+":"+matchResults["ties"]+"</div>";
		section += "<div><span>Highest climb level:</span> " + getHighestClimbLevel(arr) + "</div>";
		section += "<div><span>Is this team likely to use autonomous?</span> " + hasAuto + "</div>";
		section += "<div><span>Most common preloaded gamepiece:</span> " + getMostCommonPreloadedGamePiece(pieces) + ", C/P/N - " + pieces.cargo + ":" + pieces.panels + ":" + pieces.neither + "</div>";
		section += "<div><span>Most points scored in teleop: </span> " + getTeleopHighscore(arr) + "</div>";
		section += "<div><span>Notes:</span></div>";
		section += getNotes(arr);
	section += "</div>";
	return section;
}

function getMatchResults(arr) {
	//passed array follows object structure
	let obj = {
		wins: 0,
		losses: 0,
		ties: 0
	}
	for (let i = 0; i < arr.length; i++) {
		if (arr[i].endgame.win == "true") {
			obj.wins += 1;
		} else if (arr[i].endgame.win == "false") {
			obj.losses += 1;
		} else {
			console.log("match no = " + arr[i].initials.match_no);
			obj.ties += 1;
		}
	}
	return obj;
}

function getPreloadedGamePieces(arr) {
	let pieces = {
		panels: 0,
		cargo: 0,
		neither: 0
	}
	for (let i = 0; i < arr.length; i++) {
		//sorry for the inconsistency in naming things
		if (arr[i].initials.gamepiece == "hatch") {
			pieces.panels += 1;
		} else if (arr[i].initials.gamepiece == "cargo") {
			pieces.cargo += 1;
		} else {
			pieces.neither += 1;
		}
	}
	return pieces;
}

function getMostCommonPreloadedGamePiece(pieces) {
	return (pieces.panels > pieces.cargo) ? "Hatch Panel" : (pieces.cargo > pieces.neither) ? "Cargo" : "None";		
}

function getHighestClimbLevel(arr) {
	let climbLevel = 0;
	for (let i = 0; i < arr.length; i++) {
		try {
			climbLevel = (arr[i].endgame.climb_level > climbLevel) ? arr[i].endgame.climb_level : climbLevel;
		} catch (e) {
		}
	}
	return climbLevel;
}

function usingAutonomous(arr) {
	let posAutoCount = 0;
	for (let i = 0; i < arr.length; i++ ) {
		posAutoCount += (arr[i].sandstorm.autonomous == "true") ? 1 : -1;
	}
	return posAutoCount > 0;
}

function getTeleopHighscore(arr) {
	let score = 0;
	for (let i = 0; i < arr.length; i++) {
		let runningScore = 0;
		for (let j = 0; j < arr[i].teleop.points.length; j++) {
			if (arr[i].teleop.points[j].cargo_type == "cargo") {
				runningScore += 2;
			} else if (arr[i].teleop.points[j].cargo_type == "panel") {
				runningScore += 3;
			}
		}
		score = (runningScore > score) ? runningScore : score;
	}
	return score;
}

function getNotes(arr) {
	let section = "<ul>";
	for (let i = 0; i < arr.length; i++) {
		if (arr[i].notes) {
			section += "<li>"+arr[i].notes+"</li>";
		}
	}
	section += "</ul>";
	return section;
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
		teamNo: arr[0].initials.team_id || 0,
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
			let point = arr[i].sandstorm.points[j].cargo_type;
			
			//Eval for object
			if (point == "both") {
				//console.log("BOTH POINTS");
				obj[vehicle][sandstorm][row][col][panel] += 1;
				obj[vehicle][sandstorm][row][col][cargo] += 1;
			} else if (point == "cargo") {
				obj[vehicle][sandstorm][row][col][cargo] += 1;
			} else if (point == "panel") {
				obj[vehicle][sandstorm][row][col][panel] += 1;
			}
			//obj[vehicle][sandstorm][row][col][point] += 1;
			
			
		}
		//Teleop
		for (let j = 0; j < arr[i].teleop.points.length; j++) {
			let row = arr[i].teleop.points[j].row;
			let col = arr[i].teleop.points[j].col;
			let vehicle = arr[i].teleop.points[j].vehicle;
			let point = arr[i].teleop.points[j].cargo_type;
			
			//Eval for object
			if (point == "both") {
				//console.log("BOTH POINTS");
				obj[vehicle][teleop][row][col][panel] += 1;
				obj[vehicle][teleop][row][col][cargo] += 1;
			} else if (point == "cargo") {
				obj[vehicle][teleop][row][col][cargo] += 1;
			} else if (point == "panel") {
				obj[vehicle][teleop][row][col][panel] += 1;
			}
		}
		
		//Starting position:
		//Note, earlier records didn't have this information, and therefore those values are "N". To combat this, we'll if statement it
		let sCol = arr[i].initials.pos[0];
		let sRow = arr[i].initials.pos[1];
		
		//If both are numbers
		if (!isNaN(sCol) && !isNaN(sRow)) {
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
	//console.log("lRocketMaxVal = " + lRocketMaxVal);
	let shipMaxVal = getMaxVal(obj.ship);
	//console.log("shipMaxVal = " + shipMaxVal);
	let rRocketMaxVal = getMaxVal(obj.rRocket);
	//console.log("rRocketMaxVal = " + rRocketMaxVal);
	
	//since startingPos is unique, we'll write our logic here
	let startingPosMaxVal = 0;
	for (let i = 0; i < obj.startingPos.length; i++) {
		for (let j = 0; j < obj.startingPos[i].length; j++) {
			startingPosMaxVal = (obj.startingPos[i][j] > startingPosMaxVal) ? obj.startingPos[i][j] : startingPosMaxVal;
		}
	}
	
	
	let map = "<div class=\"heatMap\">";
	
	//points-grid is separate from initials-grid, contains our heatmap for points
	map += "<div class=\"points-grid\">";
	
		map += "<table class=\"l-rocket\"><tbody>";
			//I know this value is hardcoded. It's a canary.
			for (let i = 1; i >= 0; i--) {
				map += "<tr class=\""+teamNo+"-lRocket\">";
					for (let j = 0; j < obj.lRocket[teleop].length; j++) {
						let hatchPanelVal = (obj.lRocket[sandstorm][j][i][panel] + obj.lRocket[teleop][j][i][panel]) * 2;
						let cargoVal = (obj.lRocket[sandstorm][j][i][cargo] + obj.lRocket[teleop][j][i][cargo]) * 3;
						let opacity = (+hatchPanelVal + +cargoVal)/lRocketMaxVal || 0;
						map += "<th type=\"lRocket\" teamNo=\""+teamNo+
						"\" row=\""+j+"\" col=\""+i+"\"><div style=\"opacity:"+opacity+";\"></div></th>";
					}
				map += "</tr>";
			}
		map += "</tbody></table>";
		
		map += "<table class=\"cargo-ship\"><tbody>";
			for (let i = 0; i < obj.ship[teleop].length; i++) {
				map += "<tr class=\""+teamNo+"-ship\">";
				for (let j = 0; j < obj.ship[teleop][i].length; j++) {
					let hatchPanelVal = (obj.ship[sandstorm][i][j][panel] + obj.ship[teleop][i][j][panel]) * 2;
					let cargoVal = (obj.ship[sandstorm][i][j][cargo] + obj.ship[teleop][i][j][cargo]) * 3;
					let opacity = (+hatchPanelVal + +cargoVal)/shipMaxVal || 0;
					map += "<th type=\"ship\" teamNo=\""+teamNo+"\" row=\""+i+"\" col=\""+j+"\"><div style=\"opacity:"+opacity+";\"></div></th>";
				}
				map += "</tr>";
			}
		map += "</tbody></table>";
		
		map += "<table class=\"r-rocket\"><tbody>";
			for (let i = 0; i < obj.rRocket[teleop][0].length; i++) {
				map += "<tr class=\""+teamNo+"-rRocket\">";
				for (let j = obj.rRocket[teleop].length - 1; j >= 0; j--) {
					let hatchPanelVal = (obj.rRocket[sandstorm][j][i][panel] + obj.rRocket[teleop][j][i][panel]) * 2;
					let cargoVal = (obj.rRocket[sandstorm][j][i][cargo] + obj.rRocket[teleop][j][i][cargo]) * 3;
					let opacity = (+hatchPanelVal + +cargoVal)/rRocketMaxVal || 0;
					map += "<th type=\"rRocket\" teamNo=\""+teamNo+"\" row=\""+j+"\" col=\""+i+"\"><div style=\"opacity:"+opacity+";\"></div></th>";
				}
				map += "</tr>";
			}
		map += "</tbody></table>";
		
	map += "</div>";
	
	
	//for starting pos
	map += "<div class=\"initials-grid\">";
		map += "<table class=\"starting-pos\"><tbody>";
			for (let i = 0; i < obj.startingPos.length; i++) {
				map += "<tr class=\""+teamNo+"-startingPos\">";
					for (let j = 0; j < obj.startingPos[i].length; j++) {
						map += "<th type=\"startingPos\" teamNo=\""+teamNo+"\" row=\""+i+"\" col=\""+j+"\"><div style=\"opacity:"+obj.startingPos[i][j]/startingPosMaxVal+";\"></div></th>";
					}
				map += "</tr>";
			}
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
			maxVal = ((cargoSum + hatchPanelSum) > maxVal) ? cargoSum + hatchPanelSum : maxVal;
		}
	}
	return maxVal;
}

//For testing
function logObj(dataObj) {
	//arr[sandstorm/teleop][row][col][cargo/panel]
	console.log("Team #" + dataObj.teamNo);
	console.log("lRocket: [");
	for (let i = 0; i < dataObj.lRocket.length; i++) {
		console.log("[");
		for (let j = 0; j < dataObj.lRocket[i].length; j++) {
			let statement = "[["+dataObj.lRocket[i][j][0][0]+","+dataObj.lRocket[i][j][0][1]+"],["+dataObj.lRocket[i][j][1][0]+","+dataObj.lRocket[i][j][1][1]+"]],";
			console.log(statement);
		}
		console.log("]");
	}
	console.log("]");
	console.log("ship: ["); 
	for (let i = 0; i < dataObj.ship.length; i++) {
		console.log("[");
		for (let j = 0; j < dataObj.ship[i].length; j++) {
			let statement = "[["+dataObj.ship[i][j][0][0]+","+dataObj.ship[i][j][0][1]+"],["+dataObj.ship[i][j][1][0]+","+dataObj.ship[i][j][1][1]+"]],";
			console.log(statement);
		}
		console.log("]");
	}
	console.log("]");
	console.log("rRocket: ["); 
	for (let i = 0; i < dataObj.rRocket.length; i++) {
		console.log("[");
		for (let j = 0; j < dataObj.rRocket[i].length; j++) {
			let statement = "[["+dataObj.rRocket[i][j][0][0]+","+dataObj.rRocket[i][j][0][1]+"],["+dataObj.rRocket[i][j][1][0]+","+dataObj.rRocket[i][j][1][1]+"]],";
			console.log(statement);
		}
		console.log("]");
	}
}