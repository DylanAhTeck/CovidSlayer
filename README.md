# COVID SLayer

> Full stack MERN COVID Slayer app, built for fun in 48 hours. 

## Deployed game:

https://gentle-retreat-37689.herokuapp.com/

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

### Function Description

- Register User:
  Creates a new player with the inputs of Name, Email, Password and Avatar

- Login User:
  Allows a registered user to login using (unique) Avatar and Password.

- Create Game:
  User creates a new game to slay the COVID monster.

- Attack:
  The Player attacks the COVID Monster and inflicts between 0-10 damage.
  The COVID Monster also infects the Player with 0-10 damange.

- Power Attack:
  The Player power attacks the COVID Monster and inflicts between 10-30 damage.
  The COVID Monster also retaliates with 10-30 damange.

- Healing Potion:
  The Player's health is increased by a random value between 0-10. However, they are also prone to random infections from 0-10 on their health.

- Surrender:
  The Player gives up and returns to the Start Game interface.

- Action logs:
  All action logs are output to the console.

- Commentary:
  During the game, there is a running commentary that displays the latest 10 actions and subsequently scrolls. The commentary of each game is stored in a log file in the logs folder.
