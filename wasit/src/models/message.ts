import * as SQLite from 'expo-sqlite'

interface MessageSchema {
  id?: number
  content?: string
  self?: boolean
  createdAt?: number
  userId?: number
  chatId?: number
}

export default class Message {
 
  static get tableName() {
    return 'chat_message'
  }

  static get database () {
    return SQLite.openDatabase("dbV10.db", '1.0.1')
  }

  static createTable () {
    this.database.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () =>
      console.log('Foreign keys turned on')
    );
    this.database.transaction(tx => {
      tx.executeSql(
        `create table if not exists ${this.tableName} (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            content TEXT NOT NULL,
            userId INT,
            chatId INT,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
          );
        `
      );
    });
  }


  static create (params: MessageSchema) {
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

}