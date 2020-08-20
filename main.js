// первое задание

const firstRow = 'мама мыла раму';
const secondRow = 'собака друг человека';

const a = 'а';
let firstRowA = 0;
let secondRowA = 0;

for (let i = 0; i < firstRow.length;i++) {
    if (firstRow[i] == a ){
        firstRowA++
    }
}

for (let i = 0; i < secondRow.length;i++) {
    if (secondRow[i] == a ){
        secondRowA++
    }
}

if (firstRowA > secondRowA) {
    console.log(firstRow);
} else {
    console.log(secondRow);
}

// второе задание

const phoneNumber = '+71234567890'; // =>  '+7 (123) 456-78-90'

function numberOfDigits(number) {
    let wewe = number.length;
    return wewe;
}

let changedNumber = '';
for(let i = 0; i < phoneNumber.length; i++) {
    changedNumber += phoneNumber.charAt(i);
    if (i == 1) {
        changedNumber += ' ('
    } else if (i == 4) {
        changedNumber += ') '
          } else if (i == 7) {
        changedNumber += '-';
    } else if (i == 9) {
        changedNumber += '-';
    }
}
console.log(changedNumber);
