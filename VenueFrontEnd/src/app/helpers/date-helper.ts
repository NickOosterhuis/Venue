import {Injectable} from '@angular/core';
import {DateAdapter} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class DateHelper {

  constructor(private adapter: DateAdapter<any>) {
    this.adapter.setLocale('nl_NL');
  }

  formatDatetoLocalDate(date: string): string {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('nl-NL');
  }

  formatDatetoLocalTime(date: string): string {
    const dateObj = new Date(date);
    return dateObj.toLocaleTimeString('nl-NL', {hour12: false});
  }

  formatDbDatetoLocalTime(date: string): string {
    const dateObj = new Date(date);
    const timeTest = dateObj.toLocaleTimeString('nl-NL', {hour12: false});

    const timeStr = timeTest.substring(0, timeTest.length - 3);
    return timeStr;
  }

  calculateTimeAgo(date: string): string {
    const dateToObj: any = new Date(date);
    const now: any = new Date();

    const seconds = Math.floor((now - dateToObj) / 1000);

    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return interval + ' years ago';
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + ' months ago';
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + ' days ago';
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + ' hours ago';
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + ' minutes ago';
    }
    return Math.floor(seconds) + ' seconds ago';
  }

  convertJSDateToDateTimeOffset(date: Date): string {
    const timeZoneOffsetMin = date.getTimezoneOffset();
    const offsetHrs = Math.abs(timeZoneOffsetMin / 60);
    const offsetMins = Math.abs(timeZoneOffsetMin % 60);

    let timezoneStandard;
    let offsetHrsStr;
    let offsetMinsStr;

    if (offsetHrs < 10) {
      offsetHrsStr = '0' + offsetHrs;
    }

    if (offsetMins < 10) {
      offsetMinsStr = '0' + offsetMins;
    }

    if (timeZoneOffsetMin < 0) {
      timezoneStandard = '+' + offsetHrsStr + ':' + offsetMinsStr;
    } else if (timeZoneOffsetMin > 0) {
      timezoneStandard = '-' + offsetHrsStr + ':' + offsetMinsStr;
    } else if (timeZoneOffsetMin === 0) {
      timezoneStandard = 'Z';
    }

    const currentDate = date.getDate();
    const currentMonth = date.getMonth() + 1;
    const currentYear = date.getFullYear();
    const currentHrs = date.getHours();
    const currentMins = date.getMinutes();
    const currentSecs = date.getSeconds();

    let convertedDateTime;

    const currentDateStr = currentDate < 10 ? '0' + currentDate.toString() : currentDate.toString();
    const CurrentMonthStr = currentMonth < 10 ? '0' + currentMonth.toString() : currentMonth.toString();
    const currentHrsStr = currentHrs < 10 ? '0' + currentHrs.toString() : currentHrs.toString();
    const currentMinsStr = currentMins < 10 ? '0' + currentMins.toString() : currentMins.toString();
    const currentSecStr = currentSecs < 10 ? '0' + currentSecs.toString() : currentSecs.toString();

    convertedDateTime =
      currentYear + '-'
      + CurrentMonthStr + '-'
      + currentDateStr + 'T'
      + currentHrsStr + ':'
      + currentMinsStr + ':'
      + currentSecStr
      + timezoneStandard;

    console.log(convertedDateTime);
    return convertedDateTime;
  }


}
