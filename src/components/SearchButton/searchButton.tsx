import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./searchButton.scss";

const SearcButton = () => {
  const [startDate, setStartDate] = useState<any>(new Date());

  return (
    <div className="input-group m-2 w-25 d-flex">
      <DatePicker
        className="form-control"
        wrapperClassName="datePicker"
        onChange={(date: Date) => setStartDate(date)}
        selected={startDate}
        name="data-picker"
        dateFormat="yyyy-MM-dd"
      />
      <input type="text" className="form-control" placeholder="Search" aria-label="Search-form" />
      <div className="input-group-append">
        <span className="input-group-text" id="basic-addon2" role="button">
          search
        </span>
      </div>
    </div>
  );
};

export default SearcButton;