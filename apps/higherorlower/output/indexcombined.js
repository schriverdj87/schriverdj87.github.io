"use strict";
class HigherOrLower {
    constructor() {
        this.myNumber = 0;
        this.hiddenNumber = 0;
        this.maxNumber = 9;
        this.minNumber = 1;
        this.score = 0;
        this.cpuscore = 0;
        this.maxScore = 5;
        this.guessMade = false;
        this.gameOn = true;
        this.reset();
    }
    reset() {
        this.score = this.cpuscore = 0;
        this.guessMade = false;
        this.gameOn = true;
        this.newNumbers();
    }
    newNumbers() {
        if (this.gameOn == true) {
            this.myNumber = this.randNo(this.maxNumber, this.minNumber);
            this.hiddenNumber = this.randNo(this.maxNumber, this.minNumber);
            while (this.hiddenNumber == this.myNumber) {
                this.hiddenNumber = this.randNo(this.maxNumber, this.minNumber);
            }
            if (this.score > this.maxScore / 2 || this.cpuscore > this.maxScore / 2) {
                this.gameOn = false;
            }
            return true;
        }
        return false;
    }
    guess(higher) {
        if (this.gameOn == false) {
            return false;
        }
        if (higher == true) {
            if (this.hiddenNumber > this.myNumber) {
                this.score++;
                this.newNumbers();
                return true;
            }
            else {
                this.cpuscore++;
                this.newNumbers();
                return false;
            }
        }
        if (this.hiddenNumber < this.myNumber) {
            this.score++;
            this.newNumbers();
            return true;
        }
        this.cpuscore++;
        this.newNumbers();
        return false;
    }
    randNo(max, min) {
        return Math.round((Math.random() * (max - min))) + min;
    }
    GetMyNumber() {
        return this.myNumber;
    }
    GetHiddenNumber() {
        return this.hiddenNumber;
    }
    GetScore() {
        return this.score;
    }
    GetCPUScore() {
        return this.cpuscore;
    }
    GetGameOn() {
        return this.gameOn;
    }
    won() {
        if (this.gameOn == true) {
            return false;
        }
        return this.score > this.cpuscore;
    }
}
let h1numbers;
let h3score;
let btnhigher;
let btnlower;
let btnreset;
let countdown = 0;
const countdownMax = 12;
let coreGame;
function start() {
    coreGame = new HigherOrLower();
    h1numbers = document.getElementById("h1numbers");
    btnreset = document.getElementById("btnreset");
    btnhigher = document.getElementById("btnhigher");
    btnlower = document.getElementById("btnlower");
    h3score = document.getElementById("h3score");
    btnhigher === null || btnhigher === void 0 ? void 0 : btnhigher.addEventListener('click', hlbuttonEvents);
    btnlower === null || btnlower === void 0 ? void 0 : btnlower.addEventListener('click', hlbuttonEvents);
    btnreset === null || btnreset === void 0 ? void 0 : btnreset.addEventListener('click', reset);
    setInterval(crank, 100);
    reset();
}
function reset() {
    coreGame.reset();
    updateDisplay();
    btnhigher === null || btnhigher === void 0 ? void 0 : btnhigher.removeAttribute("disabled");
    btnlower === null || btnlower === void 0 ? void 0 : btnlower.removeAttribute("disabled");
}
function updateDisplay(justscore = false) {
    if (justscore == false) {
        let myNumberstring = coreGame.GetMyNumber();
        setIfNotNull(h1numbers, myNumberstring + "&nbsp;?");
    }
    let scorestring = coreGame.GetScore();
    let cpuscorestring = coreGame.GetCPUScore();
    setIfNotNull(h3score, "✔:&nbsp" + scorestring + "&nbsp;✖:&nbsp;" + cpuscorestring);
}
function hlbuttonEvents(event) {
    let hiddenNo = coreGame.GetHiddenNumber();
    let myNo = coreGame.GetMyNumber();
    let won = coreGame.guess(event.target === btnhigher);
    setIfNotNull(h3score, won ? "RIGHT" : "WRONG");
    setIfNotNull(h1numbers, myNo + "&nbsp;" + hiddenNo);
    btnhigher === null || btnhigher === void 0 ? void 0 : btnhigher.setAttribute("disabled", '');
    btnlower === null || btnlower === void 0 ? void 0 : btnlower.setAttribute("disabled", "");
    countdown = countdownMax;
}
function crank() {
    if (countdown > 0) {
        countdown--;
        if (countdown == 0) {
            if (coreGame.GetGameOn() == false) {
                setIfNotNull(h1numbers, coreGame.won() ? "YOU WIN!" : "YOU LOSE!");
                updateDisplay(true);
            }
            else {
                btnhigher === null || btnhigher === void 0 ? void 0 : btnhigher.removeAttribute("disabled");
                btnlower === null || btnlower === void 0 ? void 0 : btnlower.removeAttribute("disabled");
                updateDisplay();
            }
        }
    }
}
function setIfNotNull(toset, text) {
    if (toset != null) {
        toset.innerHTML = text;
        return true;
    }
    return false;
}
