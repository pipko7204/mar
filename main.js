
const $btn = document.getElementById('btn-kick');
const character = {
    name: 'Pikachu',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),
    render: renderHP,
    change: changeHP,
};

const enemy = {
    name: 'Charmander',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),
    render: renderHP,
    change: changeHP,
};

const {name, defaultHP, damageHP, elHP, elProgressbar, render,change} = character;
const {nameEnemy, defaultHPEnemy, damageHPEnemy, elHPEnemy, elProgressbarEnemy, renderEnemy,changeEnemy} = enemy;

$btn.addEventListener('click', function () {
    console.log('Kick');
    character.change(random(20));
    enemy.change(random(20));

});

function init() {
    console.log('Start Game!');
    character.render();
    enemy.render();
}

function renderHP() {
    this.elHP.innerText = this.damageHP + ' / ' + this.defaultHP;
    this.elProgressbar.style.width = this.damageHP + '%';
}

let i = 0.5;

function changeHP(count) {
    this.damageHP -= count;

    const log = this === enemy ? generateLog(this, character, count) : generateLog(this, enemy, count);
    console.log(`раунд ${Math.ceil(i)}`, log);

    addLog(log, count)

    if (this.damageHP <= 0) {
        this.damageHP = 0;
        alert('Бедный  '+ this.name + ' проиграл бой!');
        $btn.disabled = true;
        $superHit.disabled = true;
        }
        i+= 0.5;
    renderHP.call(this);
}

const random = (num) => Math.ceil(Math.random() * num);

function generateLog(firstPerson, secondPerson, count) {
    const logs = [
        `${firstPerson.name} вспомнил что-то важное, но неожиданно ${secondPerson.name}, не помня себя от испуга, ударил в предплечье врага. -${count}HP [${firstPerson.damageHP}/100]`,
        `${firstPerson.name} поперхнулся, и за это ${secondPerson.name} с испугу приложил прямой удар коленом в лоб врага.-${count}HP [${firstPerson.damageHP}/100]`,
        `${firstPerson.name} забылся, но в это время наглый ${secondPerson.name}, приняв волевое решение, неслышно подойдя сзади, ударил.-${count}HP [${firstPerson.damageHP}/100]`,
        `${firstPerson.name} пришел в себя, но неожиданно ${secondPerson.name} случайно нанес мощнейший удар.-${count}HP [${firstPerson.damageHP}/100]`,
        `${firstPerson.name} поперхнулся, но в это время ${secondPerson.name} нехотя раздробил кулаком \<вырезанно цензурой\> противника.-${count}HP [${firstPerson.damageHP}/100]`,
        `${firstPerson.name} удивился, а ${secondPerson.name} пошатнувшись влепил подлый удар.-${count}HP [${firstPerson.damageHP}/100]`,
        `${firstPerson.name} высморкался, но неожиданно ${secondPerson.name} провел дробящий удар.-${count}HP [${firstPerson.damageHP}/100]`,
        `${firstPerson.name} пошатнулся, и внезапно наглый ${secondPerson.name} беспричинно ударил в ногу противника.-${count}HP [${firstPerson.damageHP}/100]`,
        `${firstPerson.name} расстроился, как вдруг, неожиданно ${secondPerson.name} случайно влепил стопой в живот соперника.-${count}HP [${firstPerson.damageHP}/100]`,
        `${firstPerson.name} пытался что-то сказать, но вдруг, неожиданно ${secondPerson.name} со скуки, разбил бровь сопернику.-${count}HP [${firstPerson.damageHP}/100]`
    ];
    return logs[random(logs.length)-1];
}

const $logs = document.querySelector('#logs');

function addLog(log, count) {
    const $p = document.createElement('p');

    $p.innerText = `Раунд:${Math.ceil(i)} ${log} `;
    $logs.insertBefore($p, $logs.children[0])
}

const $superHit = document.getElementById('super-hit');

$superHit.addEventListener('click', function () {
    console.log('SUPER KICK');
    character.change(random(20)+ 10);
    enemy.change(random(20)+ 10);
})

function numberOfClicks(quantity) {
    let clicks = 0;
    return function () {
        clicks++;
        console.log(`Щёлканий по кнопке: ${clicks}`);
        quantity--;
        console.log(`ударов этого типа осталось: ${quantity}`);
    }
}

const quantityOfNormalHit = 5;
const quantityOfSuperHit = 3;

const firstBtn = numberOfClicks(quantityOfNormalHit);
const secondBtn = numberOfClicks(quantityOfSuperHit);

let j = 0;
$btn.addEventListener('click', function () {
    firstBtn();
    j++;
    if( j === quantityOfNormalHit) {
        this.disabled = true;
    }
});

let k = 0;
$superHit.addEventListener('click', function () {
    secondBtn();
    k++;
    if (k === quantityOfSuperHit){
        this.disabled = true;
    }
});

// я не совсем понимаю для чего нужна деструктуризация, объясни, пожалуйста. или это вопрос к гуглу?

//я так же не смог придумать как замыканием задизейблить кнопки. Если в самом замыкании вывести 'this' то
//покажет объект 'window'. подскажи как достать из замыкания внутренние переменные. в моём случае 'clicks' и 'quanyity'.
//Заранее спасибо!)

init();

