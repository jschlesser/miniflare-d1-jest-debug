"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const d1_1 = require("@miniflare/d1");
const storage_memory_1 = require("@miniflare/storage-memory");
// @ts-check
// import Database from 'better-sqlite3'
const sql = "create table users (id integer primary key);";
const sql2 = "insert into users (id) values (?);";
const sql3 = "select id from users where id = ?;";
async function main(db) {
    const testClock = () => 750 * 1000;
    const storage = new storage_memory_1.MemoryStorage(undefined, testClock);
    const sqliteDB = await storage.getSqliteDatabase();
    db = new d1_1.D1Database(new d1_1.D1DatabaseAPI(sqliteDB));
    console.log("starting main");
    try {
        console.log('creating table');
        await db.prepare(sql).run();
        console.log('created table');
        const insertResult = await db.prepare(sql2).bind(1).run();
        console.log(insertResult);
        const result = await db.prepare(sql3).bind(1).first();
        console.log(result);
        return true;
    }
    catch (e) {
        console.log(e);
        return false;
    }
    // await up(db)
}
exports.main = main;
main();
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
