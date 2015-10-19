var session = new QiSession();
var userSymbol = "Symbol not set.";

$(document).ready(function(){
	//Load(true);
}); // end $(document).ready(function(){

function assignSymbol(value){
	userSymbol = value;

	//----Junry----Send signal to the choregraphe of the user symbol choose---//
	session.service("ALMemory").done(function (ALMemory) {
		ALMemory.raiseEvent("TicTacToe/UserSymbol", userSymbol);
	});
	//---Junry---end-------//

	//Load(false);
}
//----Junry----Function that start the Game---//
function startGame(){
	session.service("ALMemory").done(function (ALMemory) {
		ALMemory.raiseEvent("TicTacToe/startGame", userSymbol);
	});
}
//----Junry----Function that exit the Game---//
function exit(){
	session.service("ALMemory").done(function (ALMemory) {
		ALMemory.raiseEvent("TicTacToe/exit", userSymbol);
	});
}

//----Junry----Function to change the page---//
function changePage(page) {
	window.top.location.href= page; //change the frame
}

function pepperPlot(value){
	var pepperSymbol = "";
	if(userSymbol != "X")
	{
		pepperSymbol = "X";
		$("#"+value).find("#back").css("background-color", "#FF6666");
	}
	else{
		pepperSymbol = "O";
		$("#"+value).find("#back").css("background-color", "#99CCFF");
	}
	$("#"+value).find("#back").html('<img style="padding: 0.5em;" src="images/'+ pepperSymbol +'.png">');
	flipCard(document.getElementById(value).classList);
}

function showWinner(value){
	alert(value);
}

// QiMessaging

function startSubscribe() {
	session.service("ALMemory").done(function (ALMemory) {
		// ALMemory.subscriber("TicTacToe/UserSymbol").done(function(subscriber) {
		// 	subscriber.signal.connect(assignSymbol);
		// });
		ALMemory.subscriber("TicTacToe/PepperPlot").done(function(subscriber) {
			subscriber.signal.connect(pepperPlot);
		});
		ALMemory.subscriber("TicTacToe/Winner").done(function(subscriber) {
			subscriber.signal.connect(showWinner);
		});
	});
}

function endTurn(message) {
	session.service("ALMemory").done(function (ALMemory) {
		ALMemory.raiseEvent("TicTacToe/UserFinishTurn", message);
	});
}

// end of QiMessaging

function flipCard(c){
	if(c.contains("flipped") != true){
		c.add("flipped");
	}
}

function plotUser(x){
	if(userSymbol == "X")
	{
		$(x).find("#back").css("background-color", "#FF6666");
	}
	else{
		$(x).find("#back").css("background-color", "#99CCFF");
	}
	$(x).find("#back").html('<img style="padding: 0.5em;" src="images/'+ userSymbol +'.png">');
	endTurn(x.id);
}

function Load(bool){
	if (bool) {
		$.blockUI({
			message: '<div height: 100px; ><div style="font-size: 25px; padding: 1.5em;">Please Wait...</div></div>',
			css: { border: '2px solid #B8B8B8 ', cursor: 'wait', backgroundColor: '#FFFFFF' },
			overlayCSS: { backgroundColor: '#000000', opacity: 0.5, cursor: 'wait' }
		});
	} 
	else {
		$.unblockUI();
	}
}