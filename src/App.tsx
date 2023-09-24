import React, { useState, useEffect } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
// import Calendar from "./components/Calendar";
import MyButton from "./components/myButton";
import PopUp from "./components/Notifications";
// import { Fade } from 'react-reveal';
import HappiPaddie from './assets/happypaddie.jpeg';
import SaddiePaddie from './assets/sadpaddie.jpeg';
import {Modal, Box, Card} from "@mui/material";
import Fitness from './components/fitness';
import Hygeine from './components/Hygeine';
import CalendarPage from './components/CalendarPage';

function App() {
  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);

  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const [open3, setOpen3] = React.useState(false);
  const handleOpen3 = () => setOpen3(true);
  const handleClose3 = () => setOpen3(false);
  // initialiozign popup bools
    // categories of messages
    // paddie's bools
  const [timedPopups, setTimedPopups] = useState<string[]>([]);
  const categories = ["Nutrition 🍎", "Fitness 🏃‍♂️", "Cycle 💖"];
  // const categories = {"Nutrition 🍎", "Fitness 🏃‍♂️", "Cycle 💖"};
  const [sadShowPaddie, setSaddiePaddie] = useState(false);
  // const FudReminders = ["Drink some water", "Have you had breakfast today?", "Have you had a fruit today?"];
  // const FitReminders = ["Loosen up your body for 30 seconds!", "Roll your shoulders back", "Hav"]
  
  // reminders; useEffects to randomly assign reminders of diff categories and random times LOL
  useEffect(() => {
    const interval = setInterval(() => {
      const randomCategoryIndex = Math.floor(Math.random() * categories.length);
      const newCategory = categories[randomCategoryIndex];
      setTimedPopups((prevPopups) => [...prevPopups, newCategory]);
    }, Math.floor((Math.random() * 60000) + 300000));
    return () => clearInterval(interval);
  }, [categories]);

  function setTimedFud(arg0: boolean): void {
    throw new Error("error ;-;");
  }

  // when user press yes, paddie happi (change saddie image)
  const handleYesButtonClick = (removing: string) => {
    setSaddiePaddie(false); 
    setTimedPopups((prevPopups) => prevPopups.filter((category) => category !== removing));
  };

  // when usser press no, paddie sadge (change saddie image)
  const handleNoButtonClick = (removing: string) => {
    setSaddiePaddie(true); 
    setTimedPopups((prevPopups) => prevPopups.filter((category) => category !== removing));
  };

  const fudQuotes = ["Have you drank some water", "Have you had breakfast today?", "Have you had a fruit today?", "Have you taken your vitamin B12 supplements?"];
  const fitQuotes = ["Have you stretched today?", "Roll your shoulders back", "Have you taken a break to look long distancez?", "Have you played a sport this weeK?"]
  // let cycQuotes = [""]

  return (
    <>
    <div className="my-button-container">
      <MyButton onClick={handleOpen1}>Cycle</MyButton>
      <Box>
        <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
          <Card sx={{margin:"2rem",position: "absolute", top:"15%", left: "25%"}}><CalendarPage></CalendarPage></Card>
      </Modal>
      </Box>
      <MyButton onClick={handleOpen2}>Fitness</MyButton>
      <Box>
        <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
          <Card sx={{position: "absolute", top:"25%", left: "25%"}}><Fitness></Fitness></Card>
      </Modal>
      </Box>
      <MyButton onClick={handleOpen3}>Hygeine</MyButton>
      <Box>
        <Modal
        open={open3}
        onClose={handleClose3}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
          <Card sx={{position: "absolute", top:"30%", left: "35%"}}><Hygeine></Hygeine></Card>
      </Modal>
      </Box>
    </div>

    {/* div for paddie <3*/}
    <div className="paddie-home">
        {sadShowPaddie ? (
          <img className="paddie-image" src={SaddiePaddie} alt="SaddiePaddie" />
        ) : (
          <img className="paddie-image" src={HappiPaddie} alt="HappiPaddie" />
        )}
      </div>

    <div className="my-box"> 
      <div>
        <h1> Task Bar </h1>
      </div>

      <div className="shadow-box">
        <p className="tasPar"> <br/> Paddie is healthy and happy!</p>
        {timedPopups.map((category, index) => (
            <div className="popup-container" key={index}>
              <PopUp trigger={true} setTrigger={setTimedFud}>
              <h3>{category}</h3>
                {category === "Nutrition 🍎" ? (
                  <p>{fudQuotes[Math.floor(Math.random() * fudQuotes.length)]}</p>
                ) : category === "Fitness 🏃‍♂️" ? (
                  <p>{fitQuotes[Math.floor(Math.random() * fitQuotes.length)]}</p>
                ) : (
                  <p> Did you put deoderant on today?</p>
                )}
 
                <div className="button-pop">
                  <button onClick={() => handleYesButtonClick(category)}>Yes</button>
                  <button onClick={() => handleNoButtonClick(category)}>No</button>
                </div>
                
              </PopUp>
            </div>
          ))}
        
      </div>
    </div> 
    </>
  );
}

export default App;