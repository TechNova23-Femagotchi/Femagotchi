
import React from "react";
import Calendar from "react-calendar";
import {
  Button,
  Container,
  DialogActions,
  TextField,
  Typography,
  dialogActionsClasses,
  styled,
} from "@mui/material";
import { Box } from "@mui/material";
import { useState } from "react";
import { DatePicker, StaticDatePicker } from "@mui/x-date-pickers";
import { DateCalendar } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Dayjs } from "dayjs";
import { BarChart } from "@mui/x-charts";
import { set } from "date-fns";
import { display } from "@mui/system";
import { PickersActionBar } from "@mui/x-date-pickers/PickersActionBar";


const CalendarPage = () => {
  const [date, setDate] = React.useState<Dayjs | null>(null);
  const [expDay, setExpDay] = React.useState(new Date());
  const [avg, setAvg] = React.useState(28);
  const [periods, setPeriods] = React.useState(new Array<number>());
  const [exp, setExp] = React.useState(
    "Your period is expected to start in 28 days."
  );


  function addCycle() {
    if (
      date != null &&
      periods.includes(+date.toDate()) == false &&
      +date.toDate() - +new Date() < 0
    ) {
      periods.push(+date);
      setPeriods(periods);
      periods.sort();
      periods.reverse();


      let a = "";
      for (let i = 0; i < periods.length; i++) {
        a += periods[i] + ", ";
      }


      newAvg();
    }
  }


  function removeDate(d: number) {
    document.getElementById("cycle" + d).style.display = "none";
    periods.splice(periods.indexOf(d), 1);
    setPeriods(periods);
    newAvg();
  }


  function newAvg() {
    let avg = 28;
    if (periods.length != 1) {
      avg =
        (periods[0] - periods[periods.length - 1]) /
        ((periods.length - 1) * 1000 * 60 * 60 * 24);
    }
    setAvg(avg);
    newAvgMessage();
  }


  function newAvgMessage() {
    let x = Math.round(
      (avg * 24 * 60 * 60 * 1000 + periods[0] - +new Date()) /
        (24 * 60 * 60 * 1000)
    );
    let d = new Date(avg + periods[0]);
    setExpDay(
      new Date(
        Math.round(
          (avg * 24 * 60 * 60 * 1000 + periods[0] - +new Date()) /
            (24 * 60 * 60 * 1000)
        )
      )
    );
    if (x > 0 && x != 1) {
      setExp("Your period is expected to start in " + x.toString() + " days.");
    } else if (x == 1) {
      setExp("Your period is expected to start tomorrow.");
    } else if (x == 0) {
      setExp("Your period is expected to start today.");
    } else {
      setExp(
        "Your period was expected to start " +
          (x * -1).toString() +
          " days ago. Make sure to log your period when it starts!"
      );
    }
  }


  return (
    <>
      <Box
        sx={{padding:"2rem", display: "flex", gap: 1, flexWrap: "wrap", flexDirection: "row" }}
      >
        <Box>
          <Box>
            <Typography sx={{ width: 300 }}>{exp}</Typography>
          </Box>


          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            localeText={{
              okButtonLabel: "Log period",
              cancelButtonLabel: "Cancel",
            }}
          >
            <StaticDatePicker
              value={date}
              onChange={(newValue: React.SetStateAction<Dayjs | null>) =>
                setDate(newValue)
              }
              renderInput={(params) => <TextField {...params} />}
              componentsProps={{
                actionBar: {
                  actions: [],
                },
              }}
            ></StaticDatePicker>
          </LocalizationProvider>


          <Button
            sx={{ border: 1 }}
            className="logPeriod"
            onClick={() => addCycle()}
          >
            Log period
          </Button>
        </Box>
        <div style={{ width: 350, height: 300, overflow: "auto" }}>
          <Box
            sx={{
              width: "90%",
              maxHeight: 200,
              whiteSpace: "nowrap",
            }}
          >
            <Typography>Your cycles</Typography>
            {periods.map((p) => (
              <>
                <Container
                  id={"cycle" + p}
                  sx={{
                    backgroundColor: "#e8b5cf",
                    padding: 1,
                    margin: 2,
                    borderRadius: 2,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography>{new Date(p).toDateString()}</Typography>
                  <Button
                    sx={{
                      padding: 0,
                      margin: 0,
                      color: "#000",
                      border: 1,
                    }}
                    onClick={() => removeDate(p)}
                  >
                    X
                  </Button>
                </Container>
              </>
            ))}
          </Box>
        </div>
      </Box>
    </>
  );
};


export default CalendarPage;