const express = require('express');
const bodyParser = require('body-parser');

// Set up the express app
const app = express();

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));

let runPy = (videoKey) => {
    return new Promise(function (success, nosuccess) {

        const {
            spawn
        } = require('child_process');
        const pythonProcess = spawn('python', ["./extract_video_uri.py", videoKey]);

        pythonProcess.stdout.on('data', function (data) {

            success(data);
        });

        pythonProcess.stderr.on('data', (data) => {

            nosuccess(data);
        });
    })
};

app.get('/ytfetch', (req, res) => {
    //getting request body
    const reqData = req.query;
    // checking for format of request
    if (reqData.k) {
        runPy(reqData.k).then((fromRunpy) => {
            res.end(fromRunpy);
        }).catch((error) => {
            res.end(error);
        });
    } else {
        res.status(400).send({
            ex: 'Invalid format of response body'
        });
    }
});

// Setting port for both local and server
var PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});