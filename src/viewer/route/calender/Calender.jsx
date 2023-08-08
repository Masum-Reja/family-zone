import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Back from "../../../service/Form/Back";
import Heading from "../../../service/Form/Heading";
function MyCalendar() {
  const [value, onChange] = useState(new Date());

  return (
    <div className="h-screen max-w-screen-xl mx-auto px-2 py-20">
      <Back />
      <Heading heading="Calender" />
      <div className="flex justify-center items-center flex-col">
        <Calendar onChange={onChange} value={value} />
      </div>
    </div>
  );
}
export default MyCalendar;
