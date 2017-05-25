	<?php
		session_start();
		$verhalten = 0;
		
		// connect to the server and select database
			/*mysql_connect("localhost", "root", "");
			mysql_select_db("login");*/
			include "./configuration/databaseConnection_configuration.php";
			
		if(!isset($_SESSION["username"]) ) {
			$verhalten = 0;
		}
		
		//if (isset($_GET["page"])&& ($_GET["page"]) == "commit") {	//fragen ab ob in der page get-methode der hinweise log abgespeichert wurde
		if (isset($_POST['commit'])){
			$username = $_POST["user"];
			$password = $_POST["pass"];
			$errors = "";
			//$verhalten =1;
					// to prevent mysql injection
			$username = stripcslashes($username);
			$password = stripcslashes($password);
			/*$username = mysql_real_escape_string($username);
			$password = mysql_real_escape_string($password);*/    
	
			$stmt = $pdo->prepare("SELECT username,password FROM user WHERE user.username = :username AND user.password = :password");

					$stmt->execute(array(':username' => $username, ':password' => $password));

					$row = $stmt->fetch(PDO::FETCH_ASSOC);

					//print_r(json_encode($row));

                    if ($username == "" || $password == "" ){

					    $errors = ' <p class = "error"> Bitte Username und Password eingeben! </p>';

			       }else if($username != $row['username'] or $password != $row['password'] ){

					$errors = '<p class = "error"> Username oder Passwort war falsch! Bitte Username und Password eingeben</p>';

					$verhalten=0;

				  }else if($row['username'] == $username && $row['password'] == $password){

				   $_SESSION["username"] = $username;

				   $verhalten = 1;
										
				} 
			
                     
					$pdo = null;

			//END
							
				 //error_reporting(E_ALL);			 
				
			
					
		}	
		
	