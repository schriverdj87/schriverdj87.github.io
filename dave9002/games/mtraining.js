//Screens
var divresults;
var divgame;
var divoptions;
var error;

//Elements
var inputQuestions; //The number of questions in the set
var inputRemember; //How far back the player has to remember
var inputSpeed; //How fast the game goes.
var divShow; //The currently displayed number.
var divShowImg;
var hPlaceholder;
var hRight;
var hWrong;
var h1Prize;
var divNumpad;

//Variables
var NumberSequence;
var DisplayIndex = 0;//The number the game is currently showing.
var GameIndex = 0;//The number the game is currently looking for from the player.
var SpeedIncrement = 5; //Speed Max will be (10 * 2) -  (SpeedIncrement * the value of inputSpeed)
var SpeedCounter = 0; //Counts up from 0 when it reaches speed counter max something will happen
var SpeedCounterMax = 0;
var Score = 0;
var Starting = true;//Game must have display index "catch up" to the
var sndPrefix = "snd/"
var sndRight = "right.ogg";
var sndWrong = "wrong.ogg";


//IMGSet
var ImgSet = ["facecatBorder.png","facedogBorder.png","facefrogBorder.png","facerobinBorder.png","facesquirrelBorder.png"]; //["candya.png","candybanana.png","candyfrog.png","candygbear.png","candyjet.png","candypeach.png","candyspider.png","candystrawberry.png","candywmellon.png","candychocolate.png"]
var ImgPrefix = "img/"


var StartHere = function()
{
	//Get Screens
	divresults = document.getElementById("divresults");
	divgame = document.getElementById("divgame");
	divoptions = document.getElementById("divoptions");
	error = document.getElementById("error");
	
	//Get Elements
	inputQuestions = document.getElementById("inputQuestions");
	inputRemember = document.getElementById("inputRemember");
	inputSpeed = document.getElementById("inputSpeed");
	divShow = document.getElementById("divShow");
	spanRemember = document.getElementById("spanRemember");
	hPlaceholder = document.getElementById("hPlaceholder");
	hRight = document.getElementById("hRight");
	hWrong = document.getElementById("hWrong");
	h1Results = document.getElementById("h1Results");
	h1Prize = document.getElementById("h1Prize");
	
	divNumpad = document.getElementById("divNumpad");
	imgShowImg = document.getElementById("imgShowImg"); 
	
	//Staple Buttons
	document.getElementById("btnStart").onclick = StartGame;
	document.getElementById("btnExit").onclick = StopGame;
	
	document.getElementById("0btn").onclick = NumPress;
	document.getElementById("1btn").onclick = NumPress;
	document.getElementById("2btn").onclick = NumPress;
	document.getElementById("3btn").onclick = NumPress;
	document.getElementById("4btn").onclick = NumPress;
	document.getElementById("5btn").onclick = NumPress;
	document.getElementById("6btn").onclick = NumPress;
	document.getElementById("7btn").onclick = NumPress;
	document.getElementById("8btn").onclick = NumPress;
	document.getElementById("9btn").onclick = NumPress;
	document.getElementById("passBtn").onclick = PassPress;
	document.getElementById("optionsBtn").onclick = StopGame;
	document.getElementById("retryBtn").onclick = StartGame;
	
	document.getElementById("1diffbtn").onclick = function()
	{
	inputQuestions.value = 5;
	inputSpeed.value = 1;
	inputRemember.value = 1;
	
	}

	document.getElementById("2diffbtn").onclick = function()
	{
		inputQuestions.value = 10;
		inputSpeed.value = 7;
		inputRemember.value = 1;
	}

	document.getElementById("3diffbtn").onclick = function()
	{
		inputQuestions.value = 10;
		inputSpeed.value = 5;
		inputRemember.value = 2;
	}

	document.getElementById("4diffbtn").onclick = function()
	{
		inputQuestions.value = 10;
		inputSpeed.value = 7;
		inputRemember.value = 2;
	}

	document.getElementById("5diffbtn").onclick = function()
	{
		inputQuestions.value = 10;
		inputSpeed.value = 5;
		inputRemember.value = 3;
	}
	
	//Misc
	setInterval(Engine,100);
	
	//Put Images
	for (var a = 0; a < ImgSet.length; a++)
	{
		var imgNumToPut = ImgSet[a];
		var toPut = "<img src = '" + ImgPrefix + imgNumToPut + "' id = '" + imgNumToPut + "' class = 'NumImg'>";
		document.getElementById(a+"btn").src = ImgPrefix+ImgSet[a];
	}
	
	//Load sounds
	sndRight = new Audio(sndPrefix + sndRight);
	sndWrong = new Audio(sndPrefix + sndWrong);
	
}

