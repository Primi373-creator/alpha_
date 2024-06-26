const {
	alpha,
	mode,
	config,
	getBuffer,
} = require('../lib');


alpha({
	pattern: 'bing ?(.*)',
	type: "eva",
	fromMe: mode,
	desc: "bing ai",
}, async (message, match) => {
	match = match || message.reply_message.text;
	if (!match) return await message.send("*please give me an query!*");
	const res = await getBuffer(`${config.BASE_URL}api/ai/bing?text=${match}&apikey=${config.ALPHA_KEY}`);
	return await message.send(res, {},'image');
});
