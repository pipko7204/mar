
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

function changeHP(count) {
    this.damageHP -= count;
    if (this.damageHP <= 0) {
        this.damageHP = 0;
        alert('Бедный  '+ this.name + ' проиграл бой!');
        $btn.disabled = true;
        }
    renderHP.call(this);
}

function random(num) {
    return Math.ceil(Math.random() * num);
}

init();

