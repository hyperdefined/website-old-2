let emoji = null
let emojis = ['👌', '✌️', '🔥', '🐺', '💀']

const random = Math.floor(Math.random() * emojis.length)
emoji = emojis[random]
document.getElementById('emoji').innerHTML = emoji

