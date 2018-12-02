const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
    console.log("Connected as " + client.user.tag)

    client.user.setActivity("YouTube", {type: "WATCHING"})

    client.guilds.forEach((guild) =>{
        console.log(guild.name)
        guild.channels.forEach((channel) => {
            console.log(` - ${channel.name} ${channel.type} ${channel.id}`)
        })
        // General channel id: 518842219143102464
    })
    let generalChannel = client.channels.get("518842219143102464")
    const attachment = new Discord.Attachment("https://www.google.com/")
    generalChannel.send(attachment)
})

client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) {
        return
    }
    // receivedMessage.channel.send("Message recieved: " + receivedMessage.author.toString() + ": " + receivedMessage.content)

    // receivedMessage.react("👍")
    // receivedMessage.guild.emojis.forEach(customEmoji => {
    //     console.log(`${customEmoji.name} ${customEmoji.id}`)
    //     receivedMessage.react(customEmoji)
    // })
    if (receivedMessage.content.startsWith("!")) {
        processCommand(receivedMessage)
    }
})

function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(1)
    let splitCommand = fullCommand.split(" ")
    let primaryCommand = splitCommand[0]
    let arguments = splitCommand.slice(1)

    if (primaryCommand == "help") {
        helpCommand(arguments, receivedMessage)
    } else if (primaryCommand == "multiply") {
        multiplyCommand(arguments, receivedMessage)
    } else {
        receivedMessage.channel.send("Unknown command. Try `!help` or `!multiply`")
    }
}

function multiplyCommand(arguments, receivedMessage) {
    if (arguments.length < 2) {
        receivedMessage.channel.send("Not enough arguments. Try `!multiply 2 10`")
        return
    }
    let product = 1
    arguments.forEach((value) => {
        product = product *parseFloat(value)
    })
    receivedMessage.channel.send("The product of " + arguments + " is " + product.toString())
}

function helpCommand(arguments, receivedMessage) {
    if (arguments.length == 0) {
        receivedMessage.channel.send("I'm not sure what you need help with. Try `!help [topic]`")
    } else {
        receivedMessage.channel.send("It looks like you need help with " + arguments)
    }
}
// bot login credentials is to be kept secret. find it on the dev portal
client.login("")