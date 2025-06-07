const { error } = require("console");
const fs = require("fs");
const { isSharedArrayBuffer } = require("util/types");

const PAGE_SIZE = 4096;
const DB_FILE = "data.db";

function openDB() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, Buffer.alloc(PAGE_SIZE));
  } else {
    return fs.openSync(DB_FILE, "r+");
  }
}
function writePage(buffer, fd, pageNum) {
  if (buffer.length !== PAGE_SIZE) {
    throw new Error("buffer must be 4096 bites");
  } else {
    const offset = pageNum * PAGE_SIZE;
    fs.writeSync(fd, buffer, 0, PAGE_SIZE, offset);
  }
}

function readPage(fd, pageNum) {
  const buffer = Buffer.alloc(PAGE_SIZE);
  fs.readSync(fd, buffer, 0, PAGE_SIZE, pageNum * PAGE_SIZE);
  return buffer;
}

module.exports = {
  openDB,
  writePage,
  readPage,
};

const pointer = openDB();
const massage = "well building my first database ";
const padsting = massage.padEnd(PAGE_SIZE, "/0");
console.log(padsting);
const buffer = Buffer.from(padsting);
console.log(buffer);
writePage(buffer, pointer, 1);
const data = readPage(pointer, 1);
const readData = data.toString();
console.log(readData);
