const { IntegrationApplication } = require("discord.js");
const roleData = require("../../../database/guildData/roleupdates")

module.exports = async(interaction, client) => {
    if (!interaction.isSelectMenu()) return;

    if (interaction.values[0] === "role_updates") {

        await interaction.deferUpdate()
        
        const data = await roleData.findOne({
            GuildID: interaction.guild.id
        })

        if (!data) {
            await interaction.channel.send("Please send the **CHANNEL ID** to be setup for Server Update Logs")

            const filter = (m) => m.author.id === interaction.member.id

            let channelID;

            const collector = await interaction.channel.createMessageCollector({ filter, time: 60000 })

            collector.on('collect', async(collected, returnValue) => {
                channelID = collected.content

                let channel = interaction.guild.channels.cache.get(channelID)

                if (!channel) return interaction.channel.send("Couldn't find that channel!")

                let newData = new roleData({
                    ChannelID: channelID,
                    GuildID: interaction.guild.id
                })
    
                newData.save()

                await collector.stop()
    
                return interaction.channel.send(`Role updates will be logged in ${interaction.guild.channels.cache.get(channelID)}`)
            })

            collector.on('end', async(collected, returnValue) => {
                console.log("Collector Stopped!")
            })

        } else if (data) {
            await roleData.findOneAndRemove({
                GuildID: interaction.guild.id
            })

            return interaction.channel.send(`Role Updates Logging has been stopped!`)
        }
    }
}