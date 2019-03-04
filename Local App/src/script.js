$(document).ready(() => {
	
	//console.log(obj[30].initials.team_id);
	//starting pos
	$('.starting-pos').html(buildTable("Team Starting Position (CHECK MAP IMAGE) —","starting-pos",["Left","Middle","Right"],["Far","Close"],"position", true));
	
	//preloaded pieces in cargo ship
	$('.preloaded').html(buildTable("Ship's preloaded pieces —", "preloaded", ["Left","Right"],["Farthest","","Closest"],"preload", true));
	
	//points for sandstorm
	$('.sandstorm-points').html(buildTable("Left Rocket —", "sandstorm-lRocket",["Close","Far"],["Top","Middle","Bottom"], "points", false) + buildTable("Cargo Ship —", "sandstorm-ship", ["Left","Right"],["Top", "", "", "Bottom"], "points", false) + buildTable("Right Rocket —", "sandstorm-rRocket", ["Far","Close"],["Top","Middle","Bottom"],"points", false));
	
	
	//points for teleop
	$('.teleop-points').html(buildTable("Left Rocket —", "teleop-lRocket",["Close","Far"],["Top","Middle","Bottom"], "points", true) + buildTable("Cargo Ship —", "teleop-ship", ["Left","Right"],["Top", "", "", "Bottom"], "points", true) + buildTable("Right Rocket —", "teleop-rRocket", ["Far","Close"],["Top","Middle","Bottom"],"points", true));
	
	
	//On form submit
	$('#data-form').submit(e => {
		e.preventDefault();
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
		
		var f = $("#data-form").serializeArray();
		console.log(f);
		//set variables
		for (var i = 0; i < f.length; i++) {
			
			
			
			//Initials
			if (f[i].name == "team-id") {
				obj.initials.team_id = f[i].value;
			} else if (f[i].name == "match-no") {
				obj.initials.match_no = f[i].value;
			} else if (f[i].name == "starting-pos-radio") {
				obj.initials.pos[0] = f[i].value.substring(0,1);
				obj.initials.pos[1] = f[i].value.substring(1,2);
			} else if (f[i].name == "pre-piece") {
				obj.initials.gamepiece = f[i].value;
			} else if (f[i].name.indexOf("preloaded") !== -1) {
				//console.log("length = " + f[i].length);
				//console.log("name = " + f[i].name.substring(0,1));
				//console.log("sub = " + f[i].name.substring(f[i].name.length-2,f[i].name.length-1));
				var preLoad = {
						cargo_type: f[i].value,
						row: f[i].name.substring(f[i].name.length-2,f[i].name.length-1),
						col: f[i].name.substring(f[i].name.length-1,f[i].name.length)
				}
				obj.initials.preloaded.push(preLoad);
			
			//Sandstorm
			} else if (f[i].name == "autonomous") {
				obj.sandstorm.autonomous = f[i].value;
			} else if (f[i].name == "hit-1747") {
				obj.sandstorm.hit_1747 = f[i].value;
			} else if (f[i].name.indexOf("sandstorm-lRocket") !== -1) {
				//left rocket
				var point = {
						cargo_type: f[i].value,
						//TODO
						vehicle: "lRocket",
						row: f[i].name.substring(f[i].name.length-2,f[i].name.length-1),
						col: f[i].name.substring(f[i].name.length-1,f[i].name.length)
				}
				obj.sandstorm.points.push(point);
			} else if (f[i].name.indexOf("sandstorm-rRocket") !== -1) {
				var point = {
						cargo_type: f[i].value,
						vehicle: "rRocket",
						row: f[i].name.substring(f[i].name.length-2,f[i].name.length-1),
						col: f[i].name.substring(f[i].name.length-1,f[i].name.length)
				}
				obj.sandstorm.points.push(point);
			} else if (f[i].name.indexOf("sandstorm-ship") !== -1) {
				var point = {
						cargo_type: f[i].value,
						vehicle: "ship",
						row: f[i].name.substring(f[i].name.length-2,f[i].name.length-1),
						col: f[i].name.substring(f[i].name.length-1,f[i].name.length)
				}
				obj.sandstorm.points.push(point);
			
			//Teleop
			} else if (f[i].name.indexOf("teleop-lRocket") !== -1) {
				//left rocket
				var point = {
						cargo_type: f[i].value,
						//TODO
						vehicle: "lRocket",
						row: f[i].name.substring(f[i].name.length-2,f[i].name.length-1),
						col: f[i].name.substring(f[i].name.length-1,f[i].name.length)
				}
				obj.teleop.points.push(point);
			} else if (f[i].name.indexOf("teleop-rRocket") !== -1) {
				var point = {
						cargo_type: f[i].value,
						vehicle: "rRocket",
						row: f[i].name.substring(f[i].name.length-2,f[i].name.length-1),
						col: f[i].name.substring(f[i].name.length-1,f[i].name.length)
				}
				obj.teleop.points.push(point);
			} else if (f[i].name.indexOf("teleop-ship") !== -1) {
				var point = {
						cargo_type: f[i].value,
						vehicle: "ship",
						row: f[i].name.substring(f[i].name.length-2,f[i].name.length-1),
						col: f[i].name.substring(f[i].name.length-1,f[i].name.length)
				}
				obj.teleop.points.push(point);
				
			//Endgame
			} else if (f[i].name == "robot-climb") {
				obj.endgame.climb_level = f[i].value;
			} else if (f[i].name == "climb-assists") {
				obj.endgame.buddy_climb[0] = f[i].value;
			} else if (f[i].name == "self-lift") {
				obj.endgame.buddy_climb[1] = f[i].value;
			} else if (f[i].name == "win") {
				obj.endgame.win = f[i].value;
				
			//Notes
			} else if (f[i].name == "notes-area") {
				obj.notes = f[i].value;
			}
			
			
		}
			
		
		
		//Now we should have our stuff in order
		console.log(obj);
		
		localStorage.setItem("data", (localStorage.getItem("data")) ? localStorage.getItem("data") + "," + JSON.stringify(obj) : JSON.stringify(obj));
		
		
		$('.notes').after("<span style=\"color:green\";>Form submitted! Reloading in two seconds...</span><br>");
		
		setTimeout(() => location.reload(), 2000);
		//localStorage.setItem("data", (localStorage.getItem("data")) ? localStorage.getItem("data") + "," + f : f);
		/* for a later time...
		$.ajax({
		  type: "POST",
		  url: "128.211.235.107:3000/",
		  data: formData,
		  success: function(){},
		  dataType: "json",
		  contentType : "application/json"
		});		
		*/
	});
	
	
	
	
	
	//on button click
	/*
	$('.button').on('click',() => {
		
		if (typeof(Storage) !== "undefined") {
		  // Code for localStorage
		  localStorage.setItem("val", (localStorage.getItem("val") ? localStorage.getItem("val") : "") + "doot");
		  console.log("local storage = " + localStorage.getItem("val"));
		  $('#test-div').html("test val = " + localStorage.getItem("val"));
		} else {
		  // Sorry! No Web Storage support..
		  console.log("dang. no web storage available.");
		}
	});
	*/
	$('.reset').on('click',() => {
		localStorage.setItem("val","");
		$('#test-div').html("test val = " + localStorage.getItem("val"));
	});
	
	
	//TODO: there should be no reason why this doesn't work.
	$(document).on('click','.hide-table', function() {
		console.log("hide table clicked" + $(this).next().removeClass("show").addClass("hide"));
		//$(this).next().addClass("hide");
		$(this).next().css("display","hide");
		$(this).addClass("show-table");
		$(this).html("Show");
		$(this).removeClass("hide-table");
	});
	$(document).on('click','.show-table', function() {
		console.log("show table clicked" + $(this).next().removeClass("hide").addClass("show"));
		//$(this).next().addClass("show");
		//$(this).next().css("display","");
		$(this).addClass("hide-table");
		$(this).html("Hide");
		$(this).removeClass("show-table");
	});
	
	$('.raw-data').html(localStorage.getItem("data"));
	
	
	
	function buildTable(header, name, cols, rows, type, show) {
		//name is the name of our table
		//rows should be an array to describe the table rows
		//cols should be an array to describe the columns
		var table = "";
		table += "<div class=\""+name+" table-div\">";
		//build the table element
		table += "<span class=\"table-header\">"+header+"</span>";
		
		table += (show) ? "<div class=\"hide-table button\" t=\"t-"+name+"\">Hide</div>" : "<div class=\"show-table button\" t=\"t-"+name+"\">Show</div>";
		
		table += (show) ? "<table class=\"show t-"+name+"\">" : "<table class=\"hide t-"+name+"\">";
		
		
		for (var i = -1; i < rows.length; i++) {
			
			table += "<tr>";
			
			for (var j = -1; j < cols.length; j++) {
				if (i == -1) {
					if (j == -1) {
						table += "<th class=\"row-header\"></th>";
					} else {
						table += "<th>"+cols[j]+"</th>";
					}
				} else {
					if (j == -1) {
						table += "<th class=\"row-header\">"+rows[i]+"</th>";
					} else {
						if (type == "points") {
							table += "<th class=\"options\"><div class=\"selection\"><span>Cargo</span><input type=\"radio\" class=\"form-radio\" name=\""+name+"-"+i+""+j+"\" column=\""+j+"\" row=\""+i+"\" value=\"cargo\"></div>"+
							"<div class=\"selection\"><span>Both</span><input type=\"radio\" class=\"form-radio\" name=\""+name+"-"+i+""+j+"\" column=\""+j+"\" row=\""+i+"\" value=\"both\"></div>"+
							"<div class=\"selection\"><span>Panel</span><input type=\"radio\" class=\"form-radio\" name=\""+name+"-"+i+""+j+"\" column=\""+j+"\" row=\""+i+"\" value=\"panel\"></div></th>";
						} else if (type == "position") {
							table += "<th><input type=\"radio\" class=\"form-radio\" name=\""+name+"-radio\" value=\""+j + i+"\" column=\""+j+"\" row=\""+i+"\"></th>";
						} else if (type == "preload") {
							table += "<th class=\"options\"><div class=\"selection\"><span>Cargo</span><input type=\"radio\" class=\"form-radio\" name=\""+name+"-"+i+""+j+"\" column=\""+j+"\" row=\""+i+"\" value=\"cargo\"></div>"+
							"<div class=\"selection\"><span>Panel</span><input type=\"radio\" class=\"form-radio\" name=\""+name+"-"+i+""+j+"\" column=\""+j+"\" row=\""+i+"\" value=\"panel\"></div></th>";
						}							
					}
				}
			}
			
			table += "</tr>";
		}
		
		table += "</table>";
		//table += "<div parent=\""+name+"\" class=\"reset\" style=\"border:1px solid black;\">Reset</div>";
		table += "</div>";
		return table;
	}
	
	$(document).on('click','.reset',function() {
		var par = $(this).attr("parent");
		console.log(par);
		var prev = $("."+par).prev();
		
		console.log($("."+par).prev());
		var innerElements = $("."+par).html();
		console.log("innerEl = " + innerElements);
		$("."+par).remove();
		prev.after("<div class=\""+par+" table-div\"></div>");
		$("."+par).html(innerElements);
	});
});