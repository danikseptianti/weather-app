import { Dimensions } from 'react-native'

// const GoogleApiKey = 'AIzaSyAkoTBOls-H5YPlm8v1thx866DORQ9T014';
const iosClientId = '490440028870-toqfd5dut2nqmhg4ort1rf24j6tggu6a.apps.googleusercontent.com'
const androidClientId = '431961550826-uiu3oo2raqqn4dvo87hjr5t636t3sqol.apps.googleusercontent.com'

const MyHelpers = {
  googleAuthClientId: () => {
    let result = {
      ios:iosClientId,
      android:androidClientId
    }
    return result
  },
  getFormattedDatetime: (datetime, dateDivider = ' ') => {
    let arrSplit = datetime.split(' ');
    let date = arrSplit[0];
    let time = arrSplit[1];
    let arrSplitDate = date.split('-');

    let month = '';
    switch(arrSplitDate[1]) {
      case '01': month = 'Januari'; break;
      case '02': month = 'Februari'; break;
      case '03': month = 'Maret'; break;
      case '04': month = 'April'; break;
      case '05': month = 'Mei'; break;
      case '06': month = 'Juni'; break;
      case '07': month = 'Juli'; break;
      case '08': month = 'Agustus'; break;
      case '09': month = 'September'; break;
      case '10': month = 'Oktober'; break;
      case '11': month = 'Nopember'; break;
      case '12': month = 'Desember'; break;
    }

    let tempDate = new Date(date);
    let days = '';
    let daysDivider = ', ';
    switch(tempDate.getDay()) {
      case 0: days = 'Minggu'; break;
      case 1: days = 'Senin'; break;
      case 2: days = 'Selasa'; break;
      case 3: days = 'Rabu'; break;
      case 4: days = 'Kamis'; break;
      case 5: days = 'Jumat'; break;
      case 6: days = 'Sabtu'; break;
    }

    let date1 = new Date(date);
    let date2 = new Date();
    let diffTime = Math.abs(date2.getTime() - date1.getTime());
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let newDate = `${days}${daysDivider}${arrSplitDate[2]}${dateDivider}${month}${dateDivider}${arrSplitDate[0]} ${time}`

    if(diffDays == 1) {
            return 'Hari ini, '+time+' WIB';
    } else {
        if(diffDays == 2) {
            return 'Kemarin, '+time+' WIB';
        } else {
            if(diffDays == 3) {
                return '2 hari yang lalu, '+time+' WIB';
            } else {
                return newDate;
            }
        }
    }
  },
  getFormattedDatetime2: (datetime, dateDivider = ' ') => {
    let arrSplit = datetime.split(' ');
    let date = arrSplit[0];
    let time = arrSplit[1];
    let arrSplitDate = date.split('-');

    let month = '';
    switch(arrSplitDate[1]) {
      case '01': month = 'Januari'; break;
      case '02': month = 'Februari'; break;
      case '03': month = 'Maret'; break;
      case '04': month = 'April'; break;
      case '05': month = 'Mei'; break;
      case '06': month = 'Juni'; break;
      case '07': month = 'Juli'; break;
      case '08': month = 'Agustus'; break;
      case '09': month = 'September'; break;
      case '10': month = 'Oktober'; break;
      case '11': month = 'Nopember'; break;
      case '12': month = 'Desember'; break;
    }

    let tempDate = new Date(date);
    let days = '';
    let daysDivider = ', ';
    switch(tempDate.getDay()) {
      case 0: days = 'Minggu'; break;
      case 1: days = 'Senin'; break;
      case 2: days = 'Selasa'; break;
      case 3: days = 'Rabu'; break;
      case 4: days = 'Kamis'; break;
      case 5: days = 'Jumat'; break;
      case 6: days = 'Sabtu'; break;
    }

    let date1 = new Date(date);
    let date2 = new Date();
    let diffTime = Math.abs(date2.getTime() - date1.getTime());
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let newDate = `${days}${daysDivider}${arrSplitDate[2]}${dateDivider}${month}${dateDivider}${arrSplitDate[0]}`

    if(diffDays == 1) {
            return 'Hari ini, '+time+' WIB';
    } else {
        if(diffDays == 2) {
            return 'Kemarin, '+time+' WIB';
        } else {
            if(diffDays == 3) {
                return '2 hari yang lalu, '+time+' WIB';
            } else {
                return newDate;
            }
        }
    }
  },
  getDateName: (date) => {
    let arrSplitDate = date.split('-')
    let month = '';
    switch (arrSplitDate[1]) {
      case '01': month = 'Jan'; break;
      case '02': month = 'Feb'; break;
      case '03': month = 'Mar'; break;
      case '04': month = 'Apr'; break;
      case '05': month = 'Mei'; break;
      case '06': month = 'Jun'; break;
      case '07': month = 'Jul'; break;
      case '08': month = 'Agu'; break;
      case '09': month = 'Sep'; break;
      case '10': month = 'Okt'; break;
      case '11': month = 'Nop'; break;
      case '12': month = 'Des'; break;
    }

    let tempDate = new Date(date);
    let days = '';
    switch (tempDate.getDay()) {
      case 0: days = 'Minggu'; break;
      case 1: days = 'Senin'; break;
      case 2: days = 'Selasa'; break;
      case 3: days = 'Rabu'; break;
      case 4: days = 'Kamis'; break;
      case 5: days = 'Jumat'; break;
      case 6: days = 'Sabtu'; break;
    }
    
    return days
  },
  getToday: () => {
    let date = new Date();
    let mYear = date.getFullYear()
    
    let mMonth = date.getMonth()+1
    if(mMonth < 10) {mMonth = '0'+mMonth}

    let mDate = date.getDate()
    if(mDate < 10){ mDate='0'+mDate }

    let thisDay = mYear +"-"+ mMonth +"-"+ mDate
    return thisDay
  },
  getMonthYearName: (prMonth=null, prYear=null) => {
    let date = new Date();
    let mYear
    let mMonth
    if(prMonth == null && prYear == null) {
      mYear = date.getFullYear()
      mMonth = date.getMonth()+1
    } else {
      mYear = prYear
      mMonth = prMonth
    }
    
    let month = ""
    switch (mMonth) {
      case 1: month = 'Januari'; break;
      case 2: month = 'Februari'; break;
      case 3: month = 'Maret'; break;
      case 4: month = 'April'; break;
      case 5: month = 'Mei'; break;
      case 6: month = 'Juni'; break;
      case 7: month = 'July'; break;
      case 8: month = 'Agustus'; break;
      case 9: month = 'September'; break;
      case 10: month = 'Oktober'; break;
      case 11: month = 'Nopember'; break;
      case 12: month = 'Desember'; break;
    }
    
    let thisMonthYear = month +" "+ mYear
    return thisMonthYear
  },
  formatDate: (pYear, pMonth, pDate) => {
    if(pDate<10) {
        pDate='0'+pDate;
    } 
    
    if(pMonth<10) {
        pMonth='0'+pMonth;
    } 
    
    let finalDate = pYear +'-'+ pMonth +'-'+ pDate
    return finalDate
  },
  formatShortDate: (date) => {
    let arrSplitDate = date.split('-')
    let month = '';
    switch (arrSplitDate[1]) {
      case '01': month = 'Jan'; break;
      case '02': month = 'Feb'; break;
      case '03': month = 'Mar'; break;
      case '04': month = 'Apr'; break;
      case '05': month = 'Mei'; break;
      case '06': month = 'Jun'; break;
      case '07': month = 'Jul'; break;
      case '08': month = 'Agu'; break;
      case '09': month = 'Sep'; break;
      case '10': month = 'Okt'; break;
      case '11': month = 'Nop'; break;
      case '12': month = 'Des'; break;
    }

    return arrSplitDate[2] +" "+ month +" "+arrSplitDate[0]
  },
  getTime: (datetime) => {
    let arrSplitDate = datetime.split('-')
    let strSplitDate = arrSplitDate[2].toString()
    return strSplitDate.substring(3,8)
  },
  getTimeFromNewDate: (params) => {
    let datetime = params.toString()
    let arrSplitDate = datetime.split(' ')
    return arrSplitDate[4]
  },
  getDate: (datetime) => {
    let arrSplitDate = datetime.split(' ')
    return arrSplitDate[0]
  },
  getInitial: (name) => {
    let splitName = name.split(" ")
    let initial = name.charAt(0);
    // let second = "";
    if(splitName[1] !== undefined) {
      initial += splitName[1].charAt(0)
    }

    // let result = first+second
    return initial.toUpperCase()
  },
  formatNumber: (amount, format=null) => {
    let result;
    if(amount!=null) {
      amount = Math.ceil(amount)
      result = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    } else {
      result = amount;
    }
    let prefix;
    if(format=='idr') {
      prefix = 'Rp ';
    } else {
      prefix = '';
    }

    return prefix+result;
  },
  getScreenWidth: () => {
    let SCREEN_WIDTH = Math.round(Dimensions.get('screen').width)
    return SCREEN_WIDTH
  },
  getScreenHeight: () => {
    let SCREEN_HEIGHT = Math.round(Dimensions.get('screen').height)
    return SCREEN_HEIGHT
  },
  isPortrait: () => {
    let dim = Dimensions.get('screen')
    return dim.height >= dim.width
  },
  isTablet: () => {
    let dim = Dimensions.get('screen')
    if(dim.width <= 600) {
      return false
    } else {
      return true
    }
  },
  capitalize: (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
  strRegex: (string) => {
    const regex = /(<([^>]+)>)/ig
    var str = string
    var strReplace = str.replace(regex, '')
    var strReplace2 = strReplace.replace(/\u00a0/g, ' ')
    var strReplace3 = strReplace2.replace(/&amp;/g, ' & ')
    var strReplace4 = strReplace3.replace(/&nbsp;/g, ' ')
    return strReplace4
  },
  delBr: (string) => {
    var str = string
    var strReplace = str.replace(/<p><br[\/]?><[\/]?p>/g, '')
    return strReplace
  },
  getTypeColor: (type) => {
    let result = {
      background:"#64788D",
      color:"#FFFFFF",
    }
    if(type == 'katalog') {
      result = {
        background:"#f39c12",
        color:"#FFFFFF",
      }
    }
    if(type == 'agenda') {
      result = {
        background:"#3498db",
        color:"#FFFFFF",
      }
    }

    // console.log('getTypeColor', result)

    return result
  }
}

export default MyHelpers;