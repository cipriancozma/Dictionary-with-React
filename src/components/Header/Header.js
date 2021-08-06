import {
  TextField,
  ThemeProvider,
  createTheme,
  MenuItem,
} from "@material-ui/core";
import React from "react";
import "./Header.css";
import categories from '../../data/categories';

const Header = ({category, setCategory, word, setWord}) => {
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const handleChange = (language) => {
    setCategory(language);
    setWord("")
  }

  return (
    <div className="header">
      <h2 className="title">{word ? word : "Dictionary with React"}</h2>
      <div className="inputs">
        <ThemeProvider theme={darkTheme}>
          <TextField className="word" id="outlined-basic" variant="outlined" value={word} onChange={(e) => setWord(e.target.value)} />
          <TextField
            id="standard-select-language"
            className="select"
            select
            helperText="Please select language"
            value={category}
            onChange={(e) => handleChange(e.target.value)}
          >
              {categories.map(el => (
                  <MenuItem key={el.label} value={el.label}>{el.value}</MenuItem>
              )
            )}
          </TextField>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Header;
