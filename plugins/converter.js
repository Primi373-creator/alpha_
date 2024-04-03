const {
    alpha,
    mode,
    sendPhoto,
    sendVoice,
    sendGif,
    sendBassAudio,
    sendSlowAudio,
    sendBlownAudio,
    sendDeepAudio,
    sendErrapeAudio,
    sendFastAudio,
    sendFatAudio,
    sendNightcoreAudio,
    sendReverseAudio,
    sendSquirrelAudio,
    toAudio,
    toPTT,
    toVideo,
    AudioMetaData,
    lang,
    config
} = require('../lib');

alpha({
    pattern: 'photo ?(.*)',
    desc: lang.CONVERTER.PHOTO_DESC,
    type: "converter",
    fromMe: mode
}, async (message) => {
    if (!message.reply_message.sticker) return  await message.reply(lang.BASE.NEED.format("non animated sticker message"));
    if(message.reply_message.isAnimatedSticker) return  await message.reply(lang.BASE.NEED.format("please reply to a non animated sticker"));
    return await sendPhoto(message);
});
alpha({
    pattern: 'mp4 ?(.*)',
    desc: lang.CONVERTER.VIDEO_DESC,
    type: "converter",
    fromMe: mode
}, async (message, match) => {
    if (!message.reply_message.sticker) return message.reply(lang.BASE.NEED.format("animated sticker message"));
    if(!message.reply_message.isAnimatedSticker) return  await message.reply(lang.BASE.NEED.format("please reply to an animated sticker"));
    let media = await toVideo(await message.reply_message.download())
    return await message.send(media,{
        mimetype: 'video/mp4',
    },'video')
});
alpha({
    pattern: 'voice ?(.*)',
    desc: lang.CONVERTER.AUDIO_DESC,
    type: "converter",
    fromMe: mode
}, async (message) => {
    if (!message.reply_message.audio) return message.reply(lang.BASE.NEED.format("video/audio message"));
    let media = await toPTT(await message.reply_message.download())
    return await message.send(media,{
        mimetype: 'audio/mpeg',
        ptt: true
    }, 'audio')
});
alpha({
    pattern: 'gif ?(.*)',
    desc: lang.CONVERTER.GIF_DESC,
    type: "converter",
    fromMe: mode
}, async (message) => {
    
    if (!message.reply_message.sticker || message.reply_message.video) return message.reply(lang.BASE.NEED.format("animated sticker/video message"));
    return await sendGif(message)
});
alpha({
    pattern: 'bass ?(.*)',
    desc: lang.CONVERTER.AUDIO_EDIT_DESC,
    type: "audio-edit",
    fromMe: mode
}, async (message) => {
    if (!message.reply_message.audio) return message.reply(lang.BASE.NEED.format("audio message"));
    return await sendBassAudio(message)
});
alpha({
    pattern: 'slow ?(.*)',
    desc: lang.CONVERTER.AUDIO_EDIT_DESC,
    type: "audio-edit",
    fromMe: mode
}, async (message) => {
    if (!message.reply_message.audio) return message.reply(lang.BASE.NEED.format("audio message"));
    return await sendSlowAudio(message)
});
alpha({
    pattern: 'blown ?(.*)',
    desc: lang.CONVERTER.AUDIO_EDIT_DESC,
    type: "audio-edit",
    fromMe: mode
}, async (message) => {
    if (!message.reply_message.audio) return message.reply(lang.BASE.NEED.format("audio message"));
    return await sendBlownAudio(message)
});
alpha({
    pattern: 'deep ?(.*)',
    desc: lang.CONVERTER.AUDIO_EDIT_DESC,
    type: "audio-edit",
    fromMe: mode
}, async (message) => {
    if (!message.reply_message.audio) return message.reply(lang.BASE.NEED.format("audio message"));
    return await sendDeepAudio(message);
});
alpha({
    pattern: 'earrape ?(.*)',
    desc: lang.CONVERTER.AUDIO_EDIT_DESC,
    type: "audio-edit",
    fromMe: mode
}, async (message) => {
    if (!message.reply_message.audio) return message.reply(lang.BASE.NEED.format("audio message"));
    return await sendErrapeAudio(message)
});
alpha({
    pattern: 'fast ?(.*)',
    desc: lang.CONVERTER.AUDIO_EDIT_DESC,
    type: "audio-edit",
    fromMe: mode
}, async (message) => {
    if (!message.reply_message.audio) return message.reply(lang.BASE.NEED.format("audio message"));
    return await sendFastAudio(message)
});
alpha({
    pattern: 'fat ?(.*)',
    desc: lang.CONVERTER.AUDIO_EDIT_DESC,
    type: "audio-edit",
    fromMe: mode
}, async (message) => {
    if (!message.reply_message.audio) return message.reply(lang.BASE.NEED.format("audio message"));
    return await sendFatAudio(message);
});
alpha({
    pattern: 'nightcore ?(.*)',
    desc: lang.CONVERTER.AUDIO_EDIT_DESC,
    type: "audio-edit",
    fromMe: mode
}, async (message) => {
    if (!message.reply_message.audio) return message.reply(lang.BASE.NEED.format("audio message"));
    return await sendNightcoreAudio(message);
});
alpha({
    pattern: 'reverse ?(.*)',
    desc: lang.CONVERTER.AUDIO_EDIT_DESC,
    type: "audio-edit",
    fromMe: mode
}, async (message) => {
    if (!message.reply_message.audio) return message.reply(lang.BASE.NEED.format("audio message"));
    return await sendReverseAudio(message);
});
alpha({
    pattern: 'squirrel ?(.*)',
    desc: lang.CONVERTER.AUDIO_EDIT_DESC,
    type: "audio-edit",
    fromMe: mode
}, async (message) => {
    if (!message.reply_message.audio) return message.reply(lang.BASE.NEED.format("audio message"));
    return await sendSquirrelAudio(message);
});

alpha({
    pattern: 'mp3 ?(.*)',
    desc: lang.CONVERTER.MP3_DESC,
    type: "converter",
    fromMe: mode
}, (async (message) => {
    if (!message.reply_message.audio && !message.reply_message.video) return message.reply(lang.BASE.NEED.format("video message"));
    const opt = {
                title: config.AUDIO_DATA.split(/[|,;]/)[0] || config.AUDIO_DATA,
                body: config.AUDIO_DATA.split(/[|,;]/)[1],
                image: config.AUDIO_DATA.split(/[|,;]/)[2]
            }
    const AudioMeta = await AudioMetaData(await toAudio(await message.reply_message.download()), opt);
    return await message.send(AudioMeta,{
        mimetype: 'audio/mpeg'
    },'audio')
}));
