import { D1Database, D1DatabaseAPI } from "@miniflare/d1";
import { MemoryStorage } from "@miniflare/storage-memory";

// @ts-check
// import Database from 'better-sqlite3'

const sql = "create table users (id integer primary key);"
const sql2 = "insert into users (id) values (?);"
const sql3 = "select id from users where id = ?;"

export async function main(db?: D1Database) {
  const testClock = () => 750 * 1000
  const storage = new MemoryStorage(undefined, testClock);
  const sqliteDB = await storage.getSqliteDatabase();
  db = new D1Database(new D1DatabaseAPI(sqliteDB));
  console.log("starting main")
  try {
    console.log('creating table')
    await db.prepare(sql).run()
    console.log('created table')
    const insertResult = await db.prepare(sql2).bind(1).run()
    console.log(insertResult)
    const result = await db.prepare(sql3).bind(1).first()
    console.log(result)
    return true
  } catch(e) {
    console.log(e)
    return false
  }
  
  
  // await up(db)
  
}

main()


/*
export async function main() {
  const db = new Database(":memory:")
  console.log('created database')
  var info = db.prepare(sql).run()
  console.log('ran statement', info)
  info = db.prepare(sql2).run()
  console.log('ran statement', info)
  info = db.prepare(sql3).all()
  console.log('ran statement', info)
  return info
}
*/
