const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const client = new Discord.Client();
module.exports = {
    name: "botinfo",
    description: "Shows the bot info",
    run: async (client, message, args) => {
        const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
        let embed = new Discord.MessageEmbed()
        .setAuthor("Infinity#4967's Info", client.user.avatarURL())
        .setColor("RANDOM")
            .setDescription(`**Bot Name: **Infinity \n**Owner: **๖ۣۜℜⱥjͥƤuͣtͫ#5915 \n**Total Categories: **6 \n**Total Commands: **108 \n**Uptime and Ping: **${duration} / ${Math.round(client.ws.ping)}ms \n**State: **Under Development \n**Online Status: **Up 24/7 (Except during Maintenance)`)
        .addField("Some Useful Links", "**Get Infinity's Invite Link** **[Here](https://discord.com/api/oauth2/authorize?client_id=733670294086221865&permissions=8&scope=bot)** \n**Need Help? Join Infinity's** **[Support Server](https://discord.gg/bWwXGw5)** **for assistance** \n**Looking for a Music Bot? Try Our** **[Beats](https://discord.com/api/oauth2/authorize?client_id=730683152720199700&permissions=37223745&scope=bot) Bot**")
        .setFooter("Regards, Infinity Bot Team");
    message.channel.send(embed);
    }
}
