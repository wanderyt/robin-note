const fs = require('fs');
const mkdirp = require('mkdirp');

const imageSaveByHTTPResponse = (response, name, imagePath, imageFullPath) => {
    if (!fs.existsSync(imageFullPath)) {
        mkdirp(imagePath, (err) => {
            var imageFile = fs.createWriteStream(imageFullPath);
            response.on("data", function(chunk){
                imageFile.write(chunk);
            });
            response.on("end", function(){
                console.log(`Save image ${name} success`);
            });
        });

        response.on("error", () => {
            console.error(`Save image ${name} failed`);
        })
    } else {
        console.log(`image ${name} has been saved before!`);
    }
}

const imageSaveByRequest = (imgData, name, imagePath, imageFullPath) => {
    if (!fs.existsSync(imageFullPath)) {
        mkdirp(imagePath, (err) => {
            // var imageFile = fs.createWriteStream(imageFullPath);
            // imageFile.write(imgData, 'binary');
            // imageFile.once('drain', () => {
            //     console.log(`Save image ${name} success`);
            // });
            fs.writeFile(imageFullPath, imgData, 'binary', (err) => {
                if (err) {
                    console.log(`Error occured when saving image ${name}!`);
                } else {
                    console.log(`Save image ${name} success`);
                }
            })
        });
    } else {
        console.log(`image ${name} has been saved before!`);
    }
}


module.exports = {
    imageSave: imageSaveByHTTPResponse,
    imageSaveByRequest
};