const messageTemplate=$($('#messageTemplate').html());
const messageReplyTemplate=$($('#messageReplyTemplate').html());
const topicItemTemplate=$($('#topicItemTemplate').html());
const topicColors=[
{color:'#E90006',bg:'#FDE5E6'},
{color:'#0175CC',bg:'#E6F1FA'},
{color:'#FFB0D1',bg:'#FFF5D1'},
{color:'#B4ABD6',bg:'#FFEFF6'},
{color:'#FFCC19',bg:'#E9E6F3'},
{color:'#85E2B5',bg:'#DAF6E9'},
{color:'#A5BBC8',bg:'#E4EBEF'},
{color:'#D1E39D',bg:'#00000'},	
];


let topicId=0;
function filterTopic(tId=0){
	$(".message_list").html("");
	let dataToAppend=[];
	let alignToggle = false;
	topicId = tId;
	if (tId==0){
		messageIds.forEach(mId=>{
			// sendMessage(messageDict[mId],alignToggle);
			appendMessageToArray(dataToAppend,messageDict[mId],alignToggle);
			alignToggle=!alignToggle;
		});
	}
	else{
		for (const mId in messageDict){
			if (messageDict[mId].topicId==tId){
				// sendMessage(messageDict[mId],alignToggle);
				appendMessageToArray(dataToAppend,messageDict[mId],alignToggle);
				alignToggle=!alignToggle;
			}
		}
	}
	$(".message_list").append(dataToAppend);
	$('#message_topic_button').css('color',topicColors[tId].color);
	$('#message_topic_button').find('h3').html(topics[tId]);
	$('.message_input_wrapper').css('color',topicColors[tId].color);
	$('.message_input_wrapper').css('background-color',topicColors[tId].bg);
	setTimeout(function () {
		$(".message_list").scrollTop($(".message_list li").last().position().top + $(".message_list li").last().height());
		$('.message_list li').last().focus();
	}, 100);
	
}

function appendMessageToArray(array,message,left=true){	
	let $message;
	let message_text = message.message;
	let topic_id = message.topicId;
	let timestamp = message.timestamp;
	let reply = message.reply;
	let message_side = left ? "message_left" : "message_right";
	if (reply===-1) $message = $(messageTemplate.clone().html());
	else {
		$message = $(messageReplyTemplate.clone().html());
		$message.find(".message_reply").html(reply);
	}
	$message.addClass(message_side).find(".message_text").html(message_text);
	$message.find(".timestamp").html(dayjs.unix(timestamp).format("HH:mm"));
	$message.find('.message_wrapper').css('background-color',topicColors[topic_id].color);
	$message.find('hr').css('border-color',topicColors[topicId].bg);
	$message.find('.timestamp').css('color',topicColors[topicId].color);
	$message.attr('tabindex', array.length);
	array.push($message);
}

let MessageBox = function (arg) {
	this.message_text = arg.message_text, this.message_side = arg.message_side;
	this.reply = arg.reply, this.timestamp = arg.timestamp, this.topic_id = arg.topic_id;

	this.draw = function (_this) {
		return function () {
			let $message;
			if (_this.reply===-1) $message = $(messageTemplate.clone().html());
			else {
				$message = $(messageReplyTemplate.clone().html());
				$message.find(".message_reply").val(_this.reply);
			}
			$message.addClass(_this.message_side).find(".message_text").html(_this.message_text);
			$message.find(".timestamp").html(dayjs.unix(_this.timestamp).format("HH:mm"));
			$message.find('.message_wrapper').css('background-color',topicColors[_this.topic_id].color);
			$(".message_list").append($message);
			// return setTimeout(function () {
				// return $message.addClass("appeared");
			// }, 0);
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
function sendMessage(message,left = true) {
	// log(message);
	let $messages, messageBox, message_side;
	
	if (left) message_side = "message_left";
	else message_side = "message_right";
	
	$messages = $(".message_list");
	messageBox = new MessageBox({
		message_text: message.message,
		topic_id: message.topicId,
		timestamp: message.timestamp,
		reply:message.reply,
		message_side: message_side
	});
	messageBox.draw();
	$messages.animate({ scrollTop: $messages.prop("scrollHeight") }, 300);
	return;
}

function postMessage(message){
	log(message);
	fetch(messageUrl, {method: "POST", body: JSON.stringify(message)})
		.then(response => response.text())
		.then(data => log(data));
}
//Process user message routine
let replyId = -1;
function processMessage(){
	let message_text=getMessageText();
	if (message_text.trim() === "") {
		return;
	}
	else{		
		messageInput={
			topicId:(topicId+1),	//Hard-code fix xD db ids start from 1
			text:message_text,
			replyTo:replyId
		};
		postMessage(messageInput);
		//sendMessage(message_text);
	}
}
$(".message_input").keyup(function (e) {
	if (e.which === 13) {
		processMessage();
	}
});

function setReply(props=null){
	if (props==null){
		$('#message_reply_popup').hide();
		replyId=-1;
	}
	else{
		$('#message_reply_popup').show();
		filterTopic(props.topicId);
		$('#message_reply_input').html(messageDict[props.replyId].message);
		$('#message_reply_input').css('color',topicColors[props.topicId].color);
		replyId=props.replyId;
	}
}

function updateTopics(){
	$('#message_topics_dropdown').html("");
	for (let i=0;i<topics.length;i++){
		$topicItem = $(topicItemTemplate.clone().html());
		$topicItem.css('color',topicColors[i].color);
		$topicItem.find("h4").html(topics[i]);
		$topicItem.click(function(){
			filterTopic(i);
			toggleMessageTopicsMenu('message_topic_button');
		});
		$('#message_topics_dropdown').append($topicItem);
		if(i==0) $('#message_topics_dropdown').append('<hr>')
	}
	filterTopic(topicId);
}

function toggleMessageTopicsMenu(menuButton,forceOpen=false){
	$menuButton = $('#'+menuButton);
	if ($('#message_topics_dropdown').is(":hidden") || forceOpen){
		$menuButton.find('h3').html("Select a topic:");
		$menuButton.find('i').html("expand_less");
		$('#message_topics_dropdown').slideDown("fast");
	}
	else{
		$('#message_topics_dropdown').slideUp("fast");
		filterTopic(topicId);
		$menuButton.find('i').html("expand_more");
	}
}