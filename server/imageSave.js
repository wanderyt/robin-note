const fs = require('fs');
const mkdirp = require('mkdirp');

const imageSave = (response, name, imagePath, imageFullPath) => {
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

module.exports = {
    imageSave
};