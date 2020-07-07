import * as SQLite from 'expo-sqlite'

interface AccountSchema {
  id?: number
  name?: string
  username?: string
  password?: string
  phone?: string
  lastSigned?: number
  bio?: string
}

export default class Account {
 
  static get tableName() {
    return 'account'
  }

  static get database () {
    return  SQLite.openDatabase("dbV2.db")
  }
  static createTable () {
    this.database.transaction(tx => {
      tx.executeSql(
        `create table if not exists ${this.tableName} (
            id INT PRIMAY KEY NOT NULL, 
            name TEXT,
            username TEXT UNIQUE,
            phone TEXT UNIQUE,
            password TEXT,
            bio TEXT,
            token TEXT,
            lastSigned DATE,
            signedAccount BOOLEAN 
          );
        `
      );
    });
  }


  static create (params: AccountSchema) {
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
                resolve(rows.item(0))
            }, (_, err) => {
              console.log(err);
              reject(err)
              return false
            }
          );
        },null)
      }
    )
  }

  static findSigned (): Promise<object> {
    const query = `SELECT * FROM ${this.tableName} WHERE signedAccount = ?;`
    return new Promise(
      (resolve, reject) => {
        this.database.transaction(tx => {
        tx.executeSql(query, [true], (_, { rows }) => {
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

  static delete (id: number): Promise<object> {
    const query = `DELETE FROM ${this.tableName} WHERE id = ?;`
    return new Promise(
      (resolve, reject) => {
        this.database.transaction(tx => {
        tx.executeSql(query, [id], (_, { rows }) => {
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


}