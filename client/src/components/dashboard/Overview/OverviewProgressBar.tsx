"use client";

import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { DateTime } from "ts-luxon";
import { date } from "zod";

const OverviewProgressBar = ({
  value,
}: {
  value: number;
}) => {
  return (
    <div className="flex-1 mb-2 m-auto w-full flex items-center justify-center">
      <div className="w-8/12 visible dark:hidden font-mono">
        <CircularProgressbar
          value={value}
          text={`${value}%`}
          styles={buildStyles({
            pathColor: "#FFDF00",
            trailColor: "#d6d6d6",
            textColor: "#000000",
          })}
          className="text-white"
        />
      </div>
      <div className="w-8/12 hidden dark:block font-mono">
        <CircularProgressbar
          value={66}
          text="66%"
          styles={buildStyles({
            pathColor: "#FFDF00",
            trailColor: "#d6d6d6",
            textColor: "#ffffff",
          })}
          className="text-white"
        />
      </div>
    </div>
  );
};
export default OverviewProgressBar;
