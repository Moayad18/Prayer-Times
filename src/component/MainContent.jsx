/* eslint-disable react-hooks/exhaustive-deps */
import Prayer from "./Prayer";
import { useEffect, useState } from "react";
import moment from "moment";
import "moment/dist/locale/ar-dz";
// IMPORT MU
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { prayerTimeApi } from "../sliceReducer/TimePrayReducer";
import { useDispatch, useSelector } from "react-redux";

moment.locale("ar");

export default function MainContent() {
  // STATES
  const [nextPrayerIndex, setNextPrayerIndex] = useState(0);
  const [selectedCity, setSelectedCity] = useState({
    displayName: "مكة المكرمة",
    apiName: "Makkah",
  });
  const [today, setToday] = useState("");
  const [remainingTime, setRemainingTime] = useState("");
  const dispatch = useDispatch();
  const timings = useSelector((state) => state.prayerTime.timings);
  const avilableCities = [
    {
      displayName: "مكة المكرمة",
      apiName: "Makkah",
    },
    {
      displayName: " الرياض",
      apiName: "Riyadh",
    },
    {
      displayName: " جدة",
      apiName: "Jeddah",
    },
    {
      displayName: " المدينة",
      apiName: "Madinah",
    },
    {
      displayName: " الدمام",
      apiName: "Dammam",
    },
    {
      displayName: " بريدة",
      apiName: "Buraydah",
    },
    {
      displayName: " تبوك",
      apiName: "Tabuk",
    },
  ];
  const prayerArray = [
    { key: "Fajr", displayName: "الفجر" },
    { key: "Dhuhr", displayName: "الظهر" },
    { key: "Asr", displayName: "العصر" },
    { key: "Maghrib", displayName: "المغرب" },
    { key: "Isha", displayName: "العشاء" },
  ];

  useEffect(() => {
    dispatch(prayerTimeApi(selectedCity));
  }, [selectedCity]);

  useEffect(() => {
    let interval = setInterval(() => {
      setupCountdownTimer();
    }, 1000);

    setToday(moment().format("MMM Do YYYY | h:mm"));

    return () => {
      clearInterval(interval);
    };
  }, [timings]);

  // FUNCTIONS
  const handleChange = (event) => {
    const city = avilableCities.find((city) => {
      return city.apiName == event.target.value;
    });
    setSelectedCity(city);
  };
  const setupCountdownTimer = () => {
    const momentNow = moment();
    let prayerIndex = 0;

    if (
      momentNow.isAfter(moment(timings.Fajr, "hh:mm")) &&
      momentNow.isBefore(moment(timings.Dhuhr, "hh:mm"))
    ) {
      prayerIndex = 1;
    } else if (
      momentNow.isAfter(moment(timings.Dhuhr, "hh:mm")) &&
      momentNow.isBefore(moment(timings.Asr, "hh:mm"))
    ) {
      prayerIndex = 2;
    } else if (
      momentNow.isAfter(moment(timings.Asr, "hh:mm")) &&
      momentNow.isBefore(moment(timings.Maghrib, "hh:mm"))
    ) {
      prayerIndex = 3;
    } else if (
      momentNow.isAfter(moment(timings.Maghrib, "hh:mm")) &&
      momentNow.isBefore(moment(timings.Isha, "hh:mm"))
    ) {
      prayerIndex = 4;
    } else {
      prayerIndex = 0;
    }
    setNextPrayerIndex(prayerIndex);
    // NOW AFTER KNOWING WHAT IS THE NEXT PRAYER
    const nextPrayerObject = prayerArray[prayerIndex];
    const nextPrayerTime = timings[nextPrayerObject.key];
    const nextPrayerTimeMoment = moment(nextPrayerTime, "hh:mm");

    let remainingTime = moment(nextPrayerTime, "hh:mm").diff(momentNow);

    if (remainingTime < 0) {
      const midNightDiff = moment("23:59:59", "hh:mm:ss").diff(momentNow);
      const fajrTomidnightDiff = nextPrayerTimeMoment.diff(
        moment("00:00:00", "hh:mm:ss")
      );
      const totalDiff = midNightDiff + fajrTomidnightDiff;
      remainingTime = totalDiff;
    }

    const durationRemainingTime = moment.duration(remainingTime);
    setRemainingTime(
      `${String(durationRemainingTime.hours()).padStart(2, "0")}:${String(
        durationRemainingTime.minutes()
      ).padStart(2, "0")}:${String(durationRemainingTime.seconds()).padStart(
        2,
        "0"
      )}`
    );
  };

  return (
    <div>
      {/* Start TOP ROW */}
      <Grid container spacing={2} className="counterTimeAndCity">
        <Grid size={6}>
          <div>
            <h2>{today}</h2>
            <h1 className="cityName">{selectedCity.displayName} </h1>
          </div>
        </Grid>
        <Grid size={6}>
          <h2>متبقي حتى صلاة {prayerArray[nextPrayerIndex].displayName}</h2>
          <h1 className="cityName">{remainingTime}</h1>
        </Grid>
      </Grid>
      {/* End TOP ROW */}
      <Divider style={{ borderColor: "white", opacity: "0.1" }} />
      {/* START PRAYER CARDS */}
      <Stack
        direction="row"
        justifyContent={"space-around"}
        style={{ marginTop: "50px" }}
        className="stack"
      >
        <Prayer name="الفجر" time={timings.Fajr} image="/images/mosque1.jpg" />
        <Prayer name="الظهر" time={timings.Dhuhr} image="/images/mosque2.jpg" />
        <Prayer name="العصر" time={timings.Asr} image="/images/mosque3.jpg" />
        <Prayer
          name="المغرب"
          time={timings.Maghrib}
          image="/images/mosque4.jpg"
        />
        <Prayer name="العشاء" time={timings.Isha} image="/images/mosque5.jpg" />
      </Stack>
      {/* END PRAYER CARDS */}
      <Stack
        direction="row"
        justifyContent="center"
        style={{ marginTop: "40px" }}
      >
        <FormControl
          className="selectCity"
          style={{ width: "20vw", marginBottom: "30px" }}
        >
          <InputLabel id="demo-simple-select-label">
            <span style={{ color: "white" }}>المدينة</span>
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedCity.apiName}
            label="Age"
            onChange={handleChange}
            style={{ direction: "rtl" }}
          >
            {avilableCities.map((city) => {
              return (
                <MenuItem value={city.apiName}>{city.displayName}</MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Stack>
    </div>
  );
}
