/*Tasks remaining before sendoff
- Create transition 

- add sound?
*/
var soundOn = true;
var cheatBox = document.getElementById("sgaHintBox");
var daLetters = document.getElementById("daLetters");
var daLettersWander = 235;//How far the big letter allowed to wander
var letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9"];
var passLetters = ["A","B","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
var sgaLetters = new hash(["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]);
var alienLetters = new hash(["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9"],["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9"]);
var dovaLetters = new hash(["A","B","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","2","3","4","5","6","7","8","9","C"],["A","B","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","AA","AH","EI","EY","II","IR","UR","UU","OO"]);

var dovaReplace = new hash(["CE","CI","CY","SC","C","AA","AH","EI","EY","II","IR","UR","UU","OO"],["SE","SI","SY","S","K","2","3","4","5","6","7","8","9","C"]);

var currentReplace = new hash([],[]);
var currentLetterSet = sgaLetters;
var lastLetter = 0;//Or rather index of
var currentAlphabet = "sga";//Font that is to be learned
var lv1Player = document.getElementById("lv1Player");//Big letter in level 1
var score = 0;
var boxSize = 750;//Size of the window
var colors = ["red","orange","yellow","lime","cyan","blue","purple","magenta"];
var colorsIndex = 0;
var daLettersFlash = {current:0, max:0};

var rightAnswer = "A";//Correct letter
var widthMulti = 1; //Adjusted for wide fonts like morse code
var isFireFox = (navigator.userAgent.indexOf("Firefox") != -1);

var credits = ["By David Schriver (August 2017)","Sounds from Xoom Webclip Empire CD","Special Thanks: <a href = 'https://www.youtube.com/user/awesomeman32l?feature=mhee' target = '_blank' style = 'color: cyan'>JustinAlexander96</a>"];
var creditCountdown = {current: 0, max:90};
var creditLine = document.getElementById("credits");

//-----Boxes
var level1 = document.getElementById("level1");
var level2 = document.getElementById("level2");

var level1instruct = document.getElementById("level1instruct");
var level2instruct = document.getElementById("level2instruct");

var title = document.getElementById("title");
var currentBox = "";//Box currently visible
var nextBox = "";
var transIndex = -1;
var fadeIn = true;

var selectIndexes = ["sga","alien","dova","braille","morse","verdana"];
//----Level 2
var spawnCountDown = {max:120, min: 15, tempMax:120, current:90 };//Controls spawn rate of falling words
var wordPlayer = document.getElementById("player");// Text input
var enemyWords = [];//Holds descending words
var enemyWordsTruth = [];
var bullets = [];//Holds outgoing words
var failDist = 675;//Distance to despawn
var hitDist = 5;//Distance to hit
var lv2Speed = {max: 10, min: 1, current: 1};//Controls speed
var lv2Score = 0;
var randPassLetter = "A";

var daTimer ;//Defined in constructor

var randWords = [];
var randWordsNormal = ["apple","banana","water","pear","heard","milk","club","spade","candy","sugar","honey","money","hear","bird","cats","dogs","lemon","moose","tuna","keys","night","free","satire","solar","tooth","door","green","orange","yell","blue","grape","pink","happy","tree","cook","many","pizza","lips","eyes","hand","foot","cheese","cake","light","shine","love","child","train","plane","sand","silver","gold","medic","toys","bland","bear","deer","tiger","lion","mouse","joy","scene","male","girl","zebra","wolf","rain","sunny","stripe","home","clock","time","numb","flute","piano","wood","marble","guitar","toilet","burger","fries","soda","hippo","bull","silly","laugh","smile","horse","jacket","pants","glove","tide","moon","earth","sky","corn","soil","grape","mint","font"];
var randWordsSGA = ["apple","potion","water","yorp","heard","milk","club","spade","candy","sugar","honey","laser","hear","bird","cats","dogs","lemon","moose","pogo","pick","night","mine","helmet","solar","tooth","door","notch","zombie","yell","blue","grape","pink","happy","tree","cook","many","pizza","lips","eyes","hand","foot","cheese","cake","light","garga","dope","child","train","billy","sand","silver","gold","medic","toys","sheep","wolf","deer","spot","slug","mouse","zap","scene","male","girl","zebra","ship","mars","sunny","tuber","home","clock","time","numb","flute","piano","wood","marble","guitar","toilet","keygem","fries","soda","hippo","dirt","silly","laugh","smile","horse","jacket","pants","glove","tide","moon","earth","sky","corn","soil","grape","mint","herobrine"];
var randWordsAlien = ["apple","banana","water","pear","heard","milk","club","spade","candy","sugar","honey","money","hear","bird","cats","dogs","robot","moose","tuna","keys","night","free","satire","solar","tooth","door","green","bender","lela","blue","grape","pink","happy","tree","cook","many","pizza","lips","eyes","hand","foot","cheese","cake","light","shine","love","child","train","slurm","sand","silver","gold","medic","toys","bland","bear","deer","tiger","lion","mouse","fry","scene","male","girl","zebra","wolf","rain","sunny","stripe","home","clock","mars","numb","ship","amy","wood","marble","guitar","toilet","burger","fries","soda","hippo","bull","silly","laugh","smile","horse","jacket","pants","glove","tide","moon","earth","sky","corn","soil","grape","mint","font"];
var randWordsDova = ["apple","glade","water","nord","heard","milk","orc","spade","candy","sugar","honey","money","hear","bird","cats","dogs","lemon","magica","mage","keys","night","free","satire","solar","tooth","door","green","dragon","yell","blue","thief","pink","happy","tree","cook","many","pizza","lips","eyes","hand","foot","cheese","cake","light","shine","love","sword","train","guard","sand","silver","gold","sneak","toys","shout","bear","deer","tiger","lion","mouse","elf","scene","male","girl","zebra","wolf","rain","kajit","breton","home","lore","time","numb","flute","piano","wood","ulfric","altmer","nazeem","dovakin","fries","soda","hippo","bull","silly","laugh","smile","horse","glitch","pants","glove","tide","moon","earth","sky","corn","soil","grape","mint","font"];

var lv2Particles = {
particles:[],
particlesLifes:[],
particlesSpeeds: [],
particlesLifeSpan: {min: 2, max: 20},
particlesSpeedRange: {min: 10, max: 50},
particleLimit: 500,
spawnCounter: {current:0,currentMax:10,max:10,min:0},
splatch: {currentMin:1, max: 10, min: 1}
};

var clouds = [];//Clouds left by destroyed words;
var leColor = "white";//Current color of text

var fadeout = [];
var fadeoutIndex = -1;
var bulletSpeed = 30;

var lv2Debug = false;
var lv2ColorText = false;


//-----Level 3
var daCanvas = document.getElementById("level3");
var daContext = daCanvas.getContext("2d");
var lv3Player = {x: 275, y: 275, w: 16, h:16, speed: 10};
var north = false;
var south = false;
var east = false;
var west = false;


 function startUp()
 {
	fillColors();
	setSounds(["tick1.ogg","VIBE_MET.ogg","BELL.ogg","SLAM.ogg","BOOP.ogg","over.ogg","TYPESPCE.ogg","ZAP3.ogg","DRIP1.ogg","ZING.ogg","MALFUNCT.ogg","GLURP.ogg"]);
	//setSoundsAlty(["tick1.ogg","VIBE_MET.ogg","BELL.ogg","SLAM.ogg","BOOP.ogg","over.ogg","TYPESPCE.ogg","ZAP3.ogg","DRIP1.ogg","ZING.ogg","MALFUNCT.ogg","GLURP.ogg"],["http://soundbible.com/grab.php?id=783&type=wav","http://soundbible.com/grab.php?id=1992&type=wav","http://soundbible.com/grab.php?id=1598&type=wav","http://soundbible.com/grab.php?id=993&type=wav","http://soundbible.com/grab.php?id=2154&type=wav","http://soundbible.com/grab.php?id=419&type=wav","http://soundbible.com/grab.php?id=1077&type=wav","http://soundbible.com/grab.php?id=963&type=wav","http://soundbible.com/grab.php?id=378&type=wav","http://soundbible.com/grab.php?id=26&type=wav","http://soundbible.com/grab.php?id=1343&type=wav","http://soundbible.com/grab.php?id=2156&type=wav"]); document.getElementById("audiocrud").innerHTML = "soundbible.com";
	
	/*
	
	Audio Credits
	=====================================================
	Tiny Button Push Sound by Mike Koenig -> http://soundbible.com/419-Tiny-Button-Push.html
	Text Message Alert 1 by Daniel Simion -> http://soundbible.com/2154-Text-Message-Alert-1.html
	Click1 Sound by Mike Koenig  -> http://soundbible.com/grab.php?id=783&type=wav
	Pin Dropping Sound by Brian Rocca -> http://soundbible.com/1992-Pin-Dropping.html
	Upper Cut Sound  by Mike Koenig -> http://soundbible.com/grab.php?id=993&type=wav
	Chain Clink Sound by Mike Koenig -> http://soundbible.com/1077-Chain-Clink.html
	Arrow Sound by Mike Koenig -> http://soundbible.com/963-Arrow.html
	Water Droplet Sound by Mike Koenig -> http://soundbible.com/378-Water-Droplet.html
	Bell Sound Ring Sound by  Mike Koenig  -> http://soundbible.com/26-Bell-Sound-Ring.html
	Jump Sound by  snottyboy -> http://soundbible.com/1343-Jump.html
	Text Message Alert 3 Sound by Daniel Simion -> http://soundbible.com/2156-Text-Message-Alert-3.html
	*/
	
	transIndex = - 1;
	document.addEventListener("keydown", function(event){cheatListen(event,"keydown")});
	document.addEventListener("keyup", function(event){cheatListen(event,"keyup")});
	document.addEventListener("keydown", function(event){keyListen(event,"keydown")});
	document.addEventListener("keyup", function(event){keyListen(event,"keyup")});
	daLetters.style.color = "white";
	currentBox = nextBox = "title";
	title.style.display = "block";
	title.style.color = "black";
	
	daTimer = setInterval(engine,33);
	randWords = randWordsNormal;
	
	//document.getElementById("outPoot").innerHTML = randWordsNormal.length;
	
	
	
	//reset();
	spawnCountDown.current = 16;
	
	daContext.fillStyle = "#000000";
	daContext.fillRect(0,0,750,750);
	daCanvas.style.display = "none";
	
	
	
	lv1Cog();
	
	soundOn = false;
	document.getElementById("level1instructDova").style.display = "none";
	switchAlphabet(selectIndexes[document.getElementById("daSelect").selectedIndex]);
	
	soundOn = true;
	
	buildKeyboard();
	//title.style.textShadow  = shadowSpreadMultiplier (title, 10);
	if(isFireFox == false)
	{
		//title.style.display = "none";
		//document.getElementById("fireBox").style.display = "block";
	}
 }
 
 function buildKeyboard()//Reveals and brings up fakeKeyboard
 {
	 var keysToPoot = "1234567890QWERTYUIOPASDFGHJKLZXCVBNM";
	 var changeRow = "QAZ";
	 var rows = ["fakeRow0","fakeRow1","fakeRow2","fakeRow3"];
	 var rowIndex = 0;
	 var rows = [document.getElementById("fakeRow1"),document.getElementById("fakeRow2"),document.getElementById("fakeRow3")];
	 
	 for (var a = 0; a < keysToPoot.length; a ++)
	 {
		 var daChar = keysToPoot.charAt(a);
		 if (daChar == "Q" || daChar == "A" || daChar == "Z"){rowIndex ++;}
		 var pootRow = document.getElementById("fakeRow" + rowIndex);
		 var toPoot = document.createElement("li");
		 toPoot.innerHTML = daChar;
		 var listenTemplate = 'fakeKeyListen("HERE");';
		 toPoot.onclick = function (){ fakeKeyListen(this.innerHTML);};
		 toPoot.onmouseover = function (){playSnd("tick1.ogg");};
		 
		 pootRow.appendChild(toPoot);
	 }
	 
	 var helpKey = document.createElement("li");
	 helpKey.innerHTML = "-";
	 helpKey.onmousedown = function (){if (cheatBox.style.display != "block" && currentBox == "level1"){playSnd("GLURP.ogg");cheatBox.style.display = "block";score = -1;}};
	 helpKey.onmouseup = function (){cheatBox.style.display = "none"; score = 0;};
	 helpKey.onmouseover = function (){playSnd("tick1.ogg");};
	document.getElementById("fakeRow3").appendChild(helpKey);
	 
 
	 
 }

 
 
 function reset()
 {
 
	daLetters.style.textShadow = "0px 0px 0px transparent";
	daLetters.style.color = "white";

		//-----Level 2
	while (lv2Particles.particles.length > 0)
	{
		level2.removeChild(lv2Particles.particles.pop());
		lv2Particles.particlesLifes.pop();
	}
	
	while (clouds.length > 0)
	{
		level2.removeChild(clouds.pop());
	}
	leColor = "white";
	lv2Particles.spawnCounter.currentMax = lv2Particles.spawnCounter.max;
	lv2Particles.spawnCounter.current = 0;
	lv2Particles.splatch.currentMin = lv2Particles.splatch.min;
	score = 0;
	fadeoutIndex = -1;

	
	while (enemyWords.length > 0)
	{
		level2.removeChild(enemyWords.pop());
		enemyWordsTruth.pop();
		
	}
	while (bullets.length > 0)
	{
		level2.removeChild(bullets.pop());
	}

	spawnCountDown.current = 16;
	spawnCountDown.tempMax = spawnCountDown.max;
	
	lv2Speed.current = lv2Speed.min;
	lv2Score = 0;
	north = south = east = west = false;
	switchBox ("title");
	lv2SetMasterGlow("0px 0px 10px transparent");
	
 }
 
 function fillColors ()
 {
	colors = [];
	var red = 255;
	var green = 0;
	var blue = 0;
	var changeFactor = 15;
	
	while (green < 255){green += 5;colors.push("#" + numToHex(red) + numToHex(green) + numToHex(blue));}
	while (red > 0){red -= 5;colors.push("#" + numToHex(red) + numToHex(green) + numToHex(blue));}
	while (blue < 255){blue += 5;colors.push("#" + numToHex(red) + numToHex(green) + numToHex(blue));}
	while (green > 0){green -= 5;colors.push("#" + numToHex(red) + numToHex(green) + numToHex(blue));}
	while (red < 255){red += 5;colors.push("#" + numToHex(red) + numToHex(green) + numToHex(blue));}
	while (blue > 5){blue -= 5;colors.push("#" + numToHex(red) + numToHex(green) + numToHex(blue));}
	
	var all = 250;
	var changeFactor = 50;
	
	while (all > 0){fadeout.unshift("#" + numToHex(all) + numToHex(all) + numToHex(all)); all -= changeFactor;}
	
	
 }

 //--------------------Differentiating-----------------------
 function switchBox (to)//switches the box
 {
	level1.style.display = "none";
	level2.style.display = "none";
	daCanvas.style.display = "none";
	title.style.display = "none";
	level1instruct.style.display = "none";
	level2instruct.style.display = "none";
	
	if (to == "level2instruct")
	{
		var lv2Core = document.getElementById("lv2ic");
		randPassLetter = passLetters[Math.round(Math.random()*(passLetters.length - 10))];
		var lv2CoreString = "Press " + randPassLetter + " to continue<br><br>Any other key will bring you back to the menu<br><br>Type in the words before they reach the bottom of the screen";
		if(currentAlphabet == "dova"){lv2CoreString = lv2CoreString.replace("c","k");}
		if(currentAlphabet == "dova"){lv2CoreString = lv2CoreString.replace("c","k");}
		
		lv2Core.innerHTML = lv2CoreString;
	}
	
	nextBox = to;
	document.getElementById(currentBox).style.display = "block";
	transIndex = fadeout.length - 1;
	fadeIn = false;

 }
 

 
 function switchAlphabet (to)
 {
	 
	 if (to == currentAlphabet){return;}
	playSnd("MALFUNCT.ogg");
	var changeMe = document.getElementsByClassName("sga");
	for (var a = 0; a < changeMe.length; a++)
	{
		
		changeMe[a].style.fontFamily = to;
	}
	
	var dovaInstructions = document.getElementById("level1instructDova");
	dovaInstructions.style.display = "none";
	var titleC = document.getElementById("titleC");
	titleC.innerHTML = "C";
	currentAlphabet = to;
	currentReplace = new hash([],[]);
	randWords = randWordsNormal;
	widthMulti = 1;
	daLetters.style.fontSize = "500px";
	
	if (to == "sga"){cheatBox = document.getElementById("sgaHintBox"); currentLetterSet = sgaLetters; daLetters.style.top = "0px"; daLetters.style.left = "0px"; randWords = randWordsSGA;};
	if (to == "alien"){cheatBox = document.getElementById("alienHintBox"); currentLetterSet = alienLetters; daLetters.style.top = "0px"; daLetters.style.left = "0x";randWords = randWordsAlien;};
	if (to == "braille"){cheatBox = document.getElementById("brailleHintBox"); currentLetterSet = sgaLetters;daLetters.style.top = "0px"; daLetters.style.left = "0px";};
	if (to == "dova"){cheatBox = document.getElementById("dovaHintBox"); currentLetterSet = dovaLetters; currentReplace = dovaReplace; titleC.innerHTML = "K";dovaInstructions.style.display = "block"; randWords = randWordsDova;};
	if (to == "morse"){cheatBox = document.getElementById("morseHintBox"); currentLetterSet = alienLetters; widthMulti = 1; daLetters.style.fontSize = "300px";};
	
	//daLetters.style.margin = "25%";
	
	moveDaLetters()
 }
 
 function moveDaLetters() //repositions leve1 letters in a random way
 {
	 daLetters.style.left = Math.round(Math.random() * (daLettersWander + 100)*widthMulti )  + "px";
	daLetters.style.top = Math.round(Math.random() * (daLettersWander) - 100 )  + "px";
	 
 }
 
 /////////////------------------------------------
function lv2DispenseWord ()
{
	var toSend = document.createElement("P");
	toSend.innerHTML = randWords[Math.round(Math.random()*(randWords.length - 1))].toUpperCase();
	toSend.style.width = "100%";
	toSend.style.position = "absolute";
	toSend.style.top = "0px";
	toSend.style.fontFamily = currentAlphabet;
	if (currentAlphabet == "morse"){toSend.style.fontSize = "50px";}
	
	return toSend;
}

function lv2DispenseLetter()
{
	var disColor = "white";
	if (score >= 25 && lv2ColorText == false){disColor = colors[colorsIndex];}
	var letterSize = 20;
	var toSend = document.createElement("P");
	toSend.innerHTML = currentLetterSet.getValues()[Math.round(Math.random() * (currentLetterSet.getValues().length - 1))];
	toSend.style.fontFamily = currentAlphabet;
	toSend.style.position = "absolute";
	toSend.style.width = toSend.style.height = letterSize + "px";
	toSend.style.top = (boxSize - letterSize) + "px"; //(Math.round(Math.random()*(boxSize))) + "px";
	toSend.style.left = (Math.round(Math.random()*(boxSize - letterSize))) + "px";
	toSend.style.fontSize = "20px";
	toSend.style.color = disColor;
	toSend.style.textShadow = "0px 0px 10px " + disColor;
	//if (score >= 6){toSend.style.color = lv1DispenseColor(); toSend.style.textShadow = "0px 0px 10px " + toSend.style.color;}
	toSend.style.zIndex = "0";
	return toSend;
	
}
 
function lv1DispenseColor()
{
	colorsIndex += 1;
	if (colorsIndex >= colors.length){colorsIndex = 0}
	return colors[colorsIndex];
}
 
function lv2CheckHit()
{
	return (parseInt(bullets[0].style.top.substring(0,bullets[0].style.top.indexOf("p"))) - parseInt(enemyWords[0].style.top.substring(0,enemyWords[0].style.top.indexOf("p"))) <= hitDist);
}
 
 function engine()
 {
	 
	if (transIndex != fadeout.length)
	{
		
		if (fadeIn == true)
		{
			transIndex ++;
			if (transIndex == fadeout.length){fadeIn = false; return;}
			
			document.getElementById(currentBox).style.color = fadeout[transIndex];
		}
		else
		{
			transIndex--
			if (transIndex == -1)
			{
				fadeIn = true; 
				document.getElementById(currentBox).style.display = "none";
				document.getElementById(nextBox).style.display = "block";
				document.getElementById(nextBox).style.color = "black";
				currentBox = nextBox; 
				return;
			}
			document.getElementById(currentBox).style.color = fadeout[transIndex];
		}
	
	return;
	}
	if (currentBox == "title" && isFireFox == false)
	{
		switchAlphabet(selectIndexes[document.getElementById("daSelect").selectedIndex]);
	}
	
	if (currentBox == "title")
	{
		if (creditCountdown.current <= 0)
		{
			
			var creditIndex = credits.indexOf(creditLine.innerHTML) + 1;
			
			if (creditIndex >= credits.length){creditIndex = 0;}
			
			creditLine.innerHTML = credits[creditIndex];
			
			creditCountdown.current = creditCountdown.max;
		}
		else {creditCountdown.current--}
		
	}
	
	if (currentBox == "level1")
	{
		lv1Cog();
		
	}
	if (currentBox == "level2")
	{
		if (fadeoutIndex > -1)
		{
			for (var a = 0; a < enemyWords.length; a++)
			{
				enemyWords[a].style.color = fadeout[fadeoutIndex];
			}
			
			fadeoutIndex --;
			
			if (fadeoutIndex <= -1)
			{
				while (enemyWords.length > 0)
				{
					level2.removeChild(enemyWords.pop());
					enemyWordsTruth.pop();
				}
			}
			
			return;
		}
		else
		{
			lv2Cog();
			lv2CogParticles();
		}
	}
	else if (currentBox == "level3")
	{
		lv3Cog();
	}
 }
 
 function lv1Cog()
 {
	var daColor = daLetters.style.color;
	var scoreJitter = Math.max(0,score + (Math.round(Math.random() * 3)));
	if (score < 5){daLetters.style.textShadow = "0px 0px 0px transparent"; daLetters.style.color = "white"; level1.style.boxShadow = "inset 0px 0px 0px black"; return;}
	
	if (score >= 30)
	{
		if(daLettersFlash.current == 0)
		{
		daColor = lv1DispenseColor(); 
		while (daColor == daLetters.style.color){daColor =  lv1DispenseColor();}
		daLettersFlash.current = daLettersFlash.max;
		}
		else
		{
		daLettersFlash.current--;
		}
		//level1.style.boxShadow = "inset 0px 0px " + (scoreJitter - 10) +"px" + daColor;
		level1.style.boxShadow = "inset 0px 0px "+ (scoreJitter - 10) + "px " + daColor;
	}
	
	daLetters.style.color = daColor;
	daLetters.style.textShadow = "0px 0px " + Math.min(30,scoreJitter - 5) + "px " + daColor;
	
	
	
	/*
	
	if (score < 32){daLetters.style.textShadow = "0px 0px 0px transparent"}
 
	if (score >= 32)
	{
		if(daLettersFlash.current == 0)
		{
		var leColor =  lv1DispenseColor();
		while (leColor == daLetters.style.color){leColor =  lv1DispenseColor();}
		
		daLetters.style.color = leColor;
		daLetters.style.textShadow = "0px 0px 10px " + leColor;
		daLettersFlash.current = daLettersFlash.max;
		}
		else
		{
		daLettersFlash.current--;
		}
	}
	*/
 }
 
 function lv2SetMasterGlow(to)
 {
	for (var a = 0; a < enemyWords.length; a++){enemyWords[a].style.textShadow = to; enemyWords[a].style.zIndex = 9001;}
	for (var b = 0; b < bullets.length; b++){bullets[b].style.textShadow = to;bullets[b].style.zIndex = 9001;}
	wordPlayer.style.textShadow = to;
	wordPlayer.style.zIndex = 9001;
	
 }
 
 function lv2CogParticles()
 {
 /*
 - Particles 3
 - Colored Particles 6
 - Moar Particles 12
 - Max Particles 24
 - Colored flashing text 48
 */
 
	//-------------------------------Manipulate particles----------------------------------
	for (var a = lv2Particles.particles.length - 1; a > -1 ; a-- )
	{
		lv2Particles.particlesLifes[a] = lv2Particles.particlesLifes[a] - 1;
		lv2Particles.particles[a].style.top = (Number(lv2Particles.particles[a].style.top.replace("px","")) - lv2Particles.particlesSpeeds[a]) + "px"; 
		
		
		if (lv2Particles.particlesLifes[a] == 1)
		{
			lv2Particles.particles[a].style.color = "black";
		}
		
		if (lv2Particles.particlesLifes[a] <= -1)
		{
		
			level2.removeChild(lv2Particles.particles[a]);
			lv2Particles.particles[a] = null;
			lv2Particles.particles.splice(a,1);
			lv2Particles.particlesSpeeds.splice(a,1);
			lv2Particles.particlesLifes.splice(a,1);
			
			
		}
	}
	
	//Score setter
	
	
	
	if (score < 6)
	{
		//lv2Particles.spawnCounter.current = 0;
		lv2SetMasterGlow("0px 0px 10px transparent");
		lv2Particles.splatch.currentMin = lv2Particles.splatch.min;
		lv2Particles.spawnCounter.currentMax = lv2Particles.spawnCounter.max;
		return;
	}
	
	 if (score >= 12)
	{
		lv2Particles.splatch.currentMin = Math.round(lv2Particles.splatch.max/2);
		lv2Particles.spawnCounter.currentMax = lv2Particles.spawnCounter.max/2;
		document.getElementById("outPoot").style.color = "green";
		
	}
	if (score >= 18)
	{
		lv2Particles.splatch.currentMin = Math.round(lv2Particles.splatch.max);
		lv2Particles.spawnCounter.currentMax = 0;
		document.getElementById("outPoot").style.color = "red";
		
	}
	
	if (score >= 24 && lv2ColorText == true)
	{
	
		leColor = lv1DispenseColor();
		
		wordPlayer.style.color = leColor; wordPlayer.style.textShadow = "0px 0px 10px " + leColor;
		if (bullets.length > 0){bullets[0].style.color = leColor; bullets[0].style.textShadow = "0px 0px 10px " + leColor;}
	
		
		for (var b = 0; b < enemyWords.length; b++)
		{
			var tempIndex = colorsIndex + Math.max(b*20,20);
			
			if (tempIndex >= colors.lengh){tempIndex = tempIndex - colors.length;}
			
			
			lv2ApplyColor(enemyWords[b],colors[tempIndex]);
			//enemyWords[b].style.color = leColor; enemyWords[b].style.textShadow = "0px 0px 10px " + leColor;
		}
		
	}
	else if (score >= 24 && lv2ColorText == false){lv2SetMasterGlow("0px 0px 10px white");}
	
	//-------------------------------Add Particles---------------------------------------------
	if (lv2Particles.particles.length < lv2Particles.particleLimit)
	{
		
		
		if (lv2Particles.spawnCounter.current == 0)
		{
			
			var toSplatch = Math.round(Math.random()*(lv2Particles.splatch.max - lv2Particles.splatch.min) + lv2Particles.splatch.min);
			
			
			
			while (toSplatch > 0)
			{
				if (lv2ColorText == false){	colorsIndex += 1; if (colorsIndex >= colors.length){colorsIndex = 0;}}
				toSplatch--;
				lv2Particles.particles.push(lv2DispenseLetter());
				lv2Particles.particlesLifes.push(Math.round(Math.random()*(lv2Particles.particlesLifeSpan.max - lv2Particles.particlesLifeSpan.min) + lv2Particles.particlesLifeSpan.min));
				lv2Particles.particlesSpeeds.push(Math.round(Math.random()*(lv2Particles.particlesSpeedRange.max - lv2Particles.particlesSpeedRange.min) + lv2Particles.particlesSpeedRange.min));
				level2.appendChild(lv2Particles.particles[lv2Particles.particles.length - 1]);
				//document.getElementById("outPoot").innerHTML =lv2Particles.particles.length + "DING";
				
				
			}
			
			lv2Particles.spawnCounter.current = lv2Particles.spawnCounter.currentMax;
		}
		else
		{
			lv2Particles.spawnCounter.current--;
		}
	}
	
	document.getElementById("outPoot").innerHTML = score;
	
 }
 
 function lv2ApplyColor (grind, color)
 {
	grind.style.color = color;
	grind.style.textShadow = "0px 0px 10px " + color;
 }
 
  function lv2ShadowMultiplier (grind, to)
 {
	var grindSplit = grind.style.textShadow.split(" ");
	var newNumber = parseInt(grindSplit[2].replace("px","")) * to;
	var toSend = grindSplit[0] + " " + grindSplit[1] + " " + newNumber + "px";
	for (var a = 3; a < grindSplit.length; a++)
	{
		toSend = toSend + " " + grindSplit[a];
	}
	return toSend;
	
 }
 
 function lv2Cog()
 {
	var spawnLimit = 5;
	if (lv2Debug){spawnLimit = 1;}
 
	if (enemyWords.length < spawnLimit)
	{
		if (spawnCountDown.current == 0)//Spawn new bullets
		{
			enemyWords.push(lv2DispenseWord());
			playSnd("DRIP1.ogg");
			enemyWordsTruth.push(enemyWords[enemyWords.length - 1].innerHTML);
			enemyWords[enemyWords.length - 1].innerHTML = massReplace(enemyWords[enemyWords.length - 1].innerHTML.toUpperCase(), currentReplace.getKeys(), currentReplace.getValues());
			//enemyWords[enemyWords.length - 1].style.textShadow = "0px -2px 0px #aaaaaa, 0px -4px 0px #555555";//"0px -5px 1px #eeeeee, 0px -10px 1px #dddddd, 0px -15px 1px #cccccc;";
			level2.appendChild(enemyWords[enemyWords.length - 1]);
		
			spawnCountDown.current = spawnCountDown.tempMax;
		}
		else {spawnCountDown.current--}
	}
 
	if (enemyWords.length > 0 && lv2Debug == false)
	{
	
		for (var a = enemyWords.length - 1; a > -1; a--)//Move and check the things
		{
		
			var tempDist = parseInt(enemyWords[a].style.top.substring(0,enemyWords[a].style.top.indexOf("p"))) + lv2Speed.current;
			
			if (tempDist >= failDist)// Words reached the bottom
			{
				playSnd("ZING.ogg");
				fadeoutIndex = fadeout.length - 1;
				//level2.removeChild(enemyWords[a]);
				//enemyWordsTruth[a] = null;
				//enemyWordsTruth.splice(a,1);
				
				//enemyWords[a] = null;
				//enemyWords.splice(a,1);
				
				
				wordPlayer.innerHTML = "";
				score = 0;
				
			}
			else
			{
				enemyWords[a].style.top = tempDist + "px";
			}
			
		}
	
	}
	
	for (var c = clouds.length - 1; c > -1; c--)//Move, expand and remove clouds
	{
			var newDistCloud = parseInt(clouds[c].style.top.replace("px","")) - (bulletSpeed/2);
			clouds[c].style.top = newDistCloud + "px";
			
			var shadowNumber = parseInt(clouds[c].style.textShadow.split(" ")[2].replace("px",""));
			if (shadowNumber >= 100 || newDistCloud <= 0)
			{
				level2.removeChild(clouds[c]);
				clouds[c] = null;
				clouds.splice(c,1);
				
			}
			else
			{
				clouds[c].style.textShadow = lv2ShadowMultiplier(clouds[c],2);
			}
			
	}
	
	if (bullets.length > 0)
	{
		

		
		if (parseInt(bullets[0].style.top.substring(0,bullets[0].style.top.indexOf("p"))) < 0)
		{
				
				level2.removeChild(bullets[0]);
				bullets[0] = null;
				bullets.shift();
		}
		
		for (var b = 0; b < bullets.length; b++)//Move Bullets 
		{
			var newDist = parseInt(bullets[b].style.top.substring(0,bullets[b].style.top.indexOf("p"))) - bulletSpeed;
			bullets[b].style.top = newDist + "px";
		}
		

		
		if (parseInt(bullets[0].style.top.substring(0,bullets[0].style.top.indexOf("p"))) - parseInt(enemyWords[0].style.top.substring(0,enemyWords[0].style.top.indexOf("p"))) <= hitDist)//check if there is a hit
		{
				score++;
				
				/*Cloud
				var newCloud = document.createElement("P");
				newCloud.style.color = "transparent";
				newCloud.style.textShadow = "0px 0px 1px " + enemyWords[0].style.color;
				newCloud.style.width = "100%";
				newCloud.style.position = "absolute";
				newCloud.style.fontFamily = currentAlphabet;
				newCloud.style.top = enemyWords[0].style.top;
				*/
				
				//document.getElementById("outPoot").innerHTML = score;
				var oldTop = enemyWords[0].style.top;
				level2.removeChild(enemyWords[0]);
				enemyWordsTruth[0] = null;
				enemyWordsTruth.shift();
				
				enemyWords[0] = null;
				enemyWords.shift();
				playSnd("SLAM.ogg");
				
				//Kill bullet
				//level2.removeChild(bullets[0]);
				//bullets[0] = null;
				var newCloud = bullets.shift();
				var newCloudColor = "white"; //newCloud.style.color;
				newCloud.style.color = "transparent";
				newCloud.style.textShadow = "0px 0px 1px " + leColor;
				newCloud.style.top = oldTop;
				
				clouds.push(newCloud);
				
				
				
				
		}		
		
	}
	
	if (enemyWords.length == 0){return;}
	
	if (player.innerHTML.toLowerCase() == enemyWordsTruth[0].toLowerCase())
		{
			player.innerHTML = "";
			playSnd("ZAP3.ogg");
			var newBullet = document.createElement("p");
			newBullet.innerHTML = enemyWords[0].innerHTML;
			newBullet.style.width = "100%";
			newBullet.style.top = "675px";
			newBullet.style.position = "absolute";
			newBullet.style.fontFamily = currentAlphabet; 
			newBullet.style.color = wordPlayer.style.color;
			var daAfterImage = "";
			for (var a = 0; a < 5; a++)
			{
				var daRay = fadeout;
				var offset = 0;
				if (score >= 24){offset == colorsIndex; daRay = colors;}
				var imgToPoot;
				
			
			}
			
			level2.appendChild(newBullet);
			bullets.push(newBullet);
			
		}
 }
 
 function lv3Cog()
 {
	//Move
	var moveSpeed = lv3Player.speed;
	var moveScore = 0;
	if (north){moveScore++;}
	if (south){moveScore++;}
	if (east){moveScore++;}
	if(west){moveScore++;}
	if (moveScore >= 2){moveSpeed = moveSpeed * 0.7;}
	
	if (north){lv3Player.y = lv3Player.y - moveSpeed;}
	if (south){lv3Player.y = lv3Player.y + moveSpeed;}
	if (east){lv3Player.x = lv3Player.x + moveSpeed;}
	if (west){lv3Player.x = lv3Player.x - moveSpeed;}
	
	
	//Render
	daContext.fillStyle = "#000000";
	daContext.fillRect(0,0,750,750);
	daContext.fillStyle = "#FFFFFF";
	var img=document.getElementById("uplayer");
	daContext.drawImage(img,lv3Player.x,lv3Player.y);
	
 }
 
 function fakeKeyListen(key)
 {

	 keyListen({keyCode: key.charCodeAt(0)},"keydown");
 }
 

 
  function cheatListen(event, daType)
 {
	
	//if (title.style.display == "block"){title.style.display = "none";}
	
	if (event.keyCode == 27 ){reset(); playSnd("BOOP.ogg");return;}
	if (event.keyCode != 173 && event.keyCode != 189 && event.keyCode != 27){return;}
	
	
	{
		if (daType == "keydown" && cheatBox.style.display != "block" && currentBox == "level1")
		{
			playSnd("GLURP.ogg");
			cheatBox.style.display = "block";
			score = -1;
		
		}
		else if (daType == "keyup")
		{
			cheatBox.style.display = "none";
			score = 0;
		}
	}
	
	
	
 }
 
 function keyListen(event,daType)
 {
	
		
	//console.log(letters[event.keyCode - 65]);
	if (event.keyCode == 27 || event.keyCode == 173){return;}//Esc was pressed
	if (daType == "keyup" && currentBox == "title")
	{
		if (event.keyCode == 38 || event.keyCode == 40){switchAlphabet(selectIndexes[document.getElementById("daSelect").selectedIndex]);;}
	}
	else if (daType == "keydown" && currentBox == "level1instruct")
	{
		switchBox("level1");
		playSnd("over.ogg");
	}
	
	else if (daType == "keydown" && currentBox == "level2instruct")
	{
		var enteredLetter = String.fromCharCode(event.keyCode);
		
		if (randPassLetter.toLowerCase() != enteredLetter.toLowerCase()){switchBox("title"); playSnd("BOOP.ogg"); return;}
		
		switchBox("level2");
		playSnd("over.ogg");
	}

	
	else if (daType == "keydown" && currentBox == "level1")
	{
		//Keys are the single letters that go in daLetter, Values can be multiple letters that go in the player bin
	
		var daLetter = String.fromCharCode(event.keyCode);//Letter typed in
		
		var currentPlayerWord = lv1Player.innerHTML;//Letter typed in
		var rightAnswerValue = currentLetterSet.get(rightAnswer);//Multiple values
		var toPoot = currentLetterSet.getKeys()[Math.round(Math.random()*(currentLetterSet.getKeys().length - 1))];//Change to this maybe upon getting right answer
		
		if (rightAnswerValue.length > 1 && event.keyCode != 173)//Requires multiple letters
		{
			//console.log("multiple Letters")
			if (rightAnswerValue.toUpperCase().indexOf(currentPlayerWord.toUpperCase() + daLetter.toUpperCase()) != 0){console.log(rightAnswerValue.toUpperCase() +"->" + (currentPlayerWord.toUpperCase() + daLetter.toUpperCase())); return;}//If entry would produce the wrong answer
			lv1Player.innerHTML = lv1Player.innerHTML + daLetter;
			
			if (rightAnswerValue.toUpperCase() == lv1Player.innerHTML.toUpperCase())//correct answer
			{
				playSnd("VIBE_MET.ogg");
				while (toPoot == daLetter){toPoot = currentLetterSet.getKeys()[Math.round(Math.random()*(currentLetterSet.getKeys().length - 1))];}
				
				daLetters.innerHTML = rightAnswer = toPoot;
				
				if (score != -1){score ++;}
				moveDaLetters();
				lv1Player.innerHTML = "";
			}
			else if (event.keyCode != 173 && event.keyCode != 189)
			{
				 playSnd("TYPESPCE.ogg");
			}
			
		}
		else // 1 Letter 
		{
			if (daLetter.toUpperCase() == daLetters.innerHTML.toUpperCase())//Right answer given
			{
				playSnd("VIBE_MET.ogg");
				
				while (toPoot == daLetter){toPoot = currentLetterSet.getKeys()[Math.round(Math.random()*(currentLetterSet.getKeys().length - 1))];}
				
				daLetters.innerHTML = rightAnswer = toPoot;
				
				if (score != -1){score ++;}
				moveDaLetters();
				
			}
			else if (event.keyCode != 173 && event.keyCode != 189)
			{
				 playSnd("TYPESPCE.ogg");
			}
		}
		
		/*
		if (event.keyCode == 37 && lv1Player.innerHTML.length >= 0)//Backspace
		{
			lv1Player.innerHTML = lv1Player.innerHTML.substring(0,lv1Player.innerHTML.length - 1);
		}
		
		else if (lv1Player.innerHTML.length < currentLetterSet.getByValue(daLetters.innerHTML).length  && letters.indexOf(daLetter) != -1)
		{
			
			lv1Player.innerHTML = lv1Player.innerHTML + String.fromCharCode(event.keyCode);
			
			if (currentLetterSet.get(lv1Player.innerHTML) == daLetters.innerHTML)//Right answer
			{
				lastLetter = currentLetterSet.getValues().indexOf(daLetters.innerHTML);
				var randLetter= Math.round(Math.random()*(currentLetterSet.getValues().length -1));
				while (randLetter == lastLetter)
				{
					randLetter = Math.round(Math.random()*(currentLetterSet.getValues().length - 1));
				}
				
				daLetters.innerHTML = currentLetterSet.getValues()[randLetter];
				
				lv1Player.innerHTML = "";
				if (score != -1){score ++; document.getElementById("outPoot").innerHTML = score;}
				daLetters.style.left = Math.round(Math.random() * (daLettersWander) )  + "px";
				daLetters.style.top = Math.round(Math.random() * (daLettersWander) )  + "px";
				
				
			}
			
			else if (lv1Player.innerHTML.length == currentLetterSet.getByValue(daLetters.innerHTML).length && currentLetterSet.get(lv1Player.innerHTML) != daLetters.innerHTML)//Wrong answer and answer entry is full
			{
				lv1Player.innerHTML = "";
			}
		}	
			*/
	}
	else if (currentBox == "level2" && daType == "keydown" && fadeoutIndex == -1)
	{
		
		if (event.keyCode == 37 && wordPlayer.innerHTML.length >= 1)
		{
			wordPlayer.innerHTML = wordPlayer.innerHTML.substring(0,wordPlayer.innerHTML.length - 1);
		}
		else
		{
			if (event.keyCode < 65 || event.keyCode > 90 ){playSnd("TYPESPCE.ogg"); return;}//Not a letter
			var mrKey = String.fromCharCode(event.keyCode);
			if (wordPlayer.innerHTML.length > 0){mrKey = mrKey.toLowerCase();}//First letter is capitalized
			var nextKey = wordPlayer.innerHTML + mrKey;
			if (enemyWordsTruth[0].toLowerCase().indexOf(nextKey.toLowerCase()) != 0){playSnd("TYPESPCE.ogg"); return;}else{playSnd("VIBE_MET.ogg");}
			var nexLetter = String.fromCharCode(event.keyCode);
			if (wordPlayer.innerHTML.length > 0){nexLetter = nexLetter.toLowerCase()}
			wordPlayer.innerHTML = wordPlayer.innerHTML + nexLetter;//wordPlayer.innerHTML = wordPlayer.innerHTML + letters[event.keyCode - 65];
			if (enemyWords.length < 1){return;}
			//console.log(enemyWords[0].innerHTML + "&&" + wordPlayer.innerHTML.toLowerCase() + "&&" + enemyWords[0].innerHTML.toLowerCase().indexOf(wordPlayer.innerHTML.toLowerCase()));
			//console.log(enemyWords[enemyWords.length - 1].innerHTML.includes(wordPlayer.innerHTML.toLowerCase()));
			//console.log(enemyWords[0].innerHTML.indexOf(wordPlayer.innerHTML.toLowerCase()));
			
		}
		
		
	}
	else if (currentBox == "level3")
	{
		if (daType == "keydown")
		{
			if (event.keyCode == 38)
			{
				north = true;
				south = false;
			}
			else if (event.keyCode == 40)
			{
				north = false;
				south = true;
			}
			if (event.keyCode == 37)
			{
				west = true;
				east = false;
			}
			else if (event.keyCode == 39)
			{
				west = false;
				east = true;
			}
		}
		else if (daType == "keyup")
		{
			console.log("DING")
			if (event.keyCode == 38)
			{
				north = false;
			}
			else if (event.keyCode == 40)
			{
				south = false;
			}
			else if (event.keyCode == 37)
			{
				west = false;
			}
			else if (event.keyCode == 39)
			{
				east = false;
			}
		}
	}
 }

 ///------------------------Tools----------------------------------
 function playSnd (toPlay)
 {
	if (soundOn == false){return;}
	
	if(isFireFox == true)
	{
	document.getElementById(toPlay).currentTime = 0;;
	}
	document.getElementById(toPlay).play();
 }
 
 function setSounds (toGrind)
 {
	for (var a = 0; a < toGrind.length; a++)
	{
		var toMake = document.createElement("audio");
		toMake.src = "snd/" + toGrind[a];
		toMake.id = toGrind[a];
		toMake.enablejavascript = true;
		toMake.volume = 0.25;
		title.appendChild(toMake);
	}
 }
 
  function setSoundsAlty(toGrind,Alty)//For when sounds won't be accepted online
 {
	 if (toGrind.length != Alty.length){console.log("toGrind and Alty legth mismatch @ setSoundsAlty"); return;}
	for (var a = 0; a < toGrind.length; a++)
	{
		var toMake = document.createElement("audio");
		toMake.src = Alty[a];
		toMake.id = toGrind[a];
		toMake.enablejavascript = true;
		toMake.volume = 0.25;
		title.appendChild(toMake);
	}
 }
 
 function massReplace (grind, toReplace, replacer)
 {
	//toReplace is what you want to replace
	//replacer is what you want to replace with
	var toSend = grind;
	if (toReplace.length != replacer.length){console.log("toReplace and replacer are different lengths")}
	
	for (var a = 0; a < toReplace.length; a++)
	{
		
		while (toSend.indexOf(toReplace[a]) != -1) {toSend = toSend.replace(toReplace[a],replacer[a]); console.log("DING");}
	}
	
	return toSend;
 }
 

 
 function hash (daKeys, daValues)
 {
	var keys = daKeys;
	var values = daValues;
	
	this.getKeys = function (){return keys;}
	this.getValues = function (){return values;}
	
	this.get = function (key)
	{
		if (keys.indexOf(key) == -1){return null;}
		
		return values[keys.indexOf(key)];
	}
	
	this.getByValue = function (value)
	{
		if (values.indexOf(value) == -1){return null;}
		
		return keys[values.indexOf(value)];
	}
	
 }
 
 function numToHex(grind)
 {
	var toSend = "0";
	var daArray = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];
	if (grind <= 0){return "00";}
	if (grind >= 255){return "ff";}
	if (grind <= 15){return "0" + daArray[grind];}
	if (grind % 16 == 0) {return daArray[grind/16] + "0";}
	var remainder = grind % 16;
	return daArray[(grind - remainder)/16] + daArray[remainder];
	
	/*
	if (grind >= 240){toSend = "f" + daArray[240 - grind];}
	else if (grind >= 224){toSend = "e" + daArray[224 - grind];}
	else if (grind >= 208){toSend = "d" + daArray[208 - grind];}
	else if (grind >= 192){toSend = "c" + daArray[192 - grind];}
	else if (grind >= 176){toSend = "b" + daArray[176 - grind];}
	else if (grind >= 160){toSend = "a" + daArray[160 - grind];}
	else if (grind >= 144){toSend = "9" + daArray[144 - grind];}
	else if (grind >= 128){toSend = "8" + daArray[128 - grind];}
	else if (grind >= 112){toSend = "7" + daArray[112 - grind];}
	else if (grind >= 96){toSend = "6" + daArray[96 - grind];}
	else if (grind >= 80){toSend = "5" + daArray[80 - grind];}
	else if (grind >= 64){toSend = "4" + daArray[64 - grind];}
	else if (grind >= 48){toSend = "3" + daArray[48 - grind];}
	else if (grind >= 32){toSend = "2" + daArray[32 - grind];}
	else if (grind >= 16){toSend = "1" + daArray[16 - grind];}
	else{toSend = "0" + daArray[grind]; console.log (grind);}
	*/
	
	return toSend;	
	
 }
 
 function getRandom (grind)
 {
	return grind[Math.round(Math.random() * (grind.length - 1))];
 }
 
 ///------------------------LV3 GEOMETRY-----------------------------------
 function superSquare (width,height,daImage,X,Y)
 {
	x: X;
	y: Y;
	
	w: width;
	h: height;
	
	
	function cog ()
	{

	}
	 
	function getNine()
	{
		return {
		nw: {X:x, Y:y},
		n: {X: width/2 + x, Y:y},
		ne: {X: width + x, Y:y},
		e: {X: width + x, Y: height/2 + y},
		se: {X: width + x, Y: height + y },
		s: {X: width/2 + x, Y: height + y },
		sw: {X:x, Y: height + y },
		w: {X:x, Y: height/2 + y },
		c: {X: width/2 + x, Y: height/2 + y},
		};
	}
	
	function hitTest (otherSquare)
	{
		
	}
 }
 