export function getDateString() {
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth(); //Current Month
    var monthName = monthNames[month];
    var year = new Date().getFullYear(); //Current Year
    return monthName + ' ' + date + ', ' + year; 
}