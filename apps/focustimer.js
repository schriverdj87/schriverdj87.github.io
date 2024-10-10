var TIMEREAD;
var sldTime;
var sldVolume;
var btnPlayPause;
var screenSaverBox;
var seconds;
var unpaused = false;//Whether or not it is paused
var sndIndex = 0;
var sndPrefix = "snd/"
var snds = ["chime0.ogg","chime1.ogg","chime2.ogg","chime3.ogg","chime4.ogg"];
var bkgPrefix = "img/";
var bkgs = ["tiledClover.png","tiledBeachrock.png","tiledCoffeeBeans.png","beanstiled.png","tiledpasta.png","tiledBees.png"]
var bells; //The physical bells.
var fsBox;
var chkFullscreen;
var sndRelease = false;

var FTStart = function()
{
    //Get the elements
    TIMEREAD = document.getElementById("TIMEREAD");
    TIMEREAD2 = document.getElementById("TIMEREAD2");
    sldTime = document.getElementById("sldTime");
    btnPlayPause = document.getElementById("btnPlayPause");
    sldVolume = document.getElementById("sldVolume");
    fsBox = document.getElementById("fsBox");
    chkFullscreen = document.getElementById("chkFullscreen");
    screenSaverBox = document.getElementById("screenSaverBox");

    //Staple the elements
    sldTime.onchange = function()
    {
        UpdateSliderSeconds();
        unpaused = false;
    }
    
    btnPlayPause.onclick = fsBox.onclick = function()
    {
        unpaused = !unpaused;

        if (unpaused == true)
        {
            fsBox.style.display = "flex";
            
            if (chkFullscreen.checked)
            {fsBox.requestFullscreen();}
        }
        
        if (unpaused == false)
        {
            fsBox.style.display = "none";
            document.exitFullscreen();
            UpdateSliderSeconds();
        }
    }

    sldVolume.onchange = UpdateSliderVolume;

    //setup
    setInterval(Engine,1000);
    UpdateSliderSeconds();
    SetupBells();
    SetupBKGS();
    LoadAudio();
   
    UpdateSliderVolume();
    UpdateBKG();
	
	sndRelease = true;
    
}

function LoadAudio()
{
    for (var a = 0; a < snds.length; a++)
    {
        //https://gomakethings.com/how-to-play-a-sound-with-javascript/
        snds[a] = new Audio(sndPrefix + snds[a]);
    }
}

function SetupBells()
{
    var toSend = "";
    //For each sound make a bell;
    for (var a = 0; a < snds.length; a++)
    {
        toSend = toSend + "<option value = {0} >Sound {0}</option>".replace("{0}", a + "").replace("{0}",a  + 1 + "");
    }

    var bellBox = document.getElementById("bellBox");
    bellBox.innerHTML = toSend;
    bells = bellBox.getElementsByClassName("bell");

    bellBox.onchange = 
    function ()
    {
       sndIndex = bellBox.value;
       PlayCurrentSound();
    }

}

//Fires off whenever the time slider is triggered
var UpdateSliderSeconds = function()
{
    seconds = sldTime.value * 60;
    if (seconds == 0) {seconds = 30;}
    UpdateTIMEREAD();

}

var UpdateSliderVolume = function()
{
    for (var a = 0; a < snds.length; a++)
    {
        snds[a].volume = (sldVolume.value * 0.1);
        
    }

    PlayCurrentSound();
}

var UpdateTIMEREAD = function()
{
    var strSeconds = seconds % 60;
    strSeconds =  (strSeconds > 9 ? "":"0") + strSeconds
    var strMinutes = 0;
    var secondsCopy = seconds;
    while (secondsCopy >= 60)
    {
        strMinutes++;
        secondsCopy -= 60;
    }


    strMinutes = (strMinutes > 9 ? "":"0") + strMinutes;
    
    TIMEREAD.innerHTML = TIMEREAD2.innerHTML = strMinutes + ":" + strSeconds;

}

var SetupBKGS = function()
{
    var toSend = "";
    //For each sound make a bell;
    for (var a = 0; a < bkgs.length; a++)
    {
        toSend = toSend + "<option value = '{0}' >{0}</option>".replaceAll("{0}", bkgs[a]);
    }

    screenSaverBox.innerHTML = toSend;

    screenSaverBox.onchange = UpdateBKG;
}

var Engine = function()
{
    if (unpaused)
    {
        seconds--;
        if (seconds == 0)
        {
            //Time has counted down reset the clock.
            UpdateSliderSeconds();

            PlayCurrentSound();
        }

        
        UpdateTIMEREAD();

        
    }
}

var UpdateBKG = function()
{
    fsBox.style.backgroundImage = "url('"+ bkgPrefix + screenSaverBox.value + "')";
}

function PlayCurrentSound()
{
	if (sndRelease == false)
	{
		return 1;
	}
    snds[sndIndex].pause();
    snds[sndIndex].currentTime = 0;
    snds[sndIndex].play();
}
