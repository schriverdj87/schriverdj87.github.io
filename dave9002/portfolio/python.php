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
      
		<div id = 'flascardsshare' class = 'toolitem fullishwidth'>  <h2>Flashcards Share</h2> <a href = 'img/FlashCardsShare.png' target = '_blank'><div class = 'portfolioImageDiv'><img src = 'img/FlashCardsShare.png'></div></a> <h3>December 04 2019 - February 5 2020</h3> <p>This application creates customizable standalone quizzing applications that run in the web browser for easy sharing. These quizzes can have a wide range of questions including, true/false, matching, multiple choice, check all that apply and more. They can also include media including, videos, images, and sound. As with my previous study aid, quizzes are interpreted from plain text files. I made this because I couldn't simply share my previous Flashcards program which was a standalone application made with Java. </p><p><ul></ul></p><p><b>Secondary Technologies:</b> HTML5, JSON</p><h5><a href = 'https://www.youtube.com/watch?v=fz-ozGbxTcI' target = '_blank'>Demo on YouTube</a></h5><h5><a href = 'quizzes/simplespellingtest.html' target = '_blank'>Quiz: Spelling Test</a></h5><h5><a href = 'quizzes/ports.html' target = '_blank'>Quiz: Ports</a></h5><h5><a href = 'quizzes/demo3.html' target = '_blank'>Quiz: Random</a></h5></div><div id = 'sbmt' class = 'toolitem fullishwidth'>  <h2>Starbound Modding Tools</h2> <a href = 'img/SBTools.png' target = '_blank'><div class = 'portfolioImageDiv'><img src = 'img/SBTools.png'></div></a> <h3>~ August 2 2019</h3> <p>This is a set of tools for modding <a href = 'https://playstarbound.com/'>Starbound</a> complete with a demo for modding food allergies into the game. In its assets, Starbound uses JSON files for pretty much everything; making it the perfect 'test subject' for automated modding using Python's IO, JSON, and MongoDB capabilities. I would highly recommend this for sparking an interest in programming in gamers.</p><p><ul></ul></p><p><b>Secondary Technologies:</b> MongoDB, JSON</p><h5><a href = 'https://github.com/schriverdj87/Starbound-Modding-Automation-Tools-WIP' target = '_blank'>GitHub Repo</a></h5><h5><a href = 'https://www.youtube.com/watch?v=cVOwaLUGnOI' target = '_blank'>Demo on YouTube</a></h5></div><div id = 'opripandclip' class = 'toolitem fullishwidth'>  <h2>opRipAndClip.py</h2> <a href = 'img/opripandclip.png' target = '_blank'><div class = 'portfolioImageDiv'><img src = 'img/opripandclip.png'></div></a> <h3>June 20 - June 21 2019</h3> <p>I made this to extract media from a collection of ancient shareware where said media was in zipped folders and could not be searched. I had initially planned on doing this with Java, but I was learning Python and decided to give it a try with Python instead. I found it to be easier in Python than it would have been with Java. This was my first "actual" project with python.</p><p><ul></ul></p><p></p><h5><a href = 'https://www.youtube.com/watch/QYnUrBnCa-s' target = '_blank'>Demo on YouTube</a></h5></div><div id = '{ID}' class = 'toolitem fullishwidth'>  <h2>AutoTemplateApply.py</h2> <a href = 'img/ATA.png' target = '_blank'><div class = 'portfolioImageDiv'><img src = 'img/ATA.png'></div></a> <h3>July 07 2023</h3> <p>This standalone python script allows for the creation of documents with repeating elements using a JSON file and a main template and was used to create this webpage. When run, AutoTemplateApply.py will seek out the JSON files intended for it's use along with the templates indicated and then use them to output a document in the same directory. If the document already exists a backup will be made before overwriting.</p><p><ul><li>Used to build my own portfolio.</li><li>Wrote documentation and examples.</li></ul></p><p><b>Secondary Technologies:</b> JSON</p><a href = 'https://github.com/schriverdj87/AutoTemplateApply'>GitHub Repo</a></div>

        </div>
        
        
    
    <?php include '../components/copyright.php' ?>
	
</body>
<script>
	//https://stackoverflow.com/questions/16611497/how-can-i-get-the-name-of-an-html-page-in-javascript
	document.getElementById("Title").innerHTML = location.href.split("/").pop().replace(".php","").replace("csharp","C#");
</script>
</html>