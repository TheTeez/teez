const { userSchema, groupSchema, contactSchema } = require('../Database')

module.exports = class Database {
    constructor() {}

    /**
     * @param {string} jid
     * @returns {Promise<user>}
     */

    getUser = async (jid) =>
        (await this.user.findOne({ jid })) ||
        (await new this.user({
            jid
        }).save())

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

    getGroup = async (jid) =>
        (await this.group.findOne({ jid })) ||
        (await new this.group({
            jid
        }).save())

    /**
     * @returns {Promise<contact[]>}
     */

    getContacts = async () => {
        let result = await this.contact.findOne({ title: 'contacts' })
        if (!result)
            result = await new this.contact({
                title: 'contacts',
                data: []
            }).save()
        return result.data
    }

    user = userSchema

    group = groupSchema

    contact = contactSchema
}

/**
 * @typedef {{jid: string, experience: number, ban: boolean}} user
 */

/**
 * @typedef {{jid: string, events: boolean, nsfw: boolean, mods: boolean}} group
 */

/**
 * @typedef {import('@adiwajshing/baileys').Contact} contact
 */
