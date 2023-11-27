import { compareDesc, format } from 'date-fns';

export type TSelectDate = {
  year: string;
  month: string;
  day: string;
  hours: string;
  min: string;
  date: string;
};

export type Period = {
  from?: Date;
  to?: Date;
};

// https://date-fns.org/v2.16.1/docs/format
export class DateFns {
  public year: number = new Date().getFullYear();
  public month: number = new Date().getMonth();

  public getMonths = (): string[] => {
    const months = Array.from(Array(this.month), (_, i) => {
      return format(new Date(new Date().getFullYear(), i + 1, i + 1), 'MMMM');
    });
    return months;
  };

  public getAllMonths = (): string[] => {
    const months = Array.from(Array(12), (_, i) => {
      return format(new Date(new Date().getFullYear(), i + 1, i + 1), 'MMMM');
    });
    return months;
  };

  public getDay = (): number => {
    return Number(format(new Date(), 'dd MMMM yyyy').substring(0, 2));
  };

  public getDaysInWeek = (): string[] => {
    return Array.from(Array(7), (_, i) => {
      return format(new Date(new Date().getFullYear(), new Date().getMonth(), i + 1), 'dd');
    });
  };

  public getDaysInMonth = (
    type: 'eeee' | 'eee' | 'do' | 'd' | 'dd' = 'dd',
    month: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
    year: number = new Date().getFullYear(),
  ): string[] => {
    const f = new Date(year, month);
    const days = format(f, 'dd');
    const getMonth: number = month || new Date().getMonth();
    return Array.from(Array(Number(days)), (_, i) => {
      return format(new Date(year, getMonth, i + 1), type);
    });
  };

  public getDayName = (type: 'eeee' | 'eee' | 'eeeeee' | 'eo' | 'e' | 'ee' = 'ee'): number => {
    return Number(format(new Date(), type).substring(0, 2));
  };

  public format = (date: Date | null): string => {
    if (date === null) return '';
    return format(date, 'dd-MM-yyyy');
  };

  public format2 = (date: Date | number | null): string => {
    if (date === null) return '';
    return format(date, 'hh:mm:ss');
  };

  public getMonthYear = (month: 'MM' | 'MMMM' = 'MMMM'): string => {
    return format(new Date(new Date().getFullYear(), new Date().getMonth()), `${month} yyyy`);
  };

  public getSelectDate = (
    date: string | Date,
    monthFormat: 'MM' | 'MMMM' = 'MMMM',
    dayFormat: 'dd' | 'eee' | 'eeee' = 'dd',
  ): TSelectDate => {
    const payload = format(new Date(date), `mm kk ${dayFormat} ${monthFormat} yyyy`);
    const year = format(new Date(date), `yyyy`);
    const month = format(new Date(date), monthFormat);
    const day = format(new Date(date), dayFormat);
    const hours = format(new Date(date), `kk`);
    const min = format(new Date(date), `mm`);
    return { year, month, day, hours, min, date: payload };
  };
  /*** https://date-fns.org/v2.30.0/docs/compareDesc
   ** now === to = 0
   ** now < to  = 1
   ** now > to  = -1
   */
  public compareDesc = (from: number | Date, to: number | Date): 0 | 1 | -1 => {
    const value = compareDesc(from, to);
    if (value === 1) return 1;
    if (value === 0) return 0;
    else return -1;
  };

  public isPeriod = (date: string | Date | null, period?: Period): boolean => {
    if (date === null) return false;
    const newDate = new Date(date);

    if (period?.from && period?.to) {
      const dateFrom = new Date(period.from);
      const dateTo = new Date(period.to);
      const isValidTo = this.compareDesc(dateFrom, newDate);
      const isValidFrom = this.compareDesc(newDate, dateTo);
      return isValidTo !== -1 && isValidFrom !== -1;
    } else if (period?.from) {
      const from = new Date(period.from);
      const isValid = this.compareDesc(from, newDate);
      return isValid !== -1;
    } else if (period?.to) {
      const to = new Date(period.to);
      const isValid = this.compareDesc(newDate, to);

      return isValid !== -1;
    }

    return true;
  };
}
