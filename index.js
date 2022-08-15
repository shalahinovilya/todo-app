import express from 'express'
import * as path from "path";
import Note from "./src/models/Note.js";


const app = express()

app.use(express.static(path.resolve('src', 'public', 'css')))
app.use(express.urlencoded({ extended: true }));

app.set('views', path.resolve('src', 'views'))
app.set('view engine', 'ejs')


app.get('/', async (req, res) => {
    const notes = await Note.find()
    res.render('index', {notes})
})

app.post('/', async (req, res) => {

    if (!req.body.content.length) return res.redirect('/')

    await Note.create({
        content: req.body.content,
        createdAt: new Date(),
        updatedAt: new Date()
    }).finally(() => res.redirect('/'))

})

app
    .route('/update-note/:id')

    .get(async (req, res) => {

        const notes = await Note.find()

        res.render('update-note', {
            currentNoteId: req.params.id,
            notes
        })
    })

    .post(async (req, res) => {

    const note = await Note.findById(req.params.id)

    if (!req.body.content) return res.redirect('/')

    await note.update({
        content: req.body.content,
        updatedAt: new Date()
    })

    res.redirect('/')
})


app.get('/delete-note/:id', async (req, res) => {

    await Note.deleteOne({_id: req.params.id}).catch(() => res.redirect('/'))

    res.redirect('/')

})

export default app