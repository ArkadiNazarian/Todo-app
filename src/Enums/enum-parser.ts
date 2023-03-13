import * as enums from "./enums";

export const getMonthTitle = (value: number) => {
    switch (value) {
        case enums.Month.January:
            return "January";
        case enums.Month.February:
            return "February";
        case enums.Month.March:
            return "March";
        case enums.Month.April:
            return "April";
        case enums.Month.May:
            return "May";
        case enums.Month.June:
            return "June";
        case enums.Month.July:
            return "July";
        case enums.Month.August:
            return "August";
        case enums.Month.September:
            return "September";
        case enums.Month.October:
            return "October";
        case enums.Month.November:
            return "November";
        case enums.Month.December:
            return "December";
        default:
            break;
    }
}

export const getWeekdayTitle=(value: number)=>{
    switch (value) {
        case enums.WeekDay.Sunday:
            return "Sun";
        case enums.WeekDay.Monday:
            return "Mon";
        case enums.WeekDay.Tuesday:
            return "Tue";
        case enums.WeekDay.Wednesday:
            return "Wed";
        case enums.WeekDay.Thursday:
            return "Thu";
        case enums.WeekDay.Friday:
            return "Fri";
        case enums.WeekDay.Saturday:
            return "Sat";
        default:
            break;
    }
}

export const getPriorityColor=(value: number)=>{
    switch (value) {
        case enums.Priority.Red:
            return "#bd0416";
        case enums.Priority.Orange:
            return "#f57c02";
        case enums.Priority.Blue:
            return "#0356fc";
        case enums.Priority.White:
            return "#cfcfcf";
        default:
            break;
    }
}

export const getPriorityTitle=(value: number)=>{
    switch (value) {
        case enums.Priority.Red:
            return "P1";
        case enums.Priority.Orange:
            return "P2";
        case enums.Priority.Blue:
            return "P3";
        case enums.Priority.White:
            return "P4";
        default:
            break;
    }
}