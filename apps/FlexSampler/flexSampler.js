				"use strict";
			var $ = function (getme)
			{
				return document.getElementById(getme);
				
				
			}
			
			window.onload = function()
			{
				//doBTN();
				resetDocument();
				$("btnAnon").onclick = addAnon;
				$("btnRonald").onclick = addRonald;
				$("btnReset").onclick = resetDocument;
				
				$("sltDirection").onchange = flexIt;
				$("ronaldOrder").onchange = flexIt;
				$("anonOrder").onchange = flexIt;
				
				$("ronaldGrow").onchange = flexIt;
				$("anonGrow").onchange = flexIt;
				$("sltWrap").onchange = flexIt;
				$("sltJContent").onchange = flexIt;
				$("sltItemAlign").onchange = flexIt;
				$("sltAlignContent").onchange = flexIt;
				
				$("anonBasis").onchange = flexIt;
				$("anonBasisAuto").onchange = flexIt;
				
				$("ronaldBasis").onchange = flexIt;
				$("ronaldBasisAuto").onchange = flexIt;
				
				$("anonSelf").onchange = flexIt;
				$("ronaldSelf").onchange = flexIt;
				
				
				
			}
			
			var addAnon = function()
			{
				var toAdd = document.createElement("div");
				toAdd.setAttribute("class","anon");
				toAdd.innerHTML = "<img src = 'img/anon.png'>";
				toAdd.onclick = function (){this.parentNode.removeChild(this);}
				$("divFlex").appendChild(toAdd);
				flexIt();
			}
			
			var addRonald = function()
			{
				var toAdd = document.createElement("div");
				toAdd.setAttribute("class","ronald");
				toAdd.innerHTML = "<img src = 'img/ronald.png'>";
				toAdd.onclick = function (){this.parentNode.removeChild(this);}
				$("divFlex").appendChild(toAdd);
				flexIt();
			}
			
			
			
			var killMe = function()
			{
				
				this.parentNode.removeChild(this);
				
			}
			
			var resetDocument = function()
			{
				document.getElementsByTagName("form")[0].reset();
				$("divFlex").innerHTML = "";
				$("ronaldBasis").disabled = true;
				$("anonBasis").disabled = true;
				
				
				
				addAnon();addAnon();addRonald(); addAnon();
			}
			
			var flexIt = function()
			{
				var ronalds = $("divFlex").getElementsByClassName("ronald");
				var anons = $("divFlex").getElementsByClassName("anon");
				$("divFlex").style.flexDirection = $("sltDirection").value;
				$("divFlex").style.flexWrap = $("sltWrap").value;
				$("divFlex").style.justifyContent = $("sltJContent").value;
				$("divFlex").style.alignItems = $("sltItemAlign").value;
				$("divFlex").style.alignContent = $("sltAlignContent").value;
				
				for (var r = 0; r < ronalds.length; r++)
				{
					ronalds[r].style.order = $("ronaldOrder").value;
					ronalds[r].style.flexGrow = $("ronaldGrow").value;
					ronalds[r].style.flexShrink = $("ronaldShrink").value;
					ronalds[r].style.alignSelf = $("ronaldSelf").value;
					
					if ($("ronaldBasisAuto").checked)
					{
						ronalds[r].style.flexBasis = "auto";
						$("ronaldBasis").disabled = true;
					}
					else
					{
						if ($("ronaldBasis").disabled == true){$("ronaldBasis").disabled = false;}
						else
						{
						ronalds[r].style.flexBasis = $("ronaldBasis").value + "em";
						}
					}
					
				}
				
				for (var a = 0; a < anons.length; a++)
				{
					anons[a].style.order = $("anonOrder").value;
					anons[a].style.flexGrow = $("anonGrow").value;
					anons[a].style.flexShrink = $("anonShrink").value;
					anons[a].style.alignSelf = $("anonSelf").value;
					
					if ($("anonBasisAuto").checked)
					{
						anons[a].style.flexBasis = "auto";
						$("anonBasis").disabled = true;
					}
					else
					{
						if ($("anonBasis").disabled == true){$("anonBasis").disabled = false;}
						else
						{
						anons[a].style.flexBasis = $("anonBasis").value + "em";
						}
					}
					
				}
				
			}
			/*
			var doBTN = function()
			{
				//Get everything in the flexbox div
				var inFB = $("divFlex").getElementsByTagName("div");
				
			
				
				var anons = [];
				var ronald = "";
				for (var a = 0; a < inFB.length; a++)
				{
					if (inFB[a].className == "ronald")
					{
						ronald = inFB[a];
					}
					else
					{
						anons[anons.length] = inFB[a];
					}
				}

				$("divFlex").style.flexDirection = $("sltDirection").value;
				ronald.style.order = $("orderNo").value;
				
				ronald.style.flexGrow = parseFloat($("ronaldGrow").value);
				
				var anonGrow = parseFloat($("anonGrow").value);
				
				for (var b = 0; b < anons.length; b++)
				{
					anons[b].style.flexGrow = anonGrow;
				}
				
				$("divFlex").style.flexWrap = $("sltWrap").value;
				
			}
			*/
		