import Account from '../models/account'
import Contact from '../models/contact'
import Chat from '../models/chat'
import ChatMessage from '../models/chatMessage'
import ChatMember from '../models/chatMember'

export default function sqliteorm () {
    console.log('criando tabelas...');
    Account.createTable()
    Contact.createTable()
    Chat.createTable()
    ChatMessage.createTable()
    ChatMember.createTable()
    console.log('tabelas criadas!');
}