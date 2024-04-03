const {
	alpha,
	mode,
	config,
	getJson,
} = require('../lib');


alpha({
	pattern: 'gemini ?(.*)',
	type: "eva",
	fromMe: mode,
	desc: "gemini ai",
}, async (message, match) => {
	match = match || message.reply_message.text;
	if (!match) return await message.send("*please give me an query!*");
	const res = await getJson(`${config.BASE_URL}api/ai/gemini?text=${match}&apikey=${config.ALPHA_KEY}`);
	if (!res.status) return await message.send(`Please enter a new apikey, as the given apikey limit has been exceeded. Visit ${config.BASE_URL}api/signup for gettig a new apikey. setvar alpha_key: your apikey`);
	return await message.send(res.result);
});
