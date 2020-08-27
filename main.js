
const $btn = document.getElementById('btn-kick');
const character = {
    name: 'Pikachu',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),
    renderHP: renderHP,
    changeHP: changeHP,
};

const enemy = {
    name: 'Charmander',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),
    renderHP: renderHP,
    changeHP: changeHP,
};

$btn.addEventListener('click', function () {
    console.log('Kick');
    character.changeHP(random(20));
    enemy.changeHP(random(20));

});

function init() {
    console.log('Start Game!');
    character.renderHP();
    enemy.renderHP();
}

function renderHP() {
    this.elHP.innerText = this.damageHP + ' / ' + this.defaultHP;
    this.elProgressbar.style.width = this.damageHP + '%';
}

let i = 0.5;

function changeHP(count) {
    this.damageHP -= count;

    const log = this === enemy ? generateLog(this, character) : generateLog(this, enemy);
    console.log(`раунд ${Math.ceil(i)}`, log, -count + 'HP'); // это костыль или так и должно быть? я не придумал как можно иначе вытащить из этой функции "count".

    addLog(log, count)

    if (this.damageHP <= 0) {
        this.damageHP = 0;
        alert('Бедный  '+ this.name + ' проиграл бой!');
        $btn.disabled = true;
        }
        i+= 0.5;
    renderHP.call(this);
}

function random(num) {
    return Math.ceil(Math.random() * num);
};

function generateLog(firstPerson, secondPerson) {
    const logs = [
        `${firstPerson.name} вспомнил что-то важное, но неожиданно ${secondPerson.name}, не помня себя от испуга, ударил в предплечье врага. [${firstPerson.damageHP}/100]`,
        `${firstPerson.name} поперхнулся, и за это ${secondPerson.name} с испугу приложил прямой удар коленом в лоб врага. [${firstPerson.damageHP}/100]`,
        `${firstPerson.name} забылся, но в это время наглый ${secondPerson.name}, приняв волевое решение, неслышно подойдя сзади, ударил. [${firstPerson.damageHP}/100]`,
        `${firstPerson.name} пришел в себя, но неожиданно ${secondPerson.name} случайно нанес мощнейший удар. [${firstPerson.damageHP}/100]`,
        `${firstPerson.name} поперхнулся, но в это время ${secondPerson.name} нехотя раздробил кулаком \<вырезанно цензурой\> противника. [${firstPerson.damageHP}/100]`,
        `${firstPerson.name} удивился, а ${secondPerson.name} пошатнувшись влепил подлый удар. [${firstPerson.damageHP}/100]`,
        `${firstPerson.name} высморкался, но неожиданно ${secondPerson.name} провел дробящий удар. [${firstPerson.damageHP}/100]`,
        `${firstPerson.name} пошатнулся, и внезапно наглый ${secondPerson.name} беспричинно ударил в ногу противника. [${firstPerson.damageHP}/100]`,
        `${firstPerson.name} расстроился, как вдруг, неожиданно ${secondPerson.name} случайно влепил стопой в живот соперника. [${firstPerson.damageHP}/100]`,
        `${firstPerson.name} пытался что-то сказать, но вдруг, неожиданно ${secondPerson.name} со скуки, разбил бровь сопернику. [${firstPerson.damageHP}/100]`
    ];
    return logs[random(logs.length)-1];
}

const $logs = document.querySelector('#logs');

function addLog(log, count) {
    const $p = document.createElement('p');

    console.log($p);

    $p.innerText = `Раунд:${Math.ceil(i)} ${log} -${count}HP`;
    $logs.insertBefore($p, $logs.children[0])
}

init();

