const fs = require("fs");
const path = require('path');

const codeTestController = async (req, res) => {
    const { code, submissionId } = req.body;
    const fileName = submissionId.endsWith('.c') ? submissionId : `${submissionId}.c`;
    const directoryPath = path.join("./", 'codes');
    const filePath = path.join(directoryPath, fileName);

    fs.mkdir(directoryPath, { recursive: true }, (err) => {
        if (err) {
            console.error('Error creating directory:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        fs.writeFile(filePath, code, (err) => {
            if (err) {
                console.error('Error writing C code to file:', err);
                res.status(500).send('Internal Server Error');
                return;
            }

            console.log(`C code saved to ${filePath}`);
            res.status(200).send('C code saved successfully');
        });
    });
}

module.exports = { codeTestController };