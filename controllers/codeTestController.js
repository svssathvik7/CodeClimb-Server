const fs = require("fs");
const path = require('path');
const runCodeController = async (req,res,filename)=>{
    const buildName = filename+ new Date().getTime();
    const {qId} = req.body;
    console.log(qId);
}
const codeTestPipeline = async (req, res) => {
    const { code, submissionId,qId } = req.body;
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
            runCodeController(req,res,filePath);
        });
    });
}

module.exports = { codeTestPipeline };