import mongoose from "mongoose"


const {Schema} = mongoose

const Note = new Schema({

    content: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date, default: Date.now
    },

    updatedAt: {
        type: Date, default: Date.now
    },

})


export default mongoose.model('Note', Note)

