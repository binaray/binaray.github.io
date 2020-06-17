'use strict'
//Watson Speech Reference: https://github.com/watson-developer-cloud/speech-javascript-sdk
//------------------------------------------------------------------
//TODOs: 
//-Handle page errors for api calls
//-Bot message "is typing" loader
//------------------------------------------------------------------

//logging shorthand: call log(str);
let log = console.log.bind(console);

//UI variables; change these if you don't like what you see ;)
const options_disabled_color = "#fff";
const options_enabled_color = "#bcbdc0";

//-------------------Speech to text vars and functions-------------------//
//Speech to text token
let stttoken;
let isRecording = false;
let stream;

function setupStTSession(){
	//Retrieve token first
	$.get("/careercoach/ajax/watsontoken.php", {token_param: "stt"},function(data) {
		stttoken=data;
		//log("stttoken: "+stttoken);
		
		$('#voice_button').click(function (e) {
			if (!isRecording){
				stream = WatsonSpeech.SpeechToText.recognizeMicrophone({
					token: stttoken,
					object_mode: false
				});
				
				stream.setEncoding('utf8'); // get text instead of Buffers for on data events
				stream.on('data', function(data) {
					//condition to stop callback data if not recording
					if (isRecording) {
						$(".message_input").val(data);
						processMessage();
					}
				});
				
				stream.on('error', function(err) {
					log(err);
				});
				
				$("#voice_button").css("background-color", options_enabled_color);
				$("#mic_icon").css("color", options_disabled_color);
				$("#mic_icon").text("mic");
				isRecording=true;
				
			}
			else{
				stream.stop.bind(stream);
				stream.stop();
				$("#voice_button").removeAttr('style');
				$("#mic_icon").removeAttr('style');
				$("#mic_icon").text("mic_off");
				isRecording=false;
			}
		});
		
	}, "text");
}

//-------------------Text to Speech vars and functions-------------------//
//Text to speech token
let ttstoken;
let ttsEnabled = false;

function setupTtSSession(){
	//Retrieve tts token
	$.get("/careercoach/ajax/watsontoken.php", {token_param: "tts"},function(data) {
		ttstoken=data;
		//log("ttstoken: "+ttstoken);
		showLoadingScreen(false);
	}, "text");
}

function convertToSpeech(text){
	WatsonSpeech.TextToSpeech.synthesize({
		text: text,
		voice: "en-GB_KateVoice",
		token: ttstoken,
		autoPlay: true
	}).on('error', function(err) {
		log('audio error: ', err);
	});
}

function toggleTtS(){
	if (ttsEnabled){
		$("#sound_icon").text("volume_off");
		$("#sound_button").removeAttr('style');
		$("#sound_icon").removeAttr('style');
		ttsEnabled=false;
	}
	else{
		$("#sound_icon").text("volume_up");
		$("#sound_button").css("background-color", options_enabled_color);
		$("#sound_icon").css("color", options_disabled_color);
		ttsEnabled=true;
	}
}

//-------------------Chat vars and functions-------------------//
//"Class" for Message Bubble
let Message = function (arg) {
	this.text = arg.text, this.message_side = arg.message_side;
	this.draw = function (_this) {
		return function () {
			var $message;
			$message = $($(".message_template").clone().html());
			$message.addClass(_this.message_side).find(".text").html(_this.text);
			$(".messages").append($message);
			return setTimeout(function () {
				return $message.addClass("appeared");
			}, 0);
		};
	}(this);
	return this;
};

//Get text value and clear input field
function getMessageText() {
	var message_text = $(".message_input").val();
	$(".message_input").val("");
	return message_text;
}

//creates left or right message box
function sendMessage(text,message_side = "right",action,param) {
	var $messages, message;
	$messages = $(".messages");
	message = new Message({
		text: text,
		message_side: message_side
	});
	message.draw();
	$messages.animate({ scrollTop: $messages.prop("scrollHeight") }, 300, function() {
		if(action){
			switch(action){
				case "url":
					if (confirm('Alice wants to share a resource with you!')) {
						$.get("/careercoach/ajax/updatevars.php", {resource: param},function(res){
							log(res);
						}, "text");
						window.open(param,'_blank');
					} else {
						// Do nothing!
					}
					break;
			}
		}
	});
	return;
}

//processes user message then generate bot reply
function watsonReply(message){
	botIsMessaging(true);
	
	//ajax to orchestrator
	$.get("/careercoach/ajax/orchestrator.php", {message: message},function(data) {
		let reply=data.watson_reply;
		let intent=data.watson_intent;
		let action=data.action;
		let param=data.param;
		
		//bot debug
		debugSession();
		log("intent: "+intent);
		log("action: "+action);
		log("param: "+param);		
		 
			//ideally send upon Text to Speech response
		setTimeout(function(){
			botIsMessaging(false);
			sendMessage(reply,"left",action,param);
		}, 1000);
		if (ttsEnabled){
			convertToSpeech(reply);
		}		
	}, "json");
}

//cookie log ajax
function debugSession(){
	$.get("/ajax/debugsession.php", function(data) {
	  log(data);
	}, "text");			
}

//Process user message routine
function processMessage(message_text=getMessageText()){
	if (message_text.trim() === "") {
		return;
	}
	else{
		sendMessage(message_text);
		watsonReply(message_text);			
	}
}

function showLoadingScreen(bool){
	if (bool)
		$(".load_overlay").show();
	else
		$(".load_overlay").fadeOut();
}

function botIsMessaging(bool){
	if (bool)
		$(".bot_is_messaging").show();
	else
		$(".bot_is_messaging").hide();
}

function refreshTokens() {
	showLoadingScreen(true);
	setupStTSession();
	setupTtSSession();
	let timerId = setTimeout(refreshTokens, 3300000);
}

//-------------------DOC INIT-------------------//
$(document).ready(function () {
	
	//refresh tokens on the 55 minute mark
	refreshTokens();
	
	$("#send_button").click(function (e) {
		processMessage();
	});
	$(".message_input").keyup(function (e) {
		if (e.which === 13) {
			processMessage();
		}
	});
	$("#sound_button").click(function(e){
		toggleTtS();
	});
	$("#more_button").click(function(){
		if ($(".dropdown-content").is(":hidden"))			
			$(".dropdown-content").slideDown("fast");
		else
			$(".dropdown-content").slideUp("fast");
	})
	
	$("#help_button").click(function(){
		$(".help_overlay").fadeIn();
	})
	$(".help_overlay").click(function(){
		$(".help_overlay").fadeOut();
		$(".dropdown-content").slideUp("fast");
	})
	$('.list-group').on('click', 'a', function() {
		processMessage($(this).text());
	});
	//initialization and bot greetings
	if (confirm('Do you want to enable sound?')) {
		toggleTtS();
	} else {
		// Do nothing!
	}
	watsonReply("");
});