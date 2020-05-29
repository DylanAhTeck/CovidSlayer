# GSI COVID SLayer

> Full stack MERN COVID Slayer app.

## Usage

Install dependencies

```bash
npm install
npm client-install
```

### Mongo connection setup

Edit your /config/config.env file to include the correct MongoDB URI if needed

### Run locally

```bash
npm run dev     # Express & React :3000 & :5000

# To run server and client separately

npm run server  # Express API Only :5000
npm run client  # React Client Only :3000
```

Note: make sure to see following on command line before using:

```bash
 Server running in development on port 5000
MongoDB Connected: cluster0-shard-00-01-0wbqe.mongodb.net
```

### Logs

All action logs are output to the console and in the commentary box.
Each game commentary is stored in a log file in the log folder.
