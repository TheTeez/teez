const { userSchema, groupSchema, contactSchema } = require('../Database')

module.exports = class Database {

    /**
     * @typedef {{jid: string, experience: number, ban: boolean}} user
     */

    /**
     * @typedef {{jid: string, events: boolean, nsfw: boolean, mods: boolean}} group
     */
    constructor() {}

    /**
     * @param {string} jid 
     * @returns {Promise<user>}
     */

    getUser = async (jid) => await this.user.findOne({ jid }) || await new this.user({
        jid
    }).save()

    /**
     * @param {string} jid 
     * @param {'ban' | 'unban'} update
     */

    updateUserBanStatus = async (jid, update = 'ban') => {
        await this.getUser(jid)
        await this.user.updateOne({ jid }, { $set: { ban: update === 'ban' ? true : false } })
    }

    /**
     * @param {string} jid
     * @returns {Promise<group>}
     */

    getGroup = async (jid) => await this.group.findOne({ jid }) || await new this.group({
        jid
    }).save()

    user = userSchema

    group = groupSchema

    contact = contactSchema
}