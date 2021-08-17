const fs = require('fs');

function writeDataToFile(filename, content) {
  return fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
    if (err) {
      console.log(err);
    }
  });
}

function getPostData(req) {
  return new Promise((resolve, reject) => {
    try {
      let body = [];

      req.on('data', (chunk) => {
        body.push(chunk);
      });

      req.on('end', () => {
        body = Buffer.concat(body).toString();
        resolve(body);
      });
    } catch (error) {
      console.log(error);
    }
  });
}

module.exports = { getPostData, writeDataToFile };
