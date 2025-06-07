# Custom DB Storage (Low-level File Access with Node.js `fs`)

I created a custom `.db` file using Node.js's built-in `fs` module to mimic how databases like SQLite store and manage data in **pages**.

---

## Topics to Remember

### `fs.openSync(path, flags)`
- Opens a file (or creates it if it doesn't exist, with flags like `"r+"`).
- Returns a **file descriptor (`fd`)**, which is like a pointer to the file.
- This `fd` is used later for reading and writing.

**Example:**

```js
const fd = fs.openSync("data.db", "r+");
## `fs.readSync` and `fs.writeSync`

These are low-level synchronous methods provided by Node.js's `fs` module to read from and write to files at the byte level. They are essential when working with binary files or implementing custom database storage engines.

---

### `fs.readSync(fd, buffer, offset, length, position)`

Reads data from a file descriptor into a buffer.

| Parameter | Description                                                                                     |
|-----------|------------------------------------------------------------------------------------------------|
| `fd`      | File descriptor obtained from `fs.openSync`                                                    |
| `buffer`  | A `Buffer` object where the read bytes will be stored                                          |
| `offset`  | The offset in the buffer to start writing data into (usually `0`)                              |
| `length`  | Number of bytes to read from the file                                                          |
| `position`| The offset from the beginning of the file to start reading (if `null`, reads from current position) |

**Returns:** Number of bytes read.

**Example:**

```js
const buffer = Buffer.alloc(PAGE_SIZE);
const bytesRead = fs.readSync(fd, buffer, 0, PAGE_SIZE, pageNum * PAGE_SIZE);
console.log(`Read ${bytesRead} bytes from page ${pageNum}`);

