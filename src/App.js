import React, { useState } from 'react';
import './App.css';
import Customerlist from './components/Customerlist';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Traininglist from './components/Traininglist';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Calendar from './components/Calendar';

function App() {

  const [tab, setTab] =useState('one');
 
  const handleChange = (e, value) => {
    setTab(value);
  }
  
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Personal trainer app
          </Typography>
          <Tabs value={tab} onChange={handleChange} textColor="inherit">
            <Tab label="Customers" value="one" />
            <Tab label="Trainings" value="two" />
            <Tab label="Calendar" value="three" />
          </Tabs>
        </Toolbar>
      </AppBar>
        {tab === "one" && <Customerlist/>}
        {tab === "two" && <Traininglist />}
        {tab === "three" && <Calendar />}
    </div>
  );
}

export default App;
