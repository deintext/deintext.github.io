// NITAY FEIGENBAUM, DECEMBER 2020
// GO GO SPAGHETTI CODE!!!

//TODO: SOUNDDESIGN!!!!
// maybe little doots? like in the beginning of decas first light


//class containing basically everything

class InteractiveText {

    constructor(container_id) {
        this.parentID = container_id;
        this.parentDiv = document.getElementById(container_id);

        this.deinTextHeading = document.getElementById("dein-text-heading");
        this.titleLabel = document.getElementById("title-label");
        this.titleInput = document.getElementById("title-input");
        //this.spamCont = document.getElementById("lass-mich-dir-helfen-container");
        this.textDisplay = document.getElementById('textCanvas'); // der Bereich, in dem der Text erscheint
        this.textLabel = document.getElementById("text-label");
        this.textTitle = document.getElementById("text-title");
        this.loadingBarCont = document.getElementById("loading-bar-cont");
        this.loadingBar = document.getElementById("loading-bar");

        this.actualText = "";
        this.textDisplayBuffer = ""; // bisher im textDisplay dargestellter Text. Also "was ich bisher schon geschrieben habe". Muss nach jedem keystroke ins textDisplay geladen werden 
        this.displayedCharsCounter = 0; // zählt, wie oft bisher Tasten gedrückt wurden, um zu wissen, wie viele Buchstaben von textDisplayBuffer da stehen müssen
        this.textLoaded = false;

        this.sounds = [];
        this.soundsToLoadCounter = 0;
        this.soundsLoadedCounter = 0;

        this.wrongTitleCounter = 0;

        this.init();
    }

    init = () => {
        this.resetPage();
        this.loadActualText();
        this.loadSounds();
        //introRiser.play();
        this.addInputListener(); // adds listener waiting for keypresses in the textarea element
    }

    loadActualText = () => {
        this.actualText = "Du hast keine Kontrolle hier, sagt ihr Lächeln, sagt ihr Grinsen zwischen den Sommersprossengrübchen, sagt ihr Griff um dein Handgelenk.\nDu hast keine Kontrolle, während der Bass wummert, die Schlange vor dem Klo länger und länger wird und dein Mantel halb von deiner Schulter herabhängt."; // der Text, der am Ende dastehen soll
        this.textLoaded = true;
    }

    loadSounds = () => {
        this.loadSoundFile("audio/intro_riser_alt.wav", false, false, 1);
        this.loadSoundFile("audio/intro_arp_loop.wav", false, true, 1);
        this.loadSoundFile("audio/first_wrong_arp.wav", false, false, 0);
        this.loadSoundFile("audio/first_wrong_arp_loop.wav", false, true, 0);
    }

    loadSoundFile = (soundURL, autoplayEnabled, isLoop, vol) => {
        this.soundsToLoadCounter++;

        const soundFile = new Howl({
            src: [soundURL],
            autoplay: autoplayEnabled,
            loop: isLoop,
            volume: vol
        });

        soundFile.on("load", () => {
            this.soundsLoadedCounter++;
            this.loadIfReady();
            console.log(this.soundsLoadedCounter + "/" + this.soundsToLoadCounter + ", " + soundURL);
        })

        this.sounds.push(soundFile);
    }

    loadIfReady = () => {
        const loadPercent = (this.soundsLoadedCounter / this.soundsToLoadCounter) * 100;
        this.loadingBar.style.width = loadPercent + "%";

        if (this.soundsLoadedCounter >= this.soundsToLoadCounter && this.textLoaded) {
            const startText = document.createElement('span');
            startText.textContent = "START";
            startText.classList.add('start-text');
            this.loadingBar.appendChild(startText);

            this.loadingBarCont.style.cursor = "pointer";

            const credits = document.createElement('p');
            credits.classList.add('credits');
            credits.textContent = 'SOUND, TEXT & PROGRAMMING';

            const creditsName = document.createElement('p');
            creditsName.classList.add('credits');
            creditsName.id = ('credits-name');
            creditsName.textContent = 'NITAY FEIGENBAUM';

            document.body.appendChild(credits);
            document.body.appendChild(creditsName);

            this.loadingBarCont.addEventListener("click", this.makeDeinTextAppear);
        }
    }

    makeDeinTextAppear = () => {
        const credits = document.getElementsByClassName('credits');
        for (let i = credits.length - 1; i >= 0; i--) {
            credits[i].style.opacity = 0;
        }



        this.loadingBarCont.removeEventListener("click", this.makeDeinTextAppear);
        this.loadingBarCont.style.opacity = 0;
        setTimeout(() => {
            this.loadingBarCont.parentNode.removeChild(this.loadingBarCont);
            for (let i = credits.length - 1; i >= 0; i--) {
                credits[i].parentElement.removeChild(credits[i]);
            }
        }, 1000);
        this.sounds[0].play();
        setTimeout(() => {
            this.sounds[1].play();
            this.deinTextHeading.style.display = "block";
            this.deinTextHeading.style.opacity = 1;
            this.titleLabel.style.display = "block";
            setTimeout(this.maketitleLabelAppear, 3000);
        }, 2000);
    }

    maketitleLabelAppear = () => {
        this.titleLabel.style.opacity = 1;
        this.titleInput.style.display = "block";
        setTimeout(this.maketitleInputAppear, 1000);
    }

    maketitleInputAppear = () => {
        this.titleInput.style.opacity = 1;
        this.titleInput.focus();
    }

    wrongtitleOnce = () => {
        /*firstWrongArp.play();
        firstWrongArp.fade(0, 1, 1000);
        setTimeout(function(){
        	firstWrongArpLoop.play();
        	firstWrongArpLoop.fade(0, 1, 1000);

        	firstWrongArp.fade(1, 0, 1000);
        	firstWrongArp.on('fade', function(){firstWrongArp.stop();});

        	introLoop.fade(0, 1, 1000);
        	introLoop.on('fade', function(){introLoop.stop();});
        }, 5000)*/
        this.titleInput.value = "";
        this.shakeElement(this.titleInput);
        this.titleLabel.innerHTML = "Finde einen <em>guten</em> Titel für deinen Text"
        this.wrongTitleCounter++;
    }

    wrongtitleTwice = () => {
        this.titleInput.value = "";
        this.shakeElement(this.titleInput);
        this.titleLabel.innerHTML = "Nein, einen <em style=\"color:red;text-transform:uppercase;\">guten (!)</em> Titel für deinen Text"
        this.wrongTitleCounter++;
    }

    wrongtitleThrice = () => {
        this.wrongTitleCounter++;
        setTimeout(() => {
            this.titleLabel.style.opacity = 0;
            setTimeout(() => {
                this.titleLabel.style.opacity = 1;
                this.titleLabel.innerHTML = "Na gut";
                setTimeout(() => {
                    this.titleInput.value = "";
                    setTimeout(() => {
                        let titleInputCurrent = "";
                        let letterCounter = 0;
                        const titleFinal = "LASS MICH DIR HELFEN";
                        let titleInterval = setInterval(() => {
                            titleInputCurrent += titleFinal[letterCounter];
                            letterCounter++;
                            this.titleInput.value = titleInputCurrent;
                            if (letterCounter >= titleFinal.length) {
                                clearInterval(titleInterval);
                                this.fillScreenWithText();
                            }
                        }, 100); //nach debugging auf 500
                    }, 100);
                }, 150); // nach debugging auf 1500
            }, 300); // nach debugging auf 3000
        }, 200); // nach debugging auf 2000
    }

    fillScreenWithText = () => {
        setTimeout(() => {
            this.spamCont = document.createElement('canvas');
            this.spamCont.classList.add('spam-container');
            this.spamCont.setAttribute('width', window.innerWidth);
            this.spamCont.setAttribute('height', window.innerHeight);

            document.body.appendChild(this.spamCont);

            const ctx = this.spamCont.getContext('2d');
            ctx.font = '40px Oswald, sans-serif';
            ctx.fillText("LASS MICH DIR HELFEN", (Math.floor((Math.random() * 20) + 20) * 0.01 * window.innerWidth), (Math.floor((Math.random() * 20) + 20) * 0.01 * window.innerHeight)); // this.spamCont.style.display = "block";
            // this.spamCont.innerHTML += "<span style=\"top:" + (Math.random() * 20) + 20 + "%; left:" + (Math.random() * 20) + 20 + "%; font-size:40px; font-family:\'Oswald\'\">LASS MICH DIR HELFEN</span>";

            let screenCleared = false;
            let intervalAmount = 100; //nach debugging auf 500 setzen
            let spamCounter = 0;
            this.waitBeforeAddingNextSpan(spamCounter, intervalAmount, screenCleared, ctx);


        }, 500); // nach debugging auf 2000 setzen
    }

    addSpanToSpamCont = (ctx) => {
        ctx.font = (Math.random() * 400) + 40 + 'px Oswald, sans-serif';
        ctx.fillText("LASS MICH DIR HELFEN", (Math.random() - 0.2) * window.innerWidth, (Math.random() - 0.2) * 1.4 * window.innerHeight);
        //this.spamCont.innerHTML += "<span style=\"top:" + (Math.random() - 0.2) * 125 + "%; left:" + (Math.random() - 0.2) * 125 + "%; font-size:" + (Math.random() * 400) + 40 + "px; font-family:\'Oswald\'\">LASS MICH DIR HELFEN</span>";
    }

    waitBeforeAddingNextSpan = (spamCounter, intervalAmount, screenCleared, ctx) => { // ACHTUNG ACHTUNG REKURSIV
        if (spamCounter <= 200) {
            setTimeout(() => {
                spamCounter++;
                intervalAmount *= 0.94;
                this.addSpanToSpamCont(ctx);
                this.waitBeforeAddingNextSpan(spamCounter, intervalAmount, screenCleared, ctx);
            }, intervalAmount);
        } else if (screenCleared === false) {
            this.clearScreen();
            screenCleared = true;
        }
    }

    clearScreen = () => {
        document.body.style.backgroundColor = "black";
        this.spamCont.parentNode.removeChild(this.spamCont);
        this.titleLabel.parentNode.removeChild(this.titleLabel);
        this.titleInput.parentNode.removeChild(this.titleInput);
        this.deinTextHeading.parentNode.removeChild(this.deinTextHeading);
        this.setupWritingPhase();
    }

    setupWritingPhase = () => {
        this.textTitle.style.display = "block";
        setTimeout(() => {
            this.textTitle.style.opacity = 1;
            this.textLabel.style.display = "block";
            document.body.style.transition = "background-color 1s ease";
            this.textTitle.style.transition = "color 1s ease";
            setTimeout(() => {
                document.body.style.backgroundColor = "white";
                this.textTitle.style.color = "black";
                this.textLabel.style.top = "30px";
                this.textLabel.style.opacity = 1;
                this.textDisplay.style.display = "block";
                setTimeout(() => {
                    this.textDisplay.style.opacity = 1;
                    this.textDisplay.style.top = "40px";
                }, 1000);
            }, 2000);
        }, 2000);

    }

    shakeElement = (element) => { // WARNING: Sets position to relative in order to work!
        element.style.position = "relative";
        element.style.borderColor = "red";

        let shakeCounter = 0;
        let shakeDirection = 1; // 1 for left, -1 for right
        let shakeInterval = setInterval(() => {
                element.style.left = Math.random() * 40 * shakeDirection + "px";
                shakeDirection *= -1;
                shakeCounter++;
                if (shakeCounter >= 10) {
                    clearInterval(shakeInterval);
                    element.style.left = "auto";
                    element.style.borderColor = "black";
                }
            },
            20);
    }


    titleConfirm = (event) => {
        if (event.keyCode === 13 && this.titleInput.value != "") {
            switch (this.wrongTitleCounter) {
                case 0:
                    this.wrongtitleOnce();
                    break;
                case 1:
                    this.wrongtitleTwice();
                    break;
                case 2:
                    this.wrongtitleThrice();
                    break;
                default:
                    break;
            }
        }
    }


    resetPage = () => {
        this.titleInput.value = "";
        this.textDisplay.value = "";
    }





    eingabeVerarbeiten = (event) => { // wird aufgerufen, wenn eine Taste gedrückt wird. abhängig vom keydown event (das argument), welcher den keyCode der gedrückten Taste speichert
        this.textBufferBearbeiten(event);
        this.textUpdaten();
    }

    /*************************************************************************************************
     ***************************** eingabeVerarbeiten() - HELPERFUNKTIONEN*****************************
     *************************************************************************************************/
    textBufferBearbeiten = (event) => {
        if (this.tasteIstBackspace(event)) {
            this.textLöschen();
        } else {
            this.textHinzufügen();
        }
    }

    tasteIstBackspace = (event) => {
        return event.keyCode === 8; // keyCode ist eine für jede Taste spezifische Nummer (z.B. backspace = 8). Das hier checkt, ob die Taste, die gedrückt wurde backspace war oder nicht
    }

    textLöschen = () => {
        if (this.textIstLöschbar()) { // ist noch Text da zum löschen? Wenn nein, tue nichts
            this.buchstabeLöschen();
            this.displayedCharsCounterReduzieren();
        }
    }


    textIstLöschbar = () => {
        return this.displayedCharsCounter > 0;
    }

    buchstabeLöschen = () => {
        this.textDisplayBuffer = this.textDisplayBuffer.substr(0, this.textDisplayBuffer.length - 1);
    }

    displayedCharsCounterReduzieren = () => {
        this.displayedCharsCounter--;
    }

    textHinzufügen = () => {
        if (this.textÜbrig()) { // Ist der gesamte Text bereits abgebildet? Oder ist noch text übrig, den man hinten dran hängen kann? Ansonsten tue nichts
            const nächsterBuchstabe = this.nächstenBuchstabenFinden();
            this.buchstabeAnhängen(nächsterBuchstabe);
            this.displayedCharsCounterErhöhen();
        }
    }

    textÜbrig = () => {
        return (this.displayedCharsCounter < this.actualText.length);
    }

    nächstenBuchstabenFinden = () => {
        return this.actualText[this.displayedCharsCounter];
    }

    buchstabeAnhängen = (buchstabe) => {
        this.textDisplayBuffer += buchstabe;
    }

    displayedCharsCounterErhöhen = () => {
        this.displayedCharsCounter++;
    }

    textUpdaten = () => {
        this.textDisplay.value = this.textDisplayBuffer;
    }


    /*************************************************************************************************
     ************************** eingabeListenerHinzufügen() - HELPERFUNKTIONEN*************************
     *************************************************************************************************/

    addInputListener = () => {
        this.textDisplay.addEventListener('keyup', this.eingabeVerarbeiten); //eingabeVerarbeiten);
        this.titleInput.addEventListener('keypress', this.titleConfirm);
    }
}








// main code goes here
const begin = () => {
    let deinText = new InteractiveText(document.body);
}