const path = require('path');
const express = require('express');
let cors = require('cors');
const app = express();
const http = require('http').createServer(app);

app.use(cors());
if (process.env.NODE_ENV === 'production') {
    app.disable("x-powered-by")
    app.use(express.static(path.resolve(__dirname, './build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, './build', 'index.html'));
    })
}
const port = process.env.PORT || 8000;
http.listen(port, () => console.log(`Server started on port ${port}`));
