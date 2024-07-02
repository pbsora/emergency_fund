"use client";
import { BarChart } from "@mui/x-charts/BarChart";
import { useMemo } from "react";
import { DateTime } from "ts-luxon";
import { map } from "zod";

type ThisYearProps = {
  transactions: { [key: string]: number };
};

const ThisYear = ({ transactions }: ThisYearProps) => {
  const months = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) =>
        DateTime.now().minus({ months: i }).toFormat("LLL")
      ).reverse(),
    []
  );

  const data = new Map(Object.entries(transactions));

  const series = useMemo(
    () => months.map((month) => data.get(month) || 0),
    [data]
  );

  return (
    <div className="h-[50%] w-full">
      <BarChart
        xAxis={[
          {
            scaleType: "band",
            data: months,
          },
        ]}
        series={[{ data: series }]}
        colors={["#FFC107"]}
        className="w-full"
      />
    </div>
  );
};
export default ThisYear;
