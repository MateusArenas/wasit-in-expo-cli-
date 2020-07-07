import Account from '../models/account'
import Message from '../models/message'
import Contact from '../models/contact'

export default function sqliteorm () {
    Account.createTable()
    Message.createTable()
    Contact.createTable()
}