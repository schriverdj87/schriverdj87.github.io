<!DOCTYPE html>
<html lang="en" class = "logoBKG">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>dave9002.com</title>
    <link rel="icon" type="image/x-icon" href="mylogo.ico">
	<link rel="stylesheet" href="css/main.css">
</head>
<body >
    <div  class = 'whiteBKG'>&nbsp;</div>
    <h1 id = "Title"></h1>
        <div class = "vkebab" >
      
		<div class = 'toolitem fullishwidth'>  <h2>JSONGrind.html</h2> <a href = 'img/JSONGrind.png' target = '_blank'><div class = 'portfolioImageDiv'><img src = 'img/JSONGrind.png'></div></a> <h3>Spring or Summer 2019</h3> <p>This became an essential tool for my team. JSONGrind.html converts JSON data stored in the database (without newlines) into readable tables when it is pasted into the "Paste JSON here" text field and the "Do It" button is clicked. Addionally, it will recognize documents such as invoices and orders in JSON format and render them appropriately complete with signaures. With the "TQF" button and text fields next to it, JSONGrind.html makes SQL queries with the JSON data useful for tracking down data in the database.</p><p><ul></ul></p><p></p></div><div class = 'toolitem fullishwidth'>  <h2>UOM Application</h2> <a href = 'img/UOMApp.png' target = '_blank'><div class = 'portfolioImageDiv'><img src = 'img/UOMApp.png'></div></a> <h3>Spring 2019</h3> <p>This application allows you to switch between and compare units of measurement. It includes a multiplying calculator and dynamic comparison grid. It currently uses a JavaScript library but can be tweaked to work with an API. I made this during my on the job training and have posted this with permission. </p><p><ul></ul></p><p></p><h5><a href = 'uomPOC/index.html' target = '_blank'>Try it Out!</a></h5></div><div class = 'toolitem fullishwidth'>  <h2>Template Sandwich</h2> <a href = 'img/templatesandwich.png' target = '_blank'><div class = 'portfolioImageDiv'><img src = 'img/templatesandwich.png'></div></a> <h3>August 22, 2021</h3> <p>I have actually found use for this in my current line of work. Makes it easier to make repetitive text. Template text goes onto the top bun with [REP] tags for the parts that change with each repetition. Create repetitions by entering elements into the bottom bun separated by commas. Output appears in the meat. Visual style was inspired by the work of Steve Moraff.</p><p><ul></ul></p><p></p><h5><a href = 'https://dave9002.com/tools/templatesandwich.html' target = '_blank'>Try It Out!</a></h5><h5><a href = 'https://www.youtube.com/watch?v=flIANnoyuFo' target = '_blank'>YouTube Demo</a></h5></div><div class = 'toolitem fullishwidth'>  <h2>Flex Sampler</h2> <a href = 'img/flexbox.png' target = '_blank'><div class = 'portfolioImageDiv'><img src = 'img/flexbox.png'></div></a> <h3>March 21, 2018</h3> <p>Flexbox is a powerful facet of CSS for layouts on a website. This web application is useful to those in the know who want to use flexbox. The masks will shift and stretch as you play around with the drop menu options and numbers. You can add more masks by clicking the "Add Anon" and "Add Ronald" buttons and remove them by clicking the masks directly. This was initially made during college to help with my understanding of flexbox, but I found it to be a useful web design tool.</p><p><ul></ul></p><p></p><h5><a href = 'https://dave9002.com/tools/FlexSampler/flexSampler.html' target = '_blank'>Try It Out!</a></h5></div><div class = 'toolitem fullishwidth'>  <h2>Controller Viability</h2> <a href = 'img/Controller.png' target = '_blank'><div class = 'portfolioImageDiv'><img src = 'img/Controller.png'></div></a> <h3>May 13, 2023</h3> <p>An experiment to see if I can make a mobile device screen function kind of like a Gameboy (and it seems to work!). Move your finger around the grey circle to control the red square and hold down on the red button to make the square green.</p><p><ul></ul></p><p></p><h5><a href = 'https://dave9002.com/misc/flippingcontroller3.html' target = '_blank'>Try It Out (on your phone)!</a></h5></div>

        </div>
        
        
    
    <?php include '../components/copyright.php' ?>
	
</body>
<script>
	//https://stackoverflow.com/questions/16611497/how-can-i-get-the-name-of-an-html-page-in-javascript
	document.getElementById("Title").innerHTML = location.href.split("/").pop().replace(".php","").replace("csharp","C#");
</script>
</html>