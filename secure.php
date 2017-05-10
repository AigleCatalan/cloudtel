<?php 
	include('secureCheck.php');
?>

<html>
	<head>
		<title>secure Bereich</title>
		<link rel="stylesheet" href="style.css"/>
	</head>
	<body>
		<h1> Willkommen <?php echo $_SESSION["username"]; ?></h1>
		<a href="logout.php">Auslogen</a>
	</body>
</html>
