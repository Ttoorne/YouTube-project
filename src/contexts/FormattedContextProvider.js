import moment from "moment";
import React, { createContext, useContext } from "react";
import "moment/locale/ru";

export const formattedContext = createContext();
export const useFormat = () => useContext(formattedContext);

moment.locale("ru");

const FormattedContextProvider = ({ children }) => {
  const formatRelativeTime = (date) => {
    const diff = moment().diff(date, "minutes");
    if (diff === 0) {
      return "только что";
    } else if (diff < 60) {
      return `${diff} ${pluralize(diff, ["минуту", "минуты", "минут"])} назад`;
    } else if (diff < 1440) {
      const hours = Math.floor(diff / 60);
      return `${hours} ${pluralize(hours, ["час", "часа", "часов"])} назад`;
    } else if (diff < 10080) {
      // 7 days * 24 hours * 60 minutes
      const days = Math.floor(diff / 1440);
      return `${days} ${pluralize(days, ["день", "дня", "дней"])} назад`;
    } else if (diff < 43200) {
      const weeks = Math.floor(diff / 10080);
      return `${weeks} ${pluralize(weeks, [
        "неделю",
        "недели",
        "недель",
      ])} назад`;
    } else if (diff < 525600) {
      // 365 days * 24 hours * 60 minutes
      const months = Math.floor(diff / 43200);
      return `${months} ${pluralize(months, [
        "месяц",
        "месяца",
        "месяцев",
      ])} назад`;
    } else {
      const years = Math.floor(diff / 525600);
      return `${years} ${pluralize(years, ["год", "года", "лет"])} назад`;
    }
  };

  const pluralize = (count, words) => {
    const cases = [2, 0, 1, 1, 1, 2];
    return words[
      count % 100 > 4 && count % 100 < 20 ? 2 : cases[Math.min(count % 10, 5)]
    ];
  };
  const formatViews = (views) => {
    const lastTwoDigits = views % 100;
    const lastNumber = views % 10;

    if (views >= 1000000) {
      const millionViews = (views / 1000000).toFixed(1).replace(/\.0$/, "");
      return `${millionViews.replace(".", ",")} млн просмотров`;
    } else if (views >= 1000) {
      const thousandViews = (views / 1000).toFixed(1).replace(/\.0$/, "");
      return `${thousandViews.replace(".", ",")} тыс. просмотров`;
    } else if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
      return `${views} просмотров`;
    } else if (lastNumber === 1) {
      return `${views} просмотр`;
    } else if (lastNumber > 1 && lastNumber < 5) {
      return `${views} просмотра`;
    } else {
      return `${views} просмотров`;
    }
  };

  const values = {
    formatViews,
    formatRelativeTime,
  };
  return (
    <formattedContext.Provider value={values}>
      {children}
    </formattedContext.Provider>
  );
};

export default FormattedContextProvider;
