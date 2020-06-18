const messageTemplate=$($('#messageTemplate').html());
const messageReplyTemplate=$($('#messageReplyTemplate').html());
const topicColors=[
{color:'#E90006',bg:'#00000'},
{color:'#0175CC',bg:'#00000'},
{color:'#FFB0D1',bg:'#00000'},
{color:'#B4ABD6',bg:'#00000'},
{color:'#FFCC19',bg:'#00000'},
{color:'#85E2B5',bg:'#00000'},
{color:'#A5BBC8',bg:'#00000'},
{color:'#D1E39D',bg:'#00000'},	
];



function filterTopic(tId=0){
	$(".message_list").html("");
	let out=[];
	let alignToggle = false;
	if (tId==0){
		for (const mId in messageDict) {
			sendMessage(messageDict[mId],alignToggle);
			alignToggle=!alignToggle;
		}
	}
	else{
		for (const mId in messageDict){
			log(mId);
			if (messageDict[mId].topicId==tId){
				sendMessage(messageDict[mId],alignToggle);
				alignToggle=!alignToggle;
			}
		}
	}
}

let MessageBox = function (arg) {
	this.message_text = arg.message_text, this.message_side = arg.message_side;
	this.reply = arg.reply, this.timestamp = arg.timestamp;
	this.draw = function (_this) {
		if (_this.reply===-1){
			return function () {
				let $message;
				$message = $(messageTemplate.clone().html());
				$message.addClass(_this.message_side).find(".message_text").html(_this.message_text);
				$(".message_list").append($message);
				return setTimeout(function () {
					return $message.addClass("appeared");
				}, 0);
			};
		}
		else{
			return function () {
				let $message;
				$message = $(messageReplyTemplate.clone().html());
				$message.addClass(_this.message_side).find(".message_text").html(_this.message_text);
				$message.find(".message_reply").val(_this.reply);
				$(".message_list").append($message);
				return setTimeout(function () {
					return $message.addClass("appeared");
				}, 0);
			};
		}
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
function sendMessage(message,left = true) {
	log(message);
	let $messages, messageBox, message_side;
	
	if (left) message_side = "message_left";
	else message_side = "message_right";
	
	$messages = $(".message_list");
	messageBox = new MessageBox({
		message_text: message.message,
		timestamp: message.timestamp,
		reply:message.reply,
		message_side: message_side
	});
	messageBox.draw();
	$messages.animate({ scrollTop: $messages.prop("scrollHeight") }, 300);
	return;
}

//Process user message routine
function processMessage(){
	let message_text=getMessageText();
	if (message_text.trim() === "") {
		return;
	}
	else{
		log(message_text);
		sendMessage(message_text);
	}
}
$(".message_input").keyup(function (e) {
	if (e.which === 13) {
		processMessage();
	}
});

function toggleMessageTopicsMenu(menuButton){
	menuButton = $('#'+menuButton);
	log(menuButton);
	if ($('#message_topics_dropdown').is(":hidden"))			
		$('#message_topics_dropdown').slideDown("fast");
	else
		$('#message_topics_dropdown').slideUp("fast");
}