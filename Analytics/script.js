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
	
var teams = [];

$('.teams').on('input', function() {
	console.log("input change");
	teams = $('.teams').val().split(',');
	for (var i = 0; i < teams.length; i++) {
		console.log("teams["+i+"] = " + teams[i]);
	};
	
	
});
function runVals() {
	$('.container').html("");
	$('.container').append("<div class=\"section-body\">");
	for (var i = 0; i < teams.length; i++) {
		
		//build our page
		var teamID = teams[i];
		
		$('.container').append("<div class=\"team-header\">Team #"+teamID+":</div>");
		//$('.container').append("<div class=\"team-header\">Team #"+
		//find the index in our array
		var indices = [];
		for (var j = 0; j < arr.length; j++) {
			if (arr[j].initials.team_id == teamID) {
				//console.log("team = " + arr[j].initials.team_id + ", j = " + j);
				indices.push(j);
			}
		}
		//Sort our indices from most recent to least recent
		indices.sort((a, b) => b - a);
		
		
		//now we have indices, lets pull data
		var runningTotalCargo = 0;
		var runningTotalHatch = 0;
		var runningTotalSandstorm = 0;
		var runningTotalTeleop = 0;
		
		var runningTotalCargo3 = 0;
		var runningTotalHatch3 = 0;
		var runningTotalSandstorm3 = 0;
		var runningTotalTeleop3 = 0;
		
		var noOfMatches = indices.length;
		var noOfMatches3 = (noOfMatches < 3) ? noOfMatches : 3;	//the var to use when running avgs for last three matches
		
		
		for (var k = 0; k < noOfMatches; k++) {
			//console.log("indice for team 832 " + indices[k]);
			//get avg points
			
			//sandstorm
			//console.log("arr[indices[k]].sandstorm.points.length = " + arr[indices[k]].sandstorm.points.length);
			for (var p = 0; p < arr[indices[k]].sandstorm.points.length; p++) {
				//console.log("in loop");
				runningTotalSandstorm++;
				runningTotalCargo += (arr[indices[k]].sandstorm.points[p].cargo_type == "cargo") ? 1 : 0;
			}
			
			//teleop
			for (var p = 0; p < arr[indices[k]].teleop.points.length; p++) {
				//console.log("in other loop");
				runningTotalTeleop++;
				runningTotalCargo += (arr[indices[k]].teleop.points[p].cargo_type == "cargo") ? 1 : 0;
			}
		}	
		
		//for last three matches
		for (var k = 0; k < noOfMatches3; k++) {
			for (var p = 0; p < arr[indices[k]].sandstorm.points.length; p++) {
				//console.log("in loop");
				runningTotalSandstorm3++;
				runningTotalCargo3 += (arr[indices[k]].sandstorm.points[p].cargo_type == "cargo") ? 1 : 0;
			}
			
			//teleop
			for (var p = 0; p < arr[indices[k]].teleop.points.length; p++) {
				//console.log("in other loop");
				runningTotalTeleop3++;
				runningTotalCargo3 += (arr[indices[k]].teleop.points[p].cargo_type == "cargo") ? 1 : 0;
			}
		}
			
			
		
		
		$('.container').append("<div class=\"matches\">Matches recorded:" + noOfMatches +"</div>");
	
		$('.container').append("<div class=\"match-list\">In matches:");
		for (var l = 0; l < indices.length; l++) {
			$('.container').append(" <span>M=" + indices[l] + ";I="+l+"</span> ");
		}
		$('.container').append('</div>');
		$('.container').append("<div class=\"running-total\">Running total (all points): " + (+runningTotalCargo + +runningTotalTeleop) + "</div>");
		$('.container').append("<div class=\"subheader\">The following values are CUMULATIVE:</div>");
		$('.container').append("<div class=\"avg-points\">avg points per match:" + Math.floor(((runningTotalCargo + runningTotalTeleop)/noOfMatches)*100)/100+"</div>");
		$('.container').append("<div class=\"avg-cargo\">Cargo per match = " + Math.floor((runningTotalCargo/noOfMatches)*100)/100+"</div>");
		$('.container').append("<div class=\"avg-hatch\">Hatch Panels per match: " + Math.floor((runningTotalHatch/noOfMatches)*100)/100 + "</div>");
		$('.container').append("<div class=\"avg-sandstorm\">Average sandstorm period points: " + Math.floor((runningTotalCargo/noOfMatches)*100)/100+"</div>");
		$('.container').append("<div class=\"avg-teleop\">avg teleop period points: " + Math.floor((runningTotalTeleop/noOfMatches)*100)/100+"</div>");
		
		$('.container').append("<div class=\"subheader\">The following values are per the last three matches:</div>");
		$('.container').append("<div class=\"avg-points-3\">avg points per match: " + Math.floor(((runningTotalCargo3 + runningTotalCargo3)/noOfMatches3)*100)/100+ "</div>");
		$('.container').append("<div class=\"avg-cargo-3\">avg cargo per match = " + Math.floor((runningTotalCargo3/noOfMatches3)*100)/100 + "</div>");
		$('.container').append("<div class=\"avg-hatch-3\">avg hatch panels per match = " + Math.floor((runningTotalHatch3/noOfMatches3)*100)/100 + "</div>");
		$('.container').append("<div class=\"avg-sandstorm-3\">avg sandstorm period points = "+ Math.floor((runningTotalCargo3/noOfMatches3)*100)/100 + "</div>");
		$('.container').append("<div class=\"avg-teleop-3\">avg teleop period points = "+ Math.floor((runningTotalTeleop3/noOfMatches3)*100)/100 + "</div>");
		
		//finally, list notes:
		$('.container').append("<div class=\"notes\">");
		$('.container').append("<ul>");
		for (var l = 0; l < noOfMatches; l++) {
			$('.container').append("<li>"+arr[indices[l]].notes+"</li>");
		}
		$('.container').append("</ul>");
		$('.container').append("<div class=\"line\"></div>");
		
		
		
	}
	$('.container').append("</div>");
}
});