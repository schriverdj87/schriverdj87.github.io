<!DOCTYPE html>
<html lang="en" class = "logoBKG">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>David Schriver's Portfolio Website</title>
    <link rel="icon" type="image/x-icon" href="mylogo.ico">
	<link rel="stylesheet" href="css/main.css">
</head>
<body >
    <div  class = 'whiteBKG'>&nbsp;</div>
    <h1 id = "Title"></h1>
        <div class = "vkebab" >
      
		{ATAHERE}

        </div>
        
        
    
    <?php include '../components/copyright.php' ?>
	
</body>
<script>
	//https://stackoverflow.com/questions/16611497/how-can-i-get-the-name-of-an-html-page-in-javascript
	document.getElementById("Title").innerHTML = location.href.split("/").pop().replace(".php","").replace("csharp","C#").replace(".html","");
</script>
</html>