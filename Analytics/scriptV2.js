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
		lRocket: [],
		ship: [],
		rRocket: [],
		startingPos: []
	}
	
	
	
}
/*
	buildHeatMap(obj) requires one input:
		obj - The object returned by buildDataObj(arr). Please don't put anything else in this function.
		
	Returns a string containing html elements that should be appended to a container element.
	

*/
function buildHeatMap(obj) {
	let map = "";
	return map;
}