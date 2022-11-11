const fs = require('fs');
const path = require('path');

const getDependencies = filename => {
    const filePath = path.join(__dirname, filename);
    fs.readFile(filePath, {encoding: 'utf-8'}, (error, data) => {
        if (error) {
            console.error('Error:', error);
            return [null, error];
        }
        const dependencies = JSON.parse(data).dependencies;
        console.log(dependencies);
        return [dependencies, null];
    });
};

const dependencies = getDependencies(process.argv[2]);
