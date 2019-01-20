<?php
/*
	What do we need to make this work?
	We'll need to create the ability for the website to cache all responses until the user submits the entire form.
	Hatch Panel/Cargo game
	Team Number (Hashtag should be before input)
	Starting Position:
		Team Side (Red/Blue)
		Position (Perspective from center) Left/Middle/Right
		What level? (1/2)
	What object is the robot holding? (Hatch Panel/Cargo/Neither)
	
	
	Sandstorm phase:
		Do you suspect the team to be using autonomous code or a camera?
		Is the robot moving? (Yes/No)
		(if [yes])	Did the robot cross the line? (Yes/No)
					How many Hatch Panels did the team place on the cargo ship? (Default 0)
					How much Cargo did the team place in the cargo ship? (Default 0)
					How many Hatch Panels did the team place on the rocket? (Default 0)
					How much Cargo did the team place in the cargo ship? (Default 0)
	
	Team Phase:
		How many hatch panels did the team place on the cargo ship and rocket? (Default 0)
		How much cargo did the team place in the cargo ship and rocket? (Default 0)
		Did the robot malfunction for more than fifteen seconds during this match?
		Are there any addition comments you want to make about this robot's performance?
		
	
	
*/

?>
<!DOCTYPE HTML>
<html>
<head>
	<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
	<title>Team 1747's Scouting Form</title>
	<style>
		body {
			font-family: 'Roboto', sans-serif;
		}
		.page-title {
			text-align:center;
			font-size:35px; 
		}
	</style>
</head>
<body>
	<div class="page-title">Scouting Form</div>
	<div class="form-container">
		<form name="dataForm" action="/action.php" method="POST" enctype="multipart/form-data" class="dataForm">
			
		</form>
	</div>
</body>
</html>