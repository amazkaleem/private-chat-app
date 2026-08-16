# A Simple Clubhouse Clone

A private chat application inspired by Clubhouse, built as part of The Odin Project series.


## 🛠️ Tech Stack

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) ![Passport](https://img.shields.io/badge/Passport.js-34E27A?style=for-the-badge&logo=passport&logoColor=white) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white) ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

## 🚀 App Features
- Users should be able to  Sign Up/Log In with their username and password with "Session Based Auth"
- Users are categorized into "Visitors", "Members", and "Admins"
- Visitors can only receive messages (without author/date labels) and create new messages
- Visitors can upgrade to Members and can view messages (with author/date labels) as well
- Members can upgrade to Admins and can delete messages, view members list and remove them as well.
- Only Members and Admins mark messages as read

## 🗺️ System Design
The functional/nonfunctional requirements, data math and high level API Design can be read in the `systemDesign.txt` file.
The high level system design and the data model can be viewed in the images, `High Level System Design.png` and `Data Model.png` respectively.



## 📁.env Setup

### 🗄️ Database

To run the database,

```bash
POSTGRES_DB={DB_NAME}
POSTGRES_USER={DB_USERNAME}
POSTGRES_PASSWORD={DB_PASSWORD}
DB_PORT={PORT}
```

### 🍪 Session & Cookies

For session-based authentication,

```bash
FOO_COOKIE_SECRET={YOUR_SECRET}
```


## ⚙️ Installation

Install project dependencies,

```bash
npm install
cd my-project
```

Run the server,

```
npm run dev
```

To transpile Typescript to Javascript,

```
npm run build
```