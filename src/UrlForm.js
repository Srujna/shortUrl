import React, { useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import OpenInNew from '@material-ui/icons/OpenInNew';
import FileCopy from '@material-ui/icons/FileCopy';
import { makeStyles } from '@material-ui/core/styles';
import img from './images/tiny.png';
import styles from './UrlForm.css';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: '300px 100px',
    backgroundPosition: 'center',
    height: '880px',
    width: '900px'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// set up text to print, each item in array is new line
  const content =()=>{
    const message =["Welcome to Tinify URL..."];
    let i =0 ;
    let jsxArray = [];
    for(i=0; i<message.length;i++){
      jsxArray.push(
        <div className='background'>
          <h1 className="typewriter">
              {message[i]}    
          </h1>
        </div>
       );
    }
    return jsxArray;
  }

const UrlForm = ({handleTinify, urlError, url, setUrl, tinyUrl, openInNew }) => {
  const classes = useStyles();
  const textAreaRef = useRef(null);
  const [copySuccess, setCopySuccess] = useState('');

  const copyToClipboard = (e) => {
    textAreaRef.current.select();
    document.execCommand('copy');
    // This is just personal preference.
    // I prefer to not show the the whole text area selected.
    e.target.focus();
    setCopySuccess('Copied!');
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={5} md={5}>
        <img src={img} alt="cannot display" className={classes.image} />
      </Grid>
      <Grid item xs={12} sm={7} md={7} component={Paper} elevation={6} square style={{backgroundColor: 'rgb(0 53 245 / 50%)' }}>
        <div className={classes.paper}>
        {content()}
          <div className="formElement">
            <form className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="url"
                  label="Enter URL"
                  name="url"
                  autoFocus
                  autoComplete="false"
                  error={urlError}
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  helperText={urlError?"Url is invalid!":""}
                />
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={() => handleHoldStart()}
                >
                  Tinify!
                </Button>
                {true && (<div>
                  <textarea
                    ref={textAreaRef}
                    value={tinyUrl}
                    readOnly
                  />{copySuccess} <br/>
                  {document.queryCommandSupported('copy') &&
                  (<Tooltip title="Copy to clipboard">
                    <IconButton color="primary" aria-label="Copy to clipboard" component="span" onClick={copyToClipboard}>
                      <FileCopy />
                    </IconButton>
                  </Tooltip>)} {"         "}
                  <Tooltip title="Open url in new tab">
                    <IconButton color="primary" aria-label="Open url in new tab" component="span" onClick={openInNew}>
                      <OpenInNew />
                    </IconButton>
                  </Tooltip>
                </div>)}
            </form>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

export default UrlForm;