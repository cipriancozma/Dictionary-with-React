import { Container, withStyles, Switch } from '@material-ui/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Body from './components/Body/Body';
import Header from './components/Header/Header';

function App() {
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState([]);
  const [category, setCategory] = useState("en");
  const [lightMode, setLightMode] = useState(false);

  const IOSSwitch = withStyles((theme) => ({
    root: {
      width: 42,
      height: 26,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 1,
      '&$checked': {
        transform: 'translateX(16px)',
        color: theme.palette.common.white,
        '& + $track': {
          backgroundColor: 'blue',
          opacity: 1,
          border: 'none',
        },
      },
      '&$focusVisible $thumb': {
        color: '#52d869',
        border: '6px solid #fff',
      },
    },
    thumb: {
      width: 24,
      height: 24,
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: theme.palette.grey[50],
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
  }))(({ classes, ...props }) => {
    return (
      <Switch
        focusVisibleClassName={classes.focusVisible}
        disableRipple
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          thumb: classes.thumb,
          track: classes.track,
          checked: classes.checked,
        }}
        {...props}
      />
    );
  });

  const fetchData = async () => {
    try {
      const data = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`);
      setMeaning(data.data)
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, [word, category])

  return (
    <div className="App" style={{height: "100vh", backgroundColor: lightMode ? "darkcyan" : "gray", color: "white", transition: "all 0.6s linear"}}>
      <Container maxWidth="sm" className="container">
        <div style={{position: "absolute", top: 0, right: 15, paddingTop: 10}}>
          <span>{lightMode ?  "Cyan" : "Light"} Mode</span>
         <IOSSwitch checked={lightMode} onChange={() => setLightMode(!lightMode)} />
        </div>
         <Header category={category} setCategory={setCategory} word={word} setWord={setWord}/>
         {meaning && <Body word={word} meaning={meaning} category={category}/>}
      </Container>
    </div>
  );
}

export default App;
