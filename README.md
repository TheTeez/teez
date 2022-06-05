<!-- ![Just...]() -->

<div align='center'>

<h2> WhatsApp-bot </h2>
  
<a href='https://github.com/LuckyYam/Whatsapp-bot/releases'>
  
<img src='https://img.shields.io/github/v/release/LuckyYam/WhatsApp-bot?color=%231e81b0&label=version&style=for-the-badge'>
  
</a>
  
<a href='https://github.com/LuckyYam/Whatsapp-bot/blob/main/LICENSE'>
  
<img src='https://img.shields.io/github/license/LuckyYam/WhatsApp-bot?color=%231e81b0&style=for-the-badge'>
  
</a>
  
</div>

## 💈 Preview

 - Fully Modular Design
 - Written in [JavaScript](https://www.javascript.com/)
 - Built with [Baileys](https://github.com/adiwajshing/baileys) (A Lightweight full-featured WhatsApp Library)

 ## ⚠ Requirements

 - [Node.js](https://nodejs.org/en/)
 - [FFmpeg](https://ffmpeg.org/download.html)
 - [ImageMagick](https://imagemagick.org/script/download.php)
 - [webP](https://developers.google.com/speed/webp/download)

 ## 📙 Guide

 - Make sure you have downloaded all of the requirements mentioned [here](https://github.com/LuckyYam/WhatsApp-bot#-requirements)
 - Rename the `.env.example` to `.env` and fill the [configs](https://github.com/LuckyYam/WhatsApp-bot#-configs) of the bot
 - Run the following commands given [here](https://github.com/LuckyYam/WhatsApp-bot#-run)

 ## 🔧 Configs

 - `PREFIX`: Prefix of the bot
 - `NAME`: Name of the bot
 - `MONGO_URI`: A secret String for MongoDB connection. (Required)
 - `MODS`: Number of the users who should be the admins of the bot (should be in international format without "+" and multiple numbers must be separated by a comma ", ")

 ## 🚀 Run

 ```
 yarn install
 yarn start
 ```

 ## 💪 Contributing

 - Feel free to open issues regarding any problems or if you have any feature requests
 - Make sure to follow the ESLint Rules while editing the code and run `yarn format` before opening Pull request

 ## 🎐 License

 WhatsApp-bot is free and open-source software licensed under the [GNU Affero General Public License v3.0](https://github.com/LuckyYam/WhatsApp-bot/blob/master/LICENSE).