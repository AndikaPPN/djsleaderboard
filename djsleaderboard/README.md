You Need To Have 1 JSON Database for the Leveling Syatem
Example:

**leveling.json**
```json
{
    "GuildID1": {
        "UserID1": {
            "allxp": 1000,
            "xp": 1000,
            "level": 1
        },
        "UserID2": {
            "allxp": 35000,
            "xp": 90,
            "level": 35
        }
    },
    "GuildID2": {
        "UserID1": {
            "allxp": 7000,
            "xp": 40,
            "level": 7
        },
        "UserID2": {
            "allxp": 16000,
            "xp": 1690,
            "level": 16
        }
    }
}
```

**Example Usage**
```javascript
const { Client } = require("discord.js");
const { DJS } = require("djsleaderboard");
const data = require("./leveling.json");

const client = new Client();
const leaderboard = new DJS();

client.on("message", async message => {
    const args = message.content.slice(1).split(" ")

    if(isNaN(args[1])) return message.channel.send(`Page must be a number!`)
    leaderboard.make(data, 5, args[1]).then(x => {
        //leaderboard.make(data, itemPerPage, page)
        if(!x) return message.channel.send(`Page ${args[1]} is not exist!`)
        const lb = x.map(e => `${e.rank}# ${e.username}#${e.tag} (Xp: ${e.xp} | Level: ${e.level} | Guild: ${x.guildname})`)
        return message.channel.send(lb)
    })
})

client.login("Your Bot Token")
```