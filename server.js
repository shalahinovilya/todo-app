import app from "./index.js";
import mongoose from "mongoose";
import {config} from "./config.js";

const DB_URL = `mongodb+srv://user:${config.DB_PASSWORD}@cluster0.zpyskne.mongodb.net/?retryWrites=true&w=majority`
const PORT = config.PORT || 5001


async function startUp () {
    await mongoose.connect(DB_URL)
    app.listen(PORT, () => {
        console.log(`app listening on port ${PORT}`)
    })
}

startUp()