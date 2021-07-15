const { app, port } = require('./src/app');

app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
})