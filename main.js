// первое задание

const firstRow = 'мама мыла раму';
const secondRow = 'собака друг человека';

const a = 'а';
let firstRowA = 0;
let secondRowA = 0;

for (i = 0; i < firstRow.length;i++) {
    if (firstRow[i] == a ){
        firstRowA++
    }
}

for (i = 0; i < secondRow.length;i++) {
    if (secondRow[i] == a ){
        secondRowA++
    }
}

console.log(firstRowA);
console.log(secondRowA);

if (firstRowA > secondRowA) {
    console.log(firstRow);
} else {
    console.log(secondRow);
}

// второе задание

const phoneNumber = '+71234567890'; // =>  '+7 (123) 456-78-90'

let changedNumber = phoneNumber;

changedNumber[12] = changedNumber[18];
changedNumber[11] = changedNumber[17];
changedNumber[10] = changedNumber[15];
changedNumber[9] = changedNumber[14];
changedNumber[8] = changedNumber[12];
changedNumber[7] = changedNumber[11];
changedNumber[6] = changedNumber[10];
changedNumber[5] = changedNumber[7];
changedNumber[4] = changedNumber[6];
changedNumber[3] = changedNumber[5];

changedNumber[3] = ' '
changedNumber[4] =
changedNumber[8] =
changedNumber[9] =
changedNumber[13] =
changedNumber[16] =

console.log(changedNumber);


