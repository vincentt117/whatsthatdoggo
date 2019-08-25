import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';


const AWS = require('aws-sdk');
var s3 = new AWS.S3({
    accessKeyId: '',
    secretAccessKey: '',
    region: 'us-east-5'
  });

const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const SimpleCard = () => {
    const classes = useStyles();
    const [results, setResults] = useState([]);
  
    useEffect(() => {
      getResults();
    }, []);
  
    async function getResults() {
          // var response = await fetch('https://jsonplaceholder.typicode.com/users?username=Bret');
          // const results = await response.json();
          // console.log(results);
          // setResults(results);

        
        setTimeout(function () {
          s3.getObject({
            Bucket: 'doggos-pred-output',
            Key: "output.json"
            }, function (err, data) {

            if (err) {
                console.log(err);
            } else {
                // const results = JSON.parse(data.Body.toString());
                console.log(JSON.parse(data.Body.toString()));
                setResults(JSON.parse(data.Body.toString()));
                getResults();
            }
        
        });
        }, 3000);

    }

    
    
  
    return (
        <Card className={classes.card}>
        <CardContent>
        <CardMedia
          className={classes.media}
          style = {{ height: 0, paddingTop: '56%'}}
          image= {require ("../assets/img/logo.png")}
          />
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            This doggo is a
          </Typography>
          <Typography variant="h5" component="h2">
          {results.breed}
          </Typography>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Predicted with <b>{results.confidence}</b> confidence!
          </Typography>
          {/* <Typography variant="h5" component="h2">
          {results.confidence}
          </Typography> */}
        </CardContent>
      </Card>
    );
  };

export default SimpleCard;
