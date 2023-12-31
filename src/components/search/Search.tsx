"use client";

import { ChangeEvent, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
// @ts-ignore
import debounce from "lodash.debounce";

import { AppDispatch } from "@/redux/store";
import { changeSearchValue } from "@/redux/slices/searchSlice";

import styles from "./search.module.scss";
import search from "@/assets/images/staticImages/search.png";
import close from "@/assets/images/staticImages/close.png";

const Search: React.FC = () => {
  const [value, setValue] = useState("");
  const dispatch: AppDispatch = useDispatch();

  const onClear = () => {
    setValue("");
    dispatch(changeSearchValue(""));
  };

  const debouncedGetWeatherInfo = useCallback(
    debounce((value: string) => {
      dispatch(changeSearchValue(value));
    }, 1000),
    []
  );

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    debouncedGetWeatherInfo(e.target.value);
  };

  return (
    <div className={styles.root}>
      <Image src={search} alt="search" className={styles.icon} />
      <input
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Enter the city"
      />

      {value && (
        <Image
          onClick={onClear}
          className={styles.close}
          src={close}
          alt="close"
        />
      )}
    </div>
  );
};

export default Search;