var StartGame = function ()
{
	
	if (parseInt(inputRemember.value) > parseInt(inputQuestions.value))
	{
		error.style.display = "block";
	}
	else
	{
		divresults.style.display = "none";
		divgame.style.display = "block";
		divoptions.style.display = "none";
		error.style.display = "none";
		divNumpad.style.display = "none";
		
		NumberSequence = [];
		
		var numsToPut = document.getElementById("inputQuestions").value;
		
		while (NumberSequence.length < numsToPut)
		{
			
			NumberSequence.push(Math.round(Math.random() * 4));
			
			//Get rid of consequtive repeats.
			while (NumberSequence.length > 1 && (NumberSequence[NumberSequence.length - 1] == NumberSequence[NumberSequence.length - 2]))
			{
				NumberSequence[NumberSequence.length - 1] = Math.round(Math.random() * 4);
			}
			
			
			if (NumberSequence.length == 100)
			{
				break;
			}
		}
		
		var blanksToPut = inputRemember.value;
		
		//Add "blank numbers" for the end.
		while (blanksToPut > 0)
		{
			
			NumberSequence.push("&nbsp;");
			blanksToPut--;
			
			if (NumberSequence.length == 200)
			{
				break;
			}
		}
		
		console.log(NumberSequence);
		//Set variables
		GameIndex = DisplayIndex = 0;
		Score = 0;
		spanRemember.innerHTML = inputRemember.value + (inputRemember.value > 1 ? " pictures":" picture");
		//SpeedCounterMax and SpeedCounter start as the same: an "inversion" of inputSpeed element's value.
		console.log(document.getElementById("inputSpeed").value);
		SpeedCounterMax =  (11 * SpeedIncrement) - (document.getElementById("inputSpeed").value * SpeedIncrement);
		SpeedCounter = 30;
		
		Starting = true;
		
		//
		
		divShow.innerHTML = NumberSequence[0];
		UpdateNumImage();
		ShowNone();
	}
}


var SwitchToOptions = function()
{
	divresults.style.display = "none";
	divgame.style.display = "none";
	divoptions.style.display = "block";

}

var SwitchToResults = function()
{
	divresults.style.display = "block";
	divgame.style.display = "none";
	divoptions.style.display = "none";

}


var Engine = function()
{
	//If Game is showing this fires off every tick.
	if (divgame.style.display == "block")
	{
	
		if (SpeedCounter <= 0 && Starting == true)
		{
			DisplayIndex++;
			
			divShow.innerHTML = NumberSequence[DisplayIndex];
			UpdateNumImage();
			console.log(inputRemember.value);
			
			if (DisplayIndex == inputRemember.value)
			{
				//Game has started
				Starting = false;
				SpeedCounter = SpeedCounterMax;
				divNumpad.style.display = "flex";
			}
			else
			{
				SpeedCounter = SpeedCounterMax/2;
			}
		}
		else
		{
			SpeedCounter--;
		}
	
		if (SpeedCounter <= 0 && Starting == false)
		{
			
			//Reset the counter
			SpeedCounter = SpeedCounterMax;
			
			//Game is over, put the end screen.
			if (NumberSequence[DisplayIndex] + "" == "undefined")
			{
				h1Results.innerHTML = Score + "/" + inputQuestions.value + " Correct";
				
				//Show "CONGRATULATIONS" if they got a perfect score on a game that has 10 or more questions and requires you to remember 2 or more numbers at a time.
				h1Prize.style.display = Score == parseInt(inputQuestions.value) && (parseInt(inputQuestions.value) >= 10 && parseInt(inputRemember.value) > 1) ? "block":"none";
				SwitchToResults();
			}
			
			//They have run out of time if placeholder is visible
			if (hPlaceholder.style.display == "block")
			{
					SubmitAnswer(-1);
			}
			else
			{
				UpdateNumImage();
				divShow.innerHTML = NumberSequence[DisplayIndex];
				ShowNone();
			}
		}
		else
		{
			SpeedCounter--;
		}
	}
}



//Assigned to each of the number buttons
var NumPress = function()
{
	
	SubmitAnswer(parseInt(this.id.replace("btn","")));
	
	
}

//Gives answer.
function SubmitAnswer (leNumber)
{
	//Game has stared and not between answers.
	if (Starting == false && hPlaceholder.style.display == "block")
	{
		//Correct Answer
		if (leNumber == NumberSequence[GameIndex])
		{
			ShowRight();
			Score++;
			sndWrong.pause();
			sndRight.pause();
			sndWrong.currentTime = sndRight.currentTime = 0;
			sndRight.play();
			
		}
		else
		{
			ShowWrong();
			sndWrong.pause();
			sndRight.pause();
			sndWrong.currentTime = sndRight.currentTime = 0;
			sndWrong.play();
		}
		
		DisplayIndex++;
		GameIndex++;
		SpeedCounter = 15;
	}
}

var PassPress = function()
{
		DisplayIndex++;
		GameIndex++;
		SpeedCounter = 0;
		
}

function ShowRight()
{
	hRight.style.display = "block";
	hWrong.style.display = "none";
	hPlaceholder.style.display = "none";
}

function ShowWrong()
{
	hRight.style.display = "none";
	hWrong.style.display = "block";
	hPlaceholder.style.display = "none";
}

function ShowNone()
{
	hRight.style.display = "none";
	hWrong.style.display = "none";
	hPlaceholder.style.display = "block";
}

function UpdateNumImage()
{
	
	/*
	for (var a = 0; a < ImgSet.length; a++)
	{
		var toChange = document.getElementById(ImgSet[a]);
		var stylePut = ImgSet[NumberSequence[DisplayIndex]] == ImgSet[a] ? "block":"none";
		toChange.style.display = stylePut;

	}*/
	
	//Put the image
	var toPut = ImgSet[NumberSequence[DisplayIndex]];
	
	if (toPut+"" == "undefined")
	{
		toPut =  "empty300x300.png";
	}
	
	imgShowImg.src = ImgPrefix + toPut;
	
	//ImgPrefix
}

var StopGame = function()
{
	SwitchToOptions();
		
}