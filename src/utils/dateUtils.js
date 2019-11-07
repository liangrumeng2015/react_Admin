/**
 * 
 * @param {*} time 
 * 格式化日期
 */
function formateDate(time){
    if(!time) return '';
    let date = new Date(time)
    return date.getFullYear() + '-' +twoDigitNum(date.getMonth() + 1) + '-' + twoDigitNum(date.getDate()) + ' ' + twoDigitNum(date.getHours()) + ':' + twoDigitNum(date.getMinutes()) + ':' + twoDigitNum(date.getSeconds())
}
function twoDigitNum(num){
    if(num > 10){
        return num
    }else{
        return '0' + num;
    }
}
export default formateDate;


