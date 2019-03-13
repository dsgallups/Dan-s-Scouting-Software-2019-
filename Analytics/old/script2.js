$(document).ready(function() {
	//get match that user wants
	$('.match').on('input', function() {
		$('.container').html("");
		var matchNo = $('.match').val();
	
	
		//Find indices in our array that point to our match
		var indices = [];
		
		//loop through
		for (var i = 0; i < arr.length; i++) {
			if (arr[i].initials.match_no == matchNo) {
				indices.push(i);
				//console.log("indice " + i + " pushed");
			}
		}
		
		//console.log("THERE ARE " + indices.length + " INDICES");
		//now that we have indices, lets work our magic
		
		
		var match = [];
		for (var i = 0; i < indices.length; i++) {
			match.push(arr[indices[i]]);
		}
		//console.log(match.length + " objs");
		//first verify client our match number
		$('.container').append("<div class=\"header\">Results for Match #"+matchNo+":</div>");

		for (var i = 0; i < match.length; i++) {
			var currentObj = match[i];
			var totalPoints = 0;
			var sandstormPoints = 0;
			var teleopPoints = 0;
			var sandstormHatches = 0;
			var teleopHatches = 0;
			var sandstormCargo = 0;
			var teleopCargo = 0;
			//console.log("for team" + currentObj.initials.team_id);
			var noSandstormPoints = currentObj.sandstorm.points.length;
			var noTeleopPoints = currentObj.teleop.points.length;
			$('.container').append("<div class=\"team-no\">Team " + currentObj.initials.team_id + " Results--</div>");
			
			
			for (var j = 0; j < noSandstormPoints; j++) {
				if (currentObj.sandstorm.points[j].cargo_type == "hatch") {
					//increase by certain number
					//console.log("hatch sandstorm");
					sandstormPoints += 2;
					totalPoints += 2;
					sandstormHatches++;
				}
				if (currentObj.sandstorm.points[j].cargo_type == "cargo") {
					//increase by certain number
					//console.log("cargo sandstorm");
					sandstormPoints += 3;
					totalPoints += 3;
					sandstormCargo++;
				}
			}
			for (var j = 0; j < noTeleopPoints; j++) {
				console.log("cargo type = " + currentObj.teleop.points.cargo_type);
				if (currentObj.teleop.points[j].cargo_type == "hatch") {
					//increase by certain number
					//console.log("hatch teleop");
					teleopPoints += 2;
					totalPoints += 2;
					teleopHatches++;
				}
				if (currentObj.teleop.points[j].cargo_type == "cargo") {
					//increase by certain number
					//console.log("cargo teleop");
					teleopPoints += 3;
					totalPoints += 3;
					teleopCargo++;
				}
			}
			
			//Now print out total points, sandstorm, and teleop
			$('.container').append("<div class=\"total-points\">Total points scored: " + totalPoints + " ("+ (+sandstormHatches + +teleopHatches) +" Hatch panels, "+ (+sandstormCargo + +teleopCargo)+" Cargo)</div>");
			$('.container').append("<div class=\"sandstorm-points\">Sandstorm points scored: " + sandstormPoints + " ("+ (+sandstormHatches) +" Hatch panels, "+ (+sandstormCargo)+" Cargo)</div>");
			$('.container').append("<div class=\"teleop-points\">Teleop points scored: " + teleopPoints + "  ("+ (+teleopHatches) +" Hatch panels, "+ (+teleopCargo)+" Cargo)</div>");
			$('.container').append("<div class=\"win\">Result of match for team: " + currentObj.endgame.win + "</div>");
			
			
			
		}
	});
});