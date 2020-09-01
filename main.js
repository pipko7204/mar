import random from "./utils.js"
import Pokemon from "./pokemon.js";

const player1 = new Pokemon({
    name: 'Pikachu',
    hp: '500',
    selectors: 'character',
    type: 'electric',
});
const player2 = new Pokemon({
    name: 'Charmander',
    hp: '450',
    selectors: 'enemy',
    type: 'fire',
});


const $btn = document.getElementById('btn-kick');
const $superHit = document.getElementById('super-hit');

const btnCountJolt = countBtn( 10, $btn);
const btnCountJolt2 = countBtn2(3, $superHit);

function countBtn(count = 3, el) {
    const innerText = el.innerText;
    el.innerText = `${innerText} (${count})`;
    return function () {
        count--;
        if (count === 0 ) {
            el.disabled = true;
        }
        el.innerText = `${innerText} (${count})`;
        return count;
    }
}

function countBtn2(count = 3, el) {
    const innerText = el.innerText;
    el.innerText = `${innerText} (${count})`;
    return function () {
        count--;
        if (count === 0) {
            el.disabled = true;
        }
        el.innerText = `${innerText} (${count})`;
        return count;
    }
}

$btn.addEventListener('click', function () {
    btnCountJolt();
    console.log('Kick');
    player1.changeHP(random(50, 15),function (count) {
        console.log(generateLog(player1, player2, count));
    });
    player2.changeHP(random(50, 15),function (count) {
        console.log(generateLog(player2, player1, count));
    });
    if(player1.hp.current === 0 || player2.hp.current === 0) {
        $btn.disabled = true;
        $superHit.disabled = true;
        alert('Бой завершён!');
    }
});

$superHit.addEventListener('click', function () {
    btnCountJolt2();
    console.log('SUPER KICK');
    player1.changeHP(random(120, 50),function (count) {
        console.log(generateLog(player1, player2, count));
    });
    player2.changeHP(random(120, 50),function (count) {
        console.log(generateLog(player2, player1, count));
    });
    if(player1.hp.current === 0 || player2.hp.current === 0) {
        $btn.disabled = true;
        $superHit.disabled = true;
        alert('Бой завершён!');
    }
});

function init() {
    console.log('Start Game!');
    player1.renderHP();
    player2.renderHP();
}

let i = 0.5;

function generateLog(firstPerson, secondPerson, count) {
    const logs = [
        `${firstPerson.name} вспомнил что-то важное, но неожиданно ${secondPerson.name}, не помня себя от испуга, ударил в предплечье врага. -${count}HP [${firstPerson.hp.current}/${firstPerson.hp.total}]`,
        `${firstPerson.name} поперхнулся, и за это ${secondPerson.name} с испугу приложил прямой удар коленом в лоб врага.-${count}HP [${firstPerson.hp.current}/${firstPerson.hp.total}]`,
        `${firstPerson.name} забылся, но в это время наглый ${secondPerson.name}, приняв волевое решение, неслышно подойдя сзади, ударил.-${count}HP [${firstPerson.hp.current}/${firstPerson.hp.total}]`,
        `${firstPerson.name} пришел в себя, но неожиданно ${secondPerson.name} случайно нанес мощнейший удар.-${count}HP [${firstPerson.hp.current}/${firstPerson.hp.total}]`,
        `${firstPerson.name} поперхнулся, но в это время ${secondPerson.name} нехотя раздробил кулаком \<вырезанно цензурой\> противника.-${count}HP [${firstPerson.hp.current}/${firstPerson.hp.total}]`,
        `${firstPerson.name} удивился, а ${secondPerson.name} пошатнувшись влепил подлый удар.-${count}HP [${firstPerson.hp.current}/${firstPerson.hp.total}]`,
        `${firstPerson.name} высморкался, но неожиданно ${secondPerson.name} провел дробящий удар.-${count}HP [${firstPerson.hp.current}/${firstPerson.hp.total}]`,
        `${firstPerson.name} пошатнулся, и внезапно наглый ${secondPerson.name} беспричинно ударил в ногу противника.-${count}HP [${firstPerson.hp.current}/${firstPerson.hp.total}]`,
        `${firstPerson.name} расстроился, как вдруг, неожиданно ${secondPerson.name} случайно влепил стопой в живот соперника.-${count}HP [${firstPerson.hp.current}/${firstPerson.hp.total}]`,
        `${firstPerson.name} пытался что-то сказать, но вдруг, неожиданно ${secondPerson.name} со скуки, разбил бровь сопернику.-${count}HP [${firstPerson.hp.current}/${firstPerson.hp.total}]`
    ];
    return logs[random(logs.length)-1, 0];
}

//const $logs = document.querySelector('#logs');

init();

