<?php
	include('LoginLogic.php');
?>

<html>
<head>
	<title>Login page</title>
	<link rel="stylesheet" href="style.css"/>

<?php
	if ($verhalten == 1) {
?>
		<meta http-equiv="refresh" content="0; URL=secure.php" />
	<?php
	}
	?>
</head>
	<body>
	
		Bitte logge dich ein:</br>
		<div class="container">
		  <div class="login">
			<h1>Anmeldung</h1>
			<form method="POST" action="process.php">
			  <p><input type="text" name="user" id="user" value="" placeholder="Username"></p>
			  <p><input type="password" name="pass" id="pass" value="" placeholder="Password"></p>
			  
				<?php if (isset($errors) and $errors != ""){ echo $errors;}?>  
				
			  <p class="remember_me">
				<label>
				 <label>
				  <input type="checkbox" name="remember_me" id="remember_me">
				  Remember me on this computer
				</label>
				</label>
			  </p>
			  <p class="submit"><input type="submit" name="commit" id="btn"value="Login"></p>
			</form>
		  </div>
		 
		  <div class="login-help">
			<p>passwort vergessen? <a href="#"> Click hier um zur&uumlckzusetzen </a>.</p>
		  </div>
		</div>
		
	</body>
</html>	