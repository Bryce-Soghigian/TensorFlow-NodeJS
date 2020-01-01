const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mobilenet = require('@tensorflow-models/mobilenet');
const tfnode = require('@tensorflow/tfjs-node');



const server = express();
server.use(cors(),helmet())

const PORT = process.env.PORT || 5555;

server.listen(PORT, () => {
    console.log("=======Server is up========")
})

server.get("/",(req,res) => {
    res.json({api:"SERVER IS ALIVE"})
})
/*
take an image url 
run it through classifer
send response back to user.
*/
const readImage = path => {
    // const imageBuffer = fs.readFileSync(path);
    const imageBuffer = req.body
    const tfimage = tfnode.node.decodeImage(imageBuffer);
    return tfimage;
  }

  const imageClassification = async path => {
    const image = readImage(path);
    const mobilenetModel = await mobilenet.load();
    const predictions = await mobilenetModel.classify(image);
    console.log('Classification Results:', predictions);
  }
  if (process.argv.length !== 3) throw new Error('Incorrect arguments: node classify.js <IMAGE_FILE>');
  imageClassification(process.argv[2]);

server.post("/",(req,res) => {
    const path = req.body
    const readImage = path => {
        // const imageBuffer = fs.readFileSync(path);
        const imageBuffer = req.body
        const tfimage = tfnode.node.decodeImage(imageBuffer);
        return tfimage;
      }
      const imageClassification = async path => {
        const image = readImage(path);
        const mobilenetModel = await mobilenet.load();
        const predictions = await mobilenetModel.classify(image);
        console.log(predictions,"<===== Results")

      }
    
})
