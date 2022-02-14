import express from "express"
import cors from "cors"
import admin from "firebase-admin"
import "dotenv/config"
import { botCommands } from "./commands"
import { getName } from "./services/members"

const serviceAccount = require("../serviceAccountKey.json")

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()

botCommands(db)

// shuffleJob(db)

// Initialize express
const app = express()
app.use(cors())
app.use(express.json())

app.get("/", (_req, res) => {
  res.send("Zero Sama is Up")
  db.collection("members").get()
})

app.get("/info", async (_req, res) => {
  res.json("TODO")
})

app.get("/reports", async (_req, res) => {
  res.json("TODO")
})

app.get("/reports/:username", async (req, res) => {
  const { username } = req.params
  const name = await getName(db, username)
  if (name.length == 0) res.status(400).json("Username not found")
  const member = await db.collection("members").doc(name).get()
  res.json(member.data())
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`App is running on port ${process.env.PORT || 3000}`)
})
