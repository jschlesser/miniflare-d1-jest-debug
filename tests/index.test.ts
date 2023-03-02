import { main } from "../src";

test('basic test',async ()=>{
  expect(await main()).toBeTruthy();
});