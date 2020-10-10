'use strict';
const EventEmiter = require("events").EventEmitter

class DJSleaderboard extends EventEmiter {
    constructor(options) {
        super()

        if(!options) return console.log(`An invalid token was provided.`)
        if(options.token === undefined) return console.log(`An invalid token was provided.`)

        this.token = (options && options.token ? options.token : null);

    }

    async make(data, itemPerPage, page) {
        const self = this
        self.emit("make", (data, itemPerPage, page))
        let board = []

        for(const key of Object.keys(data)) {
            for(const key1 of Object.keys(data[key])) {
                const value = Object.assign({user: key1}, {guild: key}, data[key][key1])
                board.push(value)
            }
        }
        board = board.sort((a, b) => b.allxp - a.allxp)
        board = await Promise.all(board.map(async (x, i) => {
            const user = x.user
            const guild = x.guild
            return {
                username: user.username,
                usertag: user.tag,
                guildName: guild.name,
                userxp: x.xp,
                userlevel: x.level,
                userrank: i + 1
            }
        }))

        const maxpage = Math.ceil(board.length / itemPerPage)
        if(page < 1 || page > maxpage) return null;
        const datas = board.slice((page - 1) * itemPerPage, page * itemPerPage);
        return datas 
    }
}

module.exports = DJSleaderboard;