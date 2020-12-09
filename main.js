// NITAY FEIGENBAUM, DECEMBER 2020
// GO GO SPAGHETTI CODE!!!

	const deinText = document.getElementById("dein-text");
	const titelLabel = document.getElementById("titel-label");
	const titelInput = document.getElementById("titel-input");
	const spamCont = document.getElementById("lass-mich-dir-helfen-container");

	let deinTextTimer = 0;
	let titelLabelTimer = 0;
	let titelInputTimer = 0;
	let wrongTitelCounter = 0;

	const gesamterText = "Du hast keine Kontrolle hier, sagt ihr Lächeln, sagt ihr Grinsen zwischen den Sommersprossengrübchen, sagt ihr Griff um dein Handgelenk.\nDu hast keine Kontrolle, während der Bass wummert, die Schlange vor dem Klo länger und länger wird und dein Mantel halb von deiner Schulter herabhängt."; // der Text, der am Ende dastehen soll
	const textfeld = document.getElementById('textCanvas'); // der Bereich, in dem der Text erscheint
	const textLabel = document.getElementById("text-label");
	const textTitel = document.getElementById("text-titel");
	let textfeldBuffer = ''; // bisher im Textfeld dargestellter Text. Also "was ich bisher schon geschrieben habe". Muss nach jedem keystroke ins textfeld geladen werden 
	let eingegebeneZeichen = 0; // zählt, wie oft bisher Tasten gedrückt wurden, um zu wissen, wie viele Buchstaben von textfeldBuffer da stehen müssen


function init(){
	resetPage();


	eingabeListenersHinzufügen(); // fügt einen Eventlistener hinzu, welcher die tastenpresses registriert (heißen keydown events)
	deinTextTimer = setTimeout(makeDeinTextAppear, 1000);
}

function makeDeinTextAppear() {
	deinText.style.opacity = 1;
	titelLabel.style.display = "block";	
	titelLabelTimer = setTimeout(makeTitelLabelAppear, 3000);
}

function makeTitelLabelAppear() {
	titelLabel.style.opacity = 1;
	titelInput.style.display = "block";
	titelInputTimer = setTimeout(makeTitelInputAppear, 1000);
}

function makeTitelInputAppear() {
	titelInput.style.opacity = 1;
	titelInput.focus();
}

function wrongTitelOnce() {
	titelInput.value = "";
	shakeElement(titelInput);
	titelLabel.innerHTML = "Finde einen <em>guten</em> Titel für deinen Text"
	wrongTitelCounter++;
}

function wrongTitelTwice() {
	titelInput.value = "";
	shakeElement(titelInput);
	titelLabel.innerHTML = "Nein, einen <em style=\"color:red;text-transform:uppercase;\">guten (!)</em> Titel für deinen Text"
	wrongTitelCounter++;
}

function wrongTitelThrice() {
	wrongTitelCounter++;
	setTimeout (function(){
		titelLabel.style.opacity = 0;
		setTimeout (function(){
			titelLabel.style.opacity = 1;
			titelLabel.innerHTML = "Na gut";
			setTimeout(function(){
				titelInput.value = "";
				setTimeout(function(){
					let titelInputCurrent  = "";
					let letterCounter = 0;
					const titelFinal = "LASS MICH DIR HELFEN";
					let titelInterval = setInterval(function(){
						titelInputCurrent += titelFinal[letterCounter];
						letterCounter++;
						titelInput.value = titelInputCurrent;
						if(letterCounter >= titelFinal.length) {
							clearInterval(titelInterval);
							fillScreenWithText();
						}
					}, 500); //nach debugging auf 500
				}, 1000);				
			}, 1500); // nach debugging auf 1500
		}, 3000); // nach debugging auf 3000
	}, 2000); // nach debugging auf 2000
}

function fillScreenWithText() {
	setTimeout(function(){
		spamCont.style.display = "block";

		
		spamCont.innerHTML += "<span style=\"top:" + (Math.random()*20)+20 +"%; left:" + (Math.random()*20)+20 +"%; font-size:40px; font-family:\'Oswald\'\">LASS MICH DIR HELFEN</span>";
		
		let screenCleared = false;
		let intervalAmount = 500; //nach debugging auf 500 setzen
		let spamCounter = 0;
		waitBeforeAddingNextSpan(spamCounter, intervalAmount, screenCleared);


	}, 2500); // nach debugging auf 2000 setzen
}

function addSpanToSpamCont(){
	spamCont.innerHTML += "<span style=\"top:" + (Math.random()-0.2)*125 +"%; left:" + (Math.random()-0.2)*125 +"%; font-size:" + (Math.random()*400)+40 + "px; font-family:\'Oswald\'\">LASS MICH DIR HELFEN</span>";
}

