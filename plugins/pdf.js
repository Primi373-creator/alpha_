const fs = require('fs');
const FormData = require('form-data');
const axios = require('axios');
const path = './media/pdf';
const {
	alpha,
	mode,
	getRandom,
	config
} = require('../lib');


alpha({
	pattern: 'pdf ?(.*)',
	desc: "Images/texts to PDF",
	type: 'converter',
	fromMe: mode,
	usage: `_1. Input images/text using .pdf_\n_2. Get output pdf using .pdf get_\n_3. Added images by mistake? then delete all inputted images using .pdf delete_\n_4. All files will be auto deleted after the output is produced_`
}, async (message, match) => {
	match = match || message.reply_message.text;
	if (!match && !message.reply_message.image) return await message.send("*reply to an image or text*\nuse pdf _help_ to clarify");
	if (!fs.existsSync(path)) {
		fs.mkdirSync(path)
	};
	if (match && match != "get" && !message.reply_message.image) {
		let fd = new FormData();
		fd.append('text', match);
		fd.append('apikey', config.alpha_KEY);
		fd.append('path', 'text.pdf');
		const response = await axios.post(`${config.BASE_URL}api/tools/pdf`, fd, {
			headers: fd.getHeaders()
		});
		if (!response.data.status) return await message.send(`API key limit exceeded. Get a new API key at ${config.BASE_URL}api/signup. Set var alpha_key: your_api_key`);
		return await message.send({
			url: response.data.url
		}, {
			filename: 'document.pdf'
		}, 'document');
	} else if (message.reply_message.image) {
		const media = await message.reply_message.download();
		fs.writeFileSync('./media/pdf/' + getRandom('.jpg'), media);
		return await message.send("*Image added!*");
	} else if (match && match == "get") {
		let page = 1;
		const files = fs.readdirSync('./media/pdf');
		if (files.length == 0) return await message.send('*No image/message added*');
		let fd = new FormData();
		fd.append('path', 'files.pdf');
		fd.append('apikey', config.alpha_KEY);
		files.map(async (file) => {
			if (file != "pdf") {
				fd.append('files', file,'files.pdf');
			}
		});
		const response = await axios.post(`${config.BASE_URL}api/tools/pdf`, fd, {
			headers: fd.getHeaders()
		});
		if (!response.data.status) return await message.send(`API key limit exceeded. Get a new API key at ${config.BASE_URL}api/signup. Set var alpha_key: your_api_key`);
		await message.send({
			url: response.data.url
		}, {
			filename: 'document.pdf'
		}, 'document');
		fs.rmSync(path, {
			recursive: true,
			force: true
		});
	}
});
