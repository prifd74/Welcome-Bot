/*

☆.。.:*・°☆.。.:*・°☆.。.:*・°☆.。.:*・°☆
                                                 
  _________ ___ ___ ._______   _________    
 /   _____//   |   \|   \   \ /   /  _  \   
 \_____  \/    ~    \   |\   Y   /  /_\  \  
 /        \    Y    /   | \     /    |    \ 
/_______  /\___|_  /|___|  \___/\____|__  / 
        \/       \/                     \/  
                    
DISCORD :  https://discord.com/invite/xQF9f9yUEM                   
YouTube : https://www.youtube.com/@GlaceYT                         

Command Verified : ✓  
Website        : ssrr.tech  
Test Passed    : ✓

☆.。.:*・°☆.。.:*・°☆.。.:*・°☆.。.:*・°☆
*/
const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { Welcome } = require("../../mongodb");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setup-welcome")
        .setDescription("Setup a welcome message for new members.")
        .addChannelOption(option => option.setName("channel").setDescription("Channel for welcome messages").setRequired(true))
        .addIntegerOption(option => option.setName("embed").setDescription("Choose embed style (1, 2, 3, or 0 for random)").setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        const channel = interaction.options.getChannel("channel");
        const embedType = interaction.options.getInteger("embed");

        if (![0, 1, 2, 3].includes(embedType)) {
            return interaction.reply({ content: "❌ Invalid embed type! Choose 1, 2, 3, or 0 for random.",  flags: 64  });
        }

        await Welcome.findOneAndUpdate(
            { guildId: interaction.guild.id },
            { channelId: channel.id, embedType },
            { upsert: true }
        );

        await interaction.reply(`✅ Welcome messages will be sent in ${channel} using embed style ${embedType === 0 ? "random" : embedType}.`);
    }
};