function waitBeforeAddingNextSpan(spamCounter, intervalAmount, screenCleared){ // ACHTUNG ACHTUNG REKURSIV
	if (spamCounter <= 150){
		setTimeout(function(){
			spamCounter++;
			intervalAmount *= 0.94;
			addSpanToSpamCont();
			waitBeforeAddingNextSpan(spamCounter, intervalAmount, screenCleared);
		}, intervalAmount);
	} else if (screenCleared === false){
		clearScreen();
		screenCleared = true;
	}
}

function clearScreen(){
	document.body.style.backgroundColor = "black";
	spamCont.parentNode.removeChild(spamCont);
	titelLabel.parentNode.removeChild(titelLabel);
	titelInput.parentNode.removeChild(titelInput);
	deinText.parentNode.removeChild(deinText);
	setupWritingPhase();
}

function setupWritingPhase() {
	textTitel.style.display = "block";
	setTimeout(function() {
		textTitel.style.opacity = 1;
		textLabel.style.display = "block";
		document.body.style.transition = "background-color 1s ease";
		textTitel.style.transition = "color 1s ease";
		setTimeout(function(){
			document.body.style.backgroundColor = "white";
			textTitel.style.color = "black";
			textLabel.style.top = "30px";
			textLabel.style.opacity = 1;
			textfeld.style.display = "block";
			setTimeout(function(){
				textfeld.style.opacity = 1;
				textfeld.style.top = "40px";
			}, 1000);
		}, 2000);
	}, 2000);

}

function shakeElement(element) { // WARNING: Sets position to relative in order to work!
	element.style.position = "relative";
	element.style.borderColor = "red";

	let shakeCounter = 0;
	let shakeDirection = 1; // 1 for left, -1 for right
	let shakeInterval = setInterval(function() {
		element.style.left = Math.random()*40*shakeDirection + "px";
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


function titelConfirm(event) {
	if (event.keyCode===13 && titelInput.value != ""){
		switch (wrongTitelCounter){
			case 0:
				wrongTitelOnce();
				break;
			case 1:
				wrongTitelTwice();
				break;
			case 2:
				wrongTitelThrice();
				break;
			default:
				break;
		}
	}
}


function resetPage() {
	titelInput.value = "";
	textfeld.value = "";
}





function eingabeVerarbeiten(event){ // wird aufgerufen, wenn eine Taste gedrückt wird. abhängig vom keydown event (das argument), welcher den keyCode der gedrückten Taste speichert
	textBufferBearbeiten(event);
	textUpdaten();
}

/*************************************************************************************************
***************************** eingabeVerarbeiten() - HELPERFUNKTIONEN*****************************
*************************************************************************************************/
function textBufferBearbeiten(event){
	if(tasteIstBackspace(event)){
		textLöschen();		
	} else {
		textHinzufügen();
	}
}

function tasteIstBackspace(event){
	return event.keyCode===8;// keyCode ist eine für jede Taste spezifische Nummer (z.B. backspace = 8). Das hier checkt, ob die Taste, die gedrückt wurde backspace war oder nicht
}

function textLöschen(){
	if (textIstLöschbar()) { // ist noch Text da zum löschen? Wenn nein, tue nichts
			buchstabeLöschen();
			eingegebeneZeichenReduzieren();
	}
}


function textIstLöschbar(){
	return eingegebeneZeichen > 0;
}

function buchstabeLöschen(){
	textfeldBuffer = textfeldBuffer.substr(0, textfeldBuffer.length - 1);
}

function eingegebeneZeichenReduzieren(){
	eingegebeneZeichen--;
}

function textHinzufügen(){
	if (textÜbrig()) { // Ist der gesamte Text bereits abgebildet? Oder ist noch text übrig, den man hinten dran hängen kann? Ansonsten tue nichts
			const nächsterBuchstabe = nächstenBuchstabenFinden();
			buchstabeAnhängen(nächsterBuchstabe);
			eingegebeneZeichenErhöhen();
	}
}

function textÜbrig() {
	return (eingegebeneZeichen < gesamterText.length);
}

function nächstenBuchstabenFinden() {
	return gesamterText[eingegebeneZeichen];
}

function buchstabeAnhängen(buchstabe){
	textfeldBuffer += buchstabe;
}

function eingegebeneZeichenErhöhen(){
	eingegebeneZeichen++;
}

function textUpdaten(){
	textfeld.value = textfeldBuffer;
}


/*************************************************************************************************
************************** eingabeListenerHinzufügen() - HELPERFUNKTIONEN*************************
*************************************************************************************************/

function eingabeListenersHinzufügen(){
	textfeld.addEventListener('keyup', eingabeVerarbeiten); //eingabeVerarbeiten);
	titelInput.addEventListener('keypress', titelConfirm);
}