package com.kaynetpc.voting.utils;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;

public class Helper {
    public int connected = 1, blocked = 2, incorrect = 3, failed = 4, not_exist = 0;


    public String getTodaysDate(){
        DateTimeFormatter dataFormat = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        LocalDate now = LocalDate.now();
        String curDate = dataFormat.format(now).toString();
        return curDate;
    }

    public String getCurrentYear(){
        LocalDate now = LocalDate.now();
        String currYear =  now.getYear()+"";
        return currYear;
    }


    
    /**
     * accept start and end date and check for expiration
     * @param created
     * @param expired
     * @return
     */
    public long getDateDiff(String created, String expired){
        DateTimeFormatter dateFormat =  DateTimeFormatter.ofPattern("yyyy/MM/dd");
        // System.out.println("KNT>>>>>>>>>>>>>>>>>>>>>>>>>"+LocalDate.parse(created, dateFormat));
        return ChronoUnit.DAYS.between(LocalDate.parse(created, dateFormat), LocalDate.parse(expired, dateFormat));
    }

    
    /**
     * 
     * @param dateFrom
     * @param dateTo
     * @param searchDate //yyyy/MM/dd
     * @return
     */
    public Boolean isDateWithing(String dateFrom, String dateTo, String searchDate){
        
        long diffStartToEnd = getDateDiff(searchDate, dateTo);
        long diffDateToEnd = getDateDiff(dateFrom, searchDate);
    
        if(diffDateToEnd > -1 &&  diffStartToEnd > -1){
            return true;
        } else {
            return false;
        }
    }
}
