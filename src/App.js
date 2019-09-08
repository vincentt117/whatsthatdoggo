import React from 'react';
import './App.css';

// Filepond
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

// Result
import SimpleCard from './components/SimpleCard';
const AWS = require('aws-sdk');

var s3 = new AWS.S3({
  accessKeyId: '',
  secretAccessKey: '',
  region: 'us-east-5'
});

const fpStyle = {
  opacity: 0.8,
};

const scStyle = {
  opacity: 0.8,
  position: 'absolute', left: '50%', top: '50%',
  transform: 'translate(-50%, -50%)'
};


registerPlugin(FilePondPluginImagePreview);

function App() {
  return (
<div className="App">
<div>
  <div style={fpStyle}><FilePond
  server={
    {
          process: function(fieldName, image, metadata, load, error, progress, abort) {
            s3.upload({
                Bucket: 'doggos-input',
                Key: Date.now() + '_' +  image.name,
                Body: image,
                ContentType: image.type,
                ACL: 'public-read'
            }, function(err, data) {

                if (err) {
                    alert(err);
                    return;
                }

                // pass file unique id back to filepond
                load(data.Key);

            });
  
          }
        }
    }/></div>
  <div>
  <div style={scStyle}><SimpleCard /></div>
</div>
</div>
</div>
  );
}



export default App;
