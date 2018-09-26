const
    { WacaiModel } = require('../models/wacai_model'),
    fs = require('fs'),
    { WACAI_SESSION } = process.env || require('../../constants'),
    mkdirp = require('mkdirp'),
    path = require('path');

const getWacaiData = ({fromDate, toDate}, resp) => {
    const formatCurrentDate = () => {
        let current = new Date(),
            month = current.getMonth() > 8 ? String(current.getMonth() + 1) : 0 + String(current.getMonth() + 1),
            day = current.getDate() > 9 ? current.getDate() : 0 + String(current.getDate());
        return `${current.getFullYear()}-${month}-${day}`;
    }

    let wacaiModel = new WacaiModel({
        sessionId: WACAI_SESSION
    });

    let start = fromDate || '2015-10-01',
        end = toDate || formatCurrentDate(),
        pageIndex = 1;

    let filePath = `${process.cwd()}${path.sep}server${path.sep}wacai${path.sep}files`,
        fileName = `finData-from-${start}-to-${end}.json`,
        fileFullPath = `${filePath}${path.sep}${fileName}`;

    // If data has been saved, no need to retrieve again.
    // TO-DO: ADD FORCE OPTION TO REFRESH DATA
    if (fs.existsSync(fileFullPath)) {
        let outputData = require(fileFullPath);
        resp.setHeader('Content-Type', 'application/json');
        resp.json({data: outputData});
    } else {
        let dataSetDefer = new Promise((resolve, reject) => {
            wacaiModel.fetchData({
                startDate: start,
                endDate: end,
                pageIndex: pageIndex
            }).then((data) => {
                var pageTotal = data.pi.pageCount;
                console.log(`recordsCount is ${data.pi.recordsCount}`);

                // Append data
                console.log(`pageIndex is ${pageIndex}, pageTotal is ${pageTotal}`);
                console.log(`fetchData at ${pageIndex}`);
                wacaiModel.appendData(data);
                console.log(`wacaiModel length is ${wacaiModel.finData.length}`);

                // Fetch more
                if (pageTotal > 1) {
                    pageIndex++;
                    // https://stackoverflow.com/questions/40328932/javascript-es6-promise-for-loop
                    // Loop promise
                    (function loop(i) {
                        if (i <= pageTotal) {
                            new Promise(resolve => {
                                wacaiModel.fetchData({
                                    startDate: start,
                                    pageIndex: i
                                }).then((data) => {
                                    console.log(`pageIndex is ${i}, pageTotal is ${pageTotal}`);
                                    console.log(`fetchData at ${i}`);
                                    wacaiModel.appendData(data);
                                    console.log(`wacaiModel length is ${wacaiModel.finData.length}`);
                                    resolve();
                                });
                            }).then(loop.bind(null, i + 1))
                        } else {
                            resolve();
                        }
                    })(pageIndex);
                } else {
                    resolve();
                }
            }, (error) => reject(error));
        })

        dataSetDefer.then(() => {
            console.log(`wacaiModel length is ${wacaiModel.finData.length}`);

            // output wacai data
            var finalOutput = formatWacaiData(wacaiModel.finData);
            resp.setHeader('Content-Type', 'application/json');
            resp.json({data: finalOutput});

            console.log('start to write file: ' + fileFullPath);
            console.log(fs.existsSync(fileFullPath));

            if (!fs.existsSync(fileFullPath)) {
                mkdirp(filePath, (err) => {
                    fs.writeFile(fileFullPath, JSON.stringify(finalOutput), (err) => {
                        if (err) {
                            console.log(`Saving file finData-from-${start}-to-${end}.json failed!`);
                        }
                        console.log(`file finData-from-${start}-to-${end}.json has been saved!`);
                    });
                });
            }
        }, (error) => {
            resp.statusCode = 500;
            resp.send('fail');
            console.log(`data fetch failed... ${error}`);
        });
    }
}

const formatWacaiData = (data) => {
    let output = [];

    output = data.map(({id, date, comment, typeTitle, money}) => {
        return {
            id,
            date,
            comment,
            category: typeTitle.split('-')[0],
            subcategory: typeTitle.split('-')[1],
            money
        }
    });

    return output;
};

module.exports = {
    getWacaiData
};
