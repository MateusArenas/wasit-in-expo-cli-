import * as SQLite from 'expo-sqlite'

interface ChatMessageSchema {
  accountId?: number
  id?: number
  content?: string
  self?: boolean
  createdAt?: number
  userId?: number
  chatId?: number
  messageId?: number
  readDate?: string 
}

export default class ChatMessage {
 
  static get tableName() {
    return 'chat_message'
  }

  static get database () {
    return SQLite.openDatabase("dbV10ooooo.db", '1.0.4')
  }

  static createTable () {
    this.database.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () =>
      console.log('Foreign keys turned on')
    );
    this.database.transaction(tx => {
      tx.executeSql(
        `create table if not exists ${this.tableName} (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            accountId INT NOT NULL,
            messageId INT,
            content TEXT NOT NULL,
            userId INT,
            chatId INT,
            createdAt DATE DEFAULT (datetime('now','localtime')),
            readDate TEXT
          );
        `
      );
    });
  }

  static findAndUpdate (id, body) {
    const keys = Object.keys(body)
    const querySET = keys.join(' = ? , ') + ' = ? '

    const query = `
      UPDATE OR IGNORE ${this.tableName} SET ${querySET}
      WHERE id = ?;
    `

    return new Promise(
      (resolve, reject) => {
        this.database.transaction(
        tx => {
          tx.executeSql(query, [...Object.values(body), id], (_, { rows }) => {
              
            // resolve(rows.item(0))
            }, (_, err) => {
              console.log(err);
              reject(err)
              return false
            }
          );
          tx.executeSql(`SELECT * FROM ${this.tableName} WHERE id = ?`, [id], (_, rows) => {
                
            resolve(rows.rows.item(0))
          }, (_, err) => {
            console.log(err);
            reject(err)
            return false
          })
        },null)
      }
    )
  }

  static findAndSetMessageId (id, messageId) {

    const query = `
      UPDATE OR IGNORE ${this.tableName} SET messageId = ?
      WHERE id = ?;
    `

    return new Promise(
      (resolve, reject) => {
        this.database.transaction(
        tx => {
          tx.executeSql(query, [messageId, id], (_, { rows }) => {
              
            // resolve(rows.item(0))
            }, (_, err) => {
              console.log(err);
              reject(err)
              return false
            }
          );
          tx.executeSql(`SELECT * FROM ${this.tableName} WHERE id = ?`, [id], (_, rows) => {
                
            resolve(rows.rows.item(0))
          }, (_, err) => {
            console.log(err);
            reject(err)
            return false
          })
        },null)
      }
    )
  }

  static create (params: ChatMessageSchema) {
    const keys = Object.keys(params)
    const lineKeys = keys.join(', ')
    const values = keys.map((key) => (params[key]))
    const questions = '? ' + ', ?'.repeat(values.length - 1)

    const query = `
      INSERT OR IGNORE INTO ${this.tableName} (${lineKeys}) 
      VALUES (${questions});
    `

    return new Promise(
      (resolve, reject) => {
        this.database.transaction(
        tx => {
          tx.executeSql(query, values, (_, { rows }) => {
              
            // resolve(rows.item(0))
            }, (_, err) => {
              console.log(err);
              reject(err)
              return false
            }
          );
          tx.executeSql(`SELECT * FROM ${this.tableName} WHERE id = last_insert_rowid();`, [], (_, rows) => {
                
            resolve(rows.rows.item(0))
          }, (_, err) => {
            console.log(err);
            reject(err)
            return false
          })
        },null)
      }
    )
  }

  static findAllbyChatId (chatId: number): Promise<any> {
    const query = `SELECT * FROM ${this.tableName} WHERE chatId = ?;`
    return new Promise(
      (resolve, reject) => {
        this.database.transaction(tx => {
        tx.executeSql(query, [chatId], (_, { rows }) => {
            resolve(rows['_array'])
        }, (_, err) => {
          console.log(err);
          reject(err)
          return false
        }
        );
      })
      }
    )
  }

  static findAll({ accountId, chatIds }, { limit, offset }): Promise<any> {
    const queryOR = ' chatId = ? ' + 'OR chatId = ? '.repeat(chatIds.length - 1)

    const query = `SELECT * FROM ${this.tableName} WHERE accountId = ? AND (${queryOR}) ORDER BY id DESC LIMIT ${limit} OFFSET ${offset};`
    return new Promise(
      (resolve, reject) => {
        this.database.transaction(tx => {
        tx.executeSql(query, [accountId, ...chatIds], (_, { rows }) => {
            resolve(rows['_array'])
        }, (_, err) => {
          console.log(err);
          reject(err)
          return false
        }
        );
      })
      }
    )
  }

}