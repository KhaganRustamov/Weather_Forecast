"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { getThisDay } from "@/services/getData";
import styles from "./thisDay.module.scss";
import DynamicImages from "@/assets/images/dynamicImages/DynamicImages";
import clock from "@/assets/images/staticImages/clock.png";
import navigation from "@/assets/images/staticImages/navigation.png";

const ThisDay = () => {
  const [data, setData] = useState({});
  const currentTime = new Date();

  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  useEffect(() => {
    getThisDay().then(setData);
  }, []);

  const { temp, city, weatherType } = data;

  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <div>
          <div className={styles.temp}>{temp}°</div>
          <div className={styles.day}>Today</div>
        </div>
        <DynamicImages weatherType={weatherType} />
      </div>
      <div className={styles.bottom}>
        <div className={styles.time}>
          <Image src={clock} alt="clock" />
          <div>{formattedTime}</div>
        </div>
        <div className={styles.city}>
          <Image src={navigation} alt="nav" />
          <div>{city}</div>
        </div>
      </div>
    </div>
  );
};

export default ThisDay;
