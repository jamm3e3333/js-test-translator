const express = require('express');
const hbs = require('hbs');
const path = require('path');
const app = express();
const translate = require('./utils/translate');
const port = process.env.PORT || 3030;

const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../views');
const partialsPath = path.join(__dirname, '../views/templates');

app.set('view engine','hbs');
app.set('views', viewsPath);

hbs.registerPartials(partialsPath);
app.use(express.static(publicPath));
app.use(express.json());

app.post('/send/data', async (req, res) => {
    const {text, target_ln } = req.body;
    try{
        await translate(text, 'EN', target_ln, (err, fetchedData) => {
            if(err) {
                console.log({Error: err.message});
                return res.status(400)
                          .send({Error: err.message});
            }
            const { status, data} = fetchedData;
            if(status !== 200) {
                return res.status(400)
                            .send({Error: "Something went wrong"});
            }
            res.status(200)
                .send({
                    lang: data.translations[0].detected_source_language,
                    text: data.translations[0].text
                });
        });
    }
    catch(e) {
        res.status(400)
            .send({Error: e.message});
    }
});

app.get('/', (req, res) => {
    res.render('index', {

    })
})

app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
})

