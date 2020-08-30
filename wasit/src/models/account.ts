import * as SQLite from 'expo-sqlite'

interface AccountSchema {
  id?: number
  name?: string
  username?: string
  password?: string
  phone?: string
  lastSigned?: string
  bio?: string
}

export default class Account {
 
  static get tableName() {
    return 'accountasdsoioasdoaasodllsoasasssal'
  }

  static get database () {
    return  SQLite.openDatabase("dbV10.db", '1.0.1')
  }
  static createTable () {
    this.database.transaction(tx => {
      tx.executeSql(
        `create table if not exists ${this.tableName} (
            id INTEGER PRIMARY KEY NOT NULL,
            name TEXT,
            username TEXT UNIQUE,
            phone TEXT,
            password TEXT,
            bio TEXT,
            token TEXT,
            signedAccount BOOLEAN,
            lastSigned DATETIME DEFAULT CURRENT_TIMESTAMP,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
          );
        `
      );
    });
  }

  static async createAndSigned (params: AccountSchema) {
    console.log('params -> ', params);
    
    const keys = Object.keys(params)
    const lineKeys = keys.join(', ')
    const values = keys.map((key) => (params[key]))
    const questions = '? ' + ', ?'.repeat(values.length - 1)

    const query = `
      INSERT OR REPLACE INTO ${this.tableName} (${lineKeys}) 
      VALUES (${questions});
    `
    return new Promise(
      (resolve, reject) => {
        this.database.transaction(
        tx => {
          tx.executeSql(query, values, (_, { rows }) => {
              
            }, (_, err: any) => {
              err.storage = true //seta que o erro no catch é do storage
              reject(err)
              return true
            }
          );
          tx.executeSql(`
            UPDATE ${this.tableName} SET signedAccount = 0 WHERE id != last_insert_rowid();
            SELECT * FROM ${this.tableName} WHERE id = last_insert_rowid();`, [], (_, { rows }) => {
            resolve(rows.item(0))
          }, (_, err: any) => {
            err.storage = true //seta que o erro no catch é do storage
            reject(err)
            return true
          })
        },null)
      }
    )
  }

  static findSigned (): Promise<any> {
    const query = `SELECT * FROM ${this.tableName} WHERE signedAccount = ?;`
    return new Promise(
      (resolve, reject) => {
        this.database.transaction(tx => {
        tx.executeSql(query, [1], (_, { rows }) => {
            resolve(rows.item(0))
        }, (_, err) => {
          console.log('findSigned ->', err);
          reject(err)
          return false
        }
        );
      })
      }
    )
  }
  static findByUserIdAndSigned (userId: number): Promise<object> {
    const query = `
      UPDATE ${this.tableName} SET signedAccount = 1 WHERE id == ?;
    `
    return new Promise(
      (resolve, reject) => {
        this.database.transaction(tx => {
        tx.executeSql(query, [userId], (_, { rows }) => {

        }, (_, err) => {
          console.log(err);
          reject(err)
          return false
        }
        );
        tx.executeSql(`
          UPDATE ${this.tableName} SET signedAccount = 0 WHERE id != ?;
          `, [userId], (_, { rows }) => {

        }, (_, err) => {
          console.log('findSigned ->', err);
          reject(err)
          return false
        }
        );
        tx.executeSql(`
          SELECT * FROM ${this.tableName} WHERE id = ?;
          `, [userId], (_, { rows }) => {
          console.log(rows['_array'], ' 00000000');
          
          resolve(rows.item(0))
        }, (_, err) => {
          console.log('findSigned ->', err);
          reject(err)
          return false
        }
        );
      })
      }
    )
  }

  static findAllOrderByLastSigned (skip: number, top: number) { 
    const query = `SELECT * FROM ${this.tableName} ORDER BY lastSigned DESC LIMIT ? OFFSET ?;`
    return new Promise(
      (resolve, reject) => {
        this.database.transaction(tx => {
        tx.executeSql(query, [top, skip], (_, { rows }) => {
            console.log(rows['_array'], 'contac');
            
            resolve(rows['_array'])
            return true
        }, (_, err) => {
          console.log('findAllOrderByLastSigned -> ', err);
          reject(err)
          return true
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