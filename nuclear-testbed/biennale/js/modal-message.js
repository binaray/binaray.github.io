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
	toggleSendButton();
	return message_text;
}

//creates left or right message box
function sendMessage(text,message_side = "right") {
	var $messages, message;
	$messages = $(".messages");
	message = new Message({
		text: text,
		message_side: message_side
	});
	message.draw();
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
		sendMessage(message_text);
		debugSession();
		watsonReply(message_text);			
	}
}

function toggleMessageTopicsMenu(menuButton){
	menuButton = $('#'+menuButton);
	log(menuButton);
	if ($('#message_topics_dropdown').is(":hidden"))			
		$('#message_topics_dropdown').slideDown("fast");
	else
		$('#message_topics_dropdown').slideUp("fast");
}