var tgAPI = require('node-telegram-bot-api');
var token = require('./token.js');

var bot = new tgAPI(token, {polling: true});

bot.onText(/\/help/, function (msg) {
	var chatID = msg.chat.id;
	var text   = "This bot is dedicated to delete messages in a group.\n"+
				 "Please reply the first message you want to delete with \"/getID\" to get the ID.\n"+
				 "Then enter \"/delfrom ID\" with the ID you just got.";

	bot.sendMessage(chatID, text);
});

// bot.onText(/\/json/, function (msg) {
// 	var chatID = msg.chat.id;
// 	var text = JSON.stringify(msg, null, "\t");

// 	bot.sendMessage(chatID, text);
// });

bot.onText(/\/getID/, function (msg) {
	var chatID = msg.chat.id;
	var msgID  = msg.message_id;
	var text   = "";

	if (msg.reply_to_message != null)
		text = msg.reply_to_message.message_id;
	else
		text = "Please read \"/help\".";

	bot.sendMessage(chatID, text);
});

bot.onText(/\/delfrom ([0-9]+)/, function (msg, match) {
	var chatID = msg.chat.id;
	var msgID  = msg.message_id;
	var first = parseInt(match[1]);
	var last = msgID;
	var counter = 0;

	for (var i = first; i <= last; ++i){
		bot.deleteMessage(chatID, i);
		++counter;
	}

	bot.sendMessage(chatID, "Done! Total of "+counter+" messages is deleted.");
});
