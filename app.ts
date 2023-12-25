import express from "express"
import { PORT } from "./config"
const app: any = express()
app.use(express.json())
app.listen(PORT, () => {
    console.log(`MovieAPI now listening to ${PORT}`)
})
app.get('/status', (req, res) => {
    console.log(req.params)
    const status = {
        "Status": "Running"
    }
    res.json(status)
});