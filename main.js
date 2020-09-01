
const $btn = document.getElementById('btn-kick');
const $superHit = document.getElementById('super-hit');

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

const btnCountJolt = countBtn( 5, $btn);
const btnCountJolt2 = countBtn2(3, $superHit);


function countBtn(count = 3, el) {
    const innerText = el.innerText;
    el.innerText = `${innerText} ${count}`;
    return function () {
        count--;
        if (count === 0) {
            el.disabled = true;
        }
        el.innerText = `${innerText} ${count}`;
        return count;
    }
}

function countBtn2(count = 3, el) {
    const innerText = el.innerText;
    el.innerText = `${innerText} ${count}`;
    return function () {
        count--;
        if (count === 0) {
            el.disabled = true;
        }
        el.innerText = `${innerText} ${count}`;
        return count;
    }
}

$btn.addEventListener('click', function () {
    btnCountJolt();
    console.log('Kick');
    character.changeHP(random(20 ));
    enemy.changeHP(random(20 ));

});

$superHit.addEventListener('click', function () {
    btnCountJolt2();
    console.log('SUPER KICK');
    character.changeHP(random(30, 10));
    enemy.changeHP(random(30, 10));
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

    const log = this === enemy ? generateLog(this, character, count) : generateLog(this, enemy, count);
    console.log(this);
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

function random(max, min = 0) {
    const num = max - min;
    return Math.ceil(Math.random() * num) + min;
};

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
    return logs[random(logs.length)-1, 0];
}

const $logs = document.querySelector('#logs');

function addLog(log, count) {
    const $p = document.createElement('p');
    $p.innerText = `Раунд:${Math.ceil(i)} ${log} `;
    $logs.insertBefore($p, $logs.children[0])
}





init();

