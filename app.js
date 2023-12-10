import express from 'express'
import conn from './conn/conn.js'
import path,{dirname} from 'path'
import { fileURLToPath } from 'url';
import auth from './routes/auth.js'
import cors from 'cors'
import list from './routes/list.js'
const app = express()
const PORT = 1000
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
app.use(express.json())
app.use(cors())
app.use('/api/v1', auth)
app.use('/api/v2', list)


app.get("/",(req,res) => {
    app.use(express.static(path.resolve(__dirname,"frontend","build")))
    res.sendFile(path.resolve(__dirname,"frontend","build","index.html"))
})

app.listen(PORT, () => {
    console.log("Server stared")
})