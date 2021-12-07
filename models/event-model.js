const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Event = new Schema(
    {
        title: { type: String, required: true },
        date: { type: Date, required: true },
        text: { type: String, required: true },
    },
    { timestamps: true },
)