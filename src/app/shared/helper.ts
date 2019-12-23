/**
* Generates a randon GUID
*/
export function randonGuidGenerator(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}

/**
* Formats date to MM/DD/YYYY
* @param date The date to be formatted
*/
 export function formatDate(date: string | Date): string {
    var dateToFormat = new Date(date);
    var year = dateToFormat.getFullYear();

    var month = (1 + dateToFormat.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
  
    var day = dateToFormat.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    
    return month + '/' + day + '/' + year;
  }

/**
* Formats date to MM-DD-YYYY
* @param date The date to be formatted
*/
  export function formatDateToDatePicker(date: string | Date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  }
