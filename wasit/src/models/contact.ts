import * as SQLite from 'expo-sqlite'

interface ContactSchema {
  id?: number
  accountId?: number
  content?: string
  self?: boolean
  createdAt?: number
  userId?: number
  chatId?: number
}

export default class Contact {
 
  static get tableName() {
    return 'contact_pp'
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
            userId INT NOT NULL,
            name TEXT,
            username TEXT UNIQUE,
            phone TEXT UNIQUE,
            bio TEXT,
            accountId INT,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
          );
        `
      );
    });
  }


  static create (params: any, work: string = 'return') {
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

          if(work === 'return')
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

  static bulckCreated (rows: Array<ContactSchema>, accountId: any) {
    const query = rows.slice().map(params => {
      const keys = Object.keys(params)
      const lineKeys = keys.join(', ')
      const values = Object.values(params)
      const questions = '? ' + ', ?'.repeat(values.length - 1)
  
      const query = `
        INSERT OR IGNORE INTO ${this.tableName} (${lineKeys}) 
        VALUES (${questions});
      
      `
      return query
    }).join('')

    const values = rows.slice().map(params => {
      return Object.values(params)
    }).flat() 

    console.log('ckec', query, values);
    

    return new Promise(
      (resolve, reject) => {
        this.database.transaction(
        tx => {
          tx.executeSql(query, values, (_, { rows }) => {
              
            // resolve(rows.item(0))
            }, (_, err) => {
              console.log(err, ' query-r');
              reject(err)
              return false
            }
          );
            //WHERE accountId = ? ORDER BY id DESC LIMIT ${rows.length} OFFSET 0;`, [accountId]
            tx.executeSql(`SELECT * FROM ${this.tableName} WHERE accountId = ? ORDER BY id DESC LIMIT ${rows.length} OFFSET 0;`, [accountId], (_,{ rows }) => {
            console.log('pop-= ', rows['_array']);
            
            resolve(rows['_array'])
          }, (_, err) => {
            console.log(err, ' query-r');
            reject(err)
            return false
          })
        },null)
      }
    )
  }
  
  static bulkCreate (rows: any, work: string = 'return'): Promise<Array<any>> {
    return new Promise(
      (resolve, reject) => {
        const contacts = []
        rows.array.forEach(async row => {
          try {
            const contact = await this.create(row)
            contacts.push(contact)
          } catch (err) {
            console.log(err)
          }
        });
        resolve(contacts)
      }
    )
  }


  static findPhone (phone: string): Promise<object> {
    const query = `SELECT * FROM ${this.tableName} WHERE phone = ?;`
    return new Promise(
      (resolve, reject) => {
        this.database.transaction(tx => {
        tx.executeSql(query, [phone], (_, { rows }) => {
            resolve(rows.item(0))
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

  static findPhones (phones: Array<string>): Promise<Array<any>> {
    const questions = 'phone = ?' + ' OR phone = ?'.repeat(phones.length - 1)
    const query = `SELECT * FROM ${this.tableName} WHERE ${questions};`

    return new Promise(
      (resolve, reject) => {
        this.database.transaction(tx => {
        tx.executeSql(query, phones, (_, { rows }) => {
            if (rows['_array']) resolve(rows['_array'])
            else reject('deu erroooooo')
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