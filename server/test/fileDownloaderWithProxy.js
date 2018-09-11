const http = require('http');
const mkdirp = require('mkdirp');
const fs = require('fs');
const path = require('path');

var images = {
    "images": [
        "https://pbs.twimg.com/media/DVrtQSEWsAEwmwF.jpg",
        "https://pbs.twimg.com/media/DUWMTchW4AA9t-Q.jpg",
        "https://pbs.twimg.com/media/DUWE5iwX4AM3WgR.jpg",
        "https://pbs.twimg.com/media/DUX1bIlXcAAjjD8.jpg",
        "https://pbs.twimg.com/media/DUWM8LoX0AAExFw.jpg",
        "https://pbs.twimg.com/media/DUZt6rIW4AEWmQP.jpg",
        "https://pbs.twimg.com/media/DUWPzZ7W4AExatH.jpg",
        "https://pbs.twimg.com/media/DUWOKYHW0AEGs0s.jpg",
        "https://pbs.twimg.com/media/DUaK2-NWsAAEdfA.jpg"
    ]
};

let img = images.images[0],
    imgName = img.split('media/')[1],
    url = `https://pbs.twimg.com/media/${imgName}:large`;

const testFileDownloader = (app) => {
    app.get('/api/test/imageDownload', (req, res) => {
        http.get ({
            path: url
        }, function (response) {
            // send response before file process
            res.send('success saved');

            mkdirp(`${process.cwd()}${path.sep}downloadImages`, (err) => {
                var imageFile = fs.createWriteStream(`${process.cwd()}${path.sep}downloadImages${path.sep}test.jpg`);
                response.on("data", function(chunk){
                    imageFile.write(chunk);
                });
                response.on("end", function(){
                    // res.send('success');
                    console.log("saved png");
                });
            });
        });
    })
};

module.exports = {
    testFileDownloader
};