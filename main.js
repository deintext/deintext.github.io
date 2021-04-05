// NITAY FEIGENBAUM, APRIL 2021
// GO GO SPAGHETTI CODE

/*TODO: SOUNDDESIGN!!!!

maybe little doots? like in the beginning of decas first light



*/


//class containing basically everything. This is probably bad design, refactor later
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
        this.actualText =
            `Du hast hier die Kontrolle.
Du. Niemand sonst. Du bist der Big Boss. Du sagst, es werde Licht, und tada:
Licht.
Das soll ich direkt am Anfang erwähnen. So stehts in meinen Anweisungen: Hier, Moment, Anweisungen, Anweisungen, Anweisungen, da, Anweisungen.
1) Das Subjekt davon überzeugen, dass es die Kontrolle hat.
Wenn du also kurz angeben könntest - sagen wir auf einer Skala von ausreichend bis fanatisch - wie überzeugt du bist? Das ist wichtig für meine Service-Evaluation. Zur Inspiration kann ich dir einen der folgenden Sätze vorlesen: Dies hier ist dein Text. Alle Entscheidungen, die ab jetzt getroffen werden, gehören dir ganz allein. Lass dir ja nichts von irgendwem einreden. 
Wow! Da bin ja sogar ich überzeugt. Du triffst so oft Leute, die versuchen, dir etwas einzureden, oder? Regierungsbeauftragte und Verkehrsbeamte, Werbeplakate und Litfaßsäulen, ich sags dir: Die graue Eminenz lauert an jeder Bushaltestelle. Aber ab heute lassen wir uns nicht mehr herumschubsen. Ab heute sagen wir zu denen da oben: Nein, nein. Oder alternativ etwas rhetorisch Hochwertigeres, wenn dir da etwas einfällt.
Überzeugt? Schön, dann hake ich das mal ab. Ciao, Schritt 1, guten Morgen, Schritt 2. Mal sehen.
2) Dem Subjekt den Versuchsaufbau erklären.
Versuchsaufbau, naja. Könnten wir natürlich machen, wenn wir uns an die Regeln halten wollen. Aber unter uns, wenn du mich fragst, klingt das nach langweiligem Wissenschaftsgefasel. Kleingedruckte Zitate in Fußnoten und angeheftete Sicherheitsbrillen und Geheimhaltungsprotokolle.
Wie wärs stattdessen mit einer Geschichte? Vor langer, langer Zeit, war in meiner Grundschulklasse ein Mädchen, ein ganz gewöhnliches, nettes Mädchen. Hat gern Basketball gespielt, konnte gut singen, und auch sonst keine Anzeichen von Serienkiller. Nur im Sommer hat sie im Unterricht gern Fliegen gefangen und ihnen unterm Tisch mit einer Pinzette die Flügel ausgerissen. Nur um zu sehen, was passiert, sonst nichts. Das war ihr Ding, und da hat sich nicht von abbringen lassen. Selbst, als Frau Ebersberger die Sammlung halbtoter Fliegen ohne Flügel in ihrem Schulranzen entdeckte und die Schultherapeutin ihr erklärte, dass das den Fliegen ganz dolle wehtat. Sie hat einfach weitergemacht. Sie war neugierig, und sie wollte wissen, wo Fliegen ohne ihre Flügel enden.
Glaubst du an Gott? Komische Frage, tut mir Leid, tut mir Leid. Aber manchmal denke ich – nicht lachen jetzt - die Erde ist nichts weiter als ein Drittklass-Bastelprojekt, ein rundes Gesteinsorigami ohne wirkliches Ziel. Gott wollte einfach mal gucken, was Menschen so machen, wenn man sie auf einem Planeten allein lässt. Und deswegen auch das mit dem Leid und dem freiem Willen und dem Nicht-Eingreifen trotz allmächtiger Barmherzigkeit, ne, Gott fand es einfach spannend, zu sehen, wie wir allein zurechtkommen. Bis das irgendwann langweilig wurde, und Gott sich stattdessen Weltraum-Videospiele entdeckte. Und während wir hier sehnlich auf die Wiederkunft einer Schöpferfigur warten, sitzt Gott mittlerweile in der Uni und studiert Hyper-BWL, hat uns komplett vergessen, und die Erde steht aus sentimentalen Gründen irgendwo verstaubt auf dem Dachboden von Gotts Eltern.
An der HU Berlin gab es vor ein paar Jahren diese Reihe von Experimenten, um herauszufinden, ob Haustiere gern verstecken spielen. Einer Gruppe Ratten wurden Elektroden in den Kopf getackert. Nach ein paar Tagen im Gehege wurden die Ratten dann allesamt der Länge nach aufgeschnitten, um ihre Gehirnareale in Einzelteile zu zerlegen. Ergebnisse wurden analysiert, Hypothesen bestätigt, Peer-Reviews eingeholt. Es gab Dankesreden und Veröffentlichungen in Wissenschaftsmagazinen. Keine Krebs-Heilung, keine erneuerbaren Solarzellen, keine Marskolonie. Ein paar Leute mit Doktortiteln wollten sehen, ob ihr Wauwau sich absichtlich hinterm Sofa verkriecht.
Ich weiß, was du jetzt denkst. Was ist mit der Ratte? Der Ratte bringen all diese wissenschaftlichen Erkenntnisse ja gar nichts. Der Ratte ist es scheißegal, ob Haustiere sich gern verstecken. Die Ratte ist dann nämlich tot.
Warum fragt niemand die Ratte um Erlaubnis? 
Wir nutzen die Ratte aus. Wir belügen und betrügen sie für unsere Tests. Die Ratte darf nichts von dem Experiment ahnen, sonst sind die Ergebnisse verfälscht. Sie muss alles, was sie tut, freiwillig tun. Sie muss überzeugt sein, ihre eigenen Entscheidungen zu treffen.
Das passt jetzt vielleicht nicht ganz und führt sowieso alles ein wenig weg von unserem Versuchsaufbau, tut mir Leid. Ich soll dir das eigentlich nicht verraten, aber du bist hier nicht die Ratte. Unsere Ratte heißt Bob, und Bob stirbt am Ende.
Ja, und zwar deinetwegen.
Ups, Spoiler Alarm. Tut mir nochmal Leid.
Warum erzähle ich dir das alles? Du kennst Bob noch nicht einmal, und jetzt musst du schon mit deinem Gewissen vereinbaren, Bob umgebracht zu haben.
Hier kommt der Twist: Du kannst Bob retten. Du kannst beweisen, dass du besser bist als all die flügelausreißenden, gehirnsezierenden Monster da draußen. Alles, was du tun musst, ist jetzt aufzuhören, diesen Text zu schreiben, jetzt, in diesem Moment. Du ziehst die Reißleine, und wird es Bob niemals geben.
Was uns zu Schritt 3 führt.
3) Dem Subjekt die Verantwortung übergeben.
Da hast dus. Das hier ist deine letzte Warnung. Wir hatten unseren Spaß, unsere kleinen Spielchen. Alles, was ab jetzt passiert, passiert auf deinetwegen.
Du hast hier die Kontrolle.

Bob hatte einen neuen Lieblingswitz. Im Bus nach Hause hatte er gehört wie ein Teenager ihn seinen Freunden erzählte, direkt im Vierersitz am Eingang. Bob war eine Station länger sitzengeblieben, um die Pointe zu hören, und als sie kam, musste er sich den Mund mit beiden Händen zuhalten, um nicht hysterisch loszukreischen. Die Frau auf dem Sitz neben ihm hatte die Nase gerümpft und war aufgestanden, um auszusteigen. Bob war eine weitere Haltestelle sitzengeblieben, um ja nicht denselben Heimweg wie die Frau zu haben.
Die Abkürzung durch den Park und danach über die Brücke zurück auf die Straße. Während Bob durch an Einfamilienreihenhäusern entlanglief, wiederholte er den Witz immer wieder in seinem Kopf. Die Leute auf dem Bürgersteig drehten sich nach ihm um, auch wenn er versuchte, möglichst leise in seinen Schal hineinkicherte. Er konnte es kaum erwarten, den Witz morgen im Büro zu erzählen.
Zuhause angekommen hängte er Jacke, Schal und Aktenkoffer an den Haken, fand Rudi in der Küche, füllte den Fressnapf und zwang sich, erst abzuwarten, bis der Hund aufgegessen hatte. Mit der Ferse trippelnd stand Bob da und sah Rudi beim Aufschlecken der Schüssel zu. Mit jedem Biss drohte der Witz aus ihm herauszuplatzen. Als der Napf fast leer war, konnte er es nicht mehr aushalten. Bereits beim zweiten Satz musste Bob so heftig lachen, dass er kein Wort mehr hervorbrachte. Aus den Augenwinkeln sah ihn Rudi an, die Schnauze immer noch im Schälchen versenkt, der Schwanz hin- und herwedelnd wie ein Scheibenwischer. Bob stand da und krümmte sich vor Lachen, der Kopf hochrot, die Augen feucht mit Tränen. Nach Atem ringend kämpfte er sich bis zum letzten Satz durch, und ließ sich dann auf den Küchenstuhl plumpsen.
Rudi hechelte ihm entgegen, sprang an seinem Bein hoch und schleckte ihm übers Gesicht. Bob schob ihn weg, wischte sich mit dem Ärmel über die Backen, spürte die letzte glucksenden Nachbeben langsam im Brustkorb verebben. Seine Grübchen taten weh. So einen guten Witz hatte er schon lang nicht mehr gehört. Die Leute im Büro morgen würden wahnsinnig werden. Sie würden vom Stuhl fallen und sich auf dem Boden kugeln und Bob würde ihn nochmal erzählen und nochmal, ab morgen jede Mittagspause, und in der Kaffeeküche und am Wasserspender, die Leute würden sich um ihn versammeln, bitte erzähl den Witz nochmal, Bob, noch einmal, bitte, und sie würden ihn alle angucken, erwartungsvolle Gesichter, glänzende Äuglein, und niemand würde ihn mehr unterbrechen und an seinem nächsten Geburtstag würden sie ihm eine Kaffeetasse „bester Witzerzähler #1“ schenken und auf einem Stuhl durchs Büro tragen.
Bob stemmte sich vom Stuhl auf, nahm einen Schluck Wasser, einem abenteuerlichen Impuls nachgehend direkt aus dem Wasserhahn, und begann dann erneut, Rudi den Witz zu erzählen. Diesmal schaffte er es fast bis zur Hälfte, bevor der Lachanfall ihn zurück in den Stuhl zwang. Rudi sah ihn aus feuchten Hundeaugen an, kratzte sich mit einer Pfote am Ohr. Der Hund war ein hartes Publikum, aber auch ihn würde Bob zum Lachen bringen. Er setzte neu an, schaffte es fast bis zum Ende, setzte neu an, stand auf, schmierte sich ein Mayonnaise-Sandwich, setzte neu an, die Kolleg*innen in ihrer Mittagspause mit ihren Chai-Latte-Smoothies klatschten, jubelten, luden ihn auf einen Kaffee ein, er setzte neu an. Nach jeder erfolgreichen Pointe kamen mehr Leute an den Tisch, das gesamte Büro rief seinen Namen, nochmal, Bob, nochmal! Michael Kalmers trug ihn Huckepack durch die Cafeteria, nochmal, Birgit Samse schüttelte ihm kopfnickend die Hand, das haben Sie gut gemacht, Bob, ich bin stolz auf Sie, Frau Peters trat aus ihrem Büro und hängte ihm einen Weihnachtskranz um den Hals. Bob grinste, lächelte in die Kameras, winkte der Gehaltserhöhung zu. Er änderte hier und da ein Wort, fügte Kunstpausen hinzu, ließ die Leute zappeln, mehr, Bob, mehr, verstellte Stimme, Krawatte und Verkleidung, Akrobatiknummer mit Überraschungsgästen und anschließendem Interview. Die unterhaltsamste Show, die die Industrie jemals erlebt hatte. Leute aus allen möglichen Tochterfirmen kamen von nah und fern, um den Maestro live mitzuerleben. Ein Ereignis, von dem man noch seinen Enkelkindern erzählen würde. Jeder Moment ein Meisterwerk. Man hätte ihn einrahmen und auf Benefizgalen versteigern können. Bob kannte jede Woge der Sprache. Mit jeder Ebbe, mit jeder Flut wankten die Menschen um ihn herum, konnten kaum noch stehen, fielen übereinander, die Welt zerschmolz, die Decke brach auf, und inmitten all dessen tanzte Großmeister Bob durch die Massen, grazil wie ein Eiskunstläufer, charmant wie ein Eiskunstläufer, eloquent wie ein Eiskunstläufer.

Unter Rudis strengem Blick übte er die Kunst des Witzes bis spät in den Abend hinein. Um Acht ging er erschöpft Zähne putzen und ließ sich ins Bett fallen.
Am nächsten Morgen erwachte Bob drei Minuten vor dem Weckerklingeln. Er gratulierte sich selbst und nahm sich vor, morgen vier Minuten zu schaffen, jeden Tag ein bisschen besser. Beim Frühstück setzte er die Müslitüte auf den Stuhl gegenüber und die Milchpackung ans Tischende. Er hatte ein wenig Lampenfieber, den Witz vor einem anderen Publikum als Rudi zu erzählen, aber bereits nach den ersten paar Sätzen knickte die Müslitüte um, die Milchpackung wackelte leicht mit, Rudi bellte zufrieden den Tisch an. Und Bob hob ab. Nächste Station: Cafeteria.
Er nahm Jacke, Schal und Aktenkoffer von der Kommode, winkte Rudi zum Abschied zu, trat aus der Haustür auf die Straße und wurde von einem LKW überfahren.`
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
            credits.textContent = 'Text, Sound & Programming';

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