import random from "./utils.js";
import Pokemon from "./pokemon.js";
import { pokemons } from "./pokemons.js";

let startButton = document.getElementById('start');

startButton.addEventListener('click', function () {

    let attackButtons = document.querySelectorAll('.control .button');
    attackButtons.forEach($item => $item.remove());

    let chosePokemon = prompt(`Выберите себе покемона, указав его номер, или введите "0" для случайного выбора
        №1 Pikachu
        №2 Charmander 
        №3 Bulbasaur 
        №4 Squirtle 
        №5 Pidgey 
        №6 Mew`, 0);

    /*if ()*/
    let initPokemon = function (pokemon) {
        let selectedPokemon = chosePokemon == 0 ? pokemons[random(5, 0)] : pokemons[chosePokemon - 1];
        let player1Img = document.getElementById(`player1-img`);
        player1Img.src = selectedPokemon.img;
        let player1Name = document.getElementById(`name-player1`);
        player1Name.innerText = selectedPokemon.name;
        return selectedPokemon;
    }

    let selectedPokemon = initPokemon(chosePokemon)

    const character = pokemons.find(item => item.name === selectedPokemon.name);

    let player1 = new Pokemon({
        ...character,
        selectors: 'player1',
    });


    let chosePokemonEnemy = prompt(`Выберите покемона противника, указав его номер, или введите "0" для случайного выбора
        №1 Pikachu
        №2 Charmander 
        №3 Bulbasaur 
        №4 Squirtle 
        №5 Pidgey 
        №6 Mew`, 0);

    let initPokemonEnemy = function (pokemon) {
        let selectedPokemon = chosePokemonEnemy == 0 ? pokemons[random(5, 0)] : pokemons[chosePokemonEnemy -1];
        let player2Img = document.getElementById(`player2-img`);
        player2Img.src = selectedPokemon.img;
        let player2Name = document.getElementById(`name-player2`);
        player2Name.innerText = selectedPokemon.name;
        return selectedPokemon;
    }

    let selectedPokemonEnemy = initPokemonEnemy(chosePokemonEnemy -1 );
    console.log(selectedPokemonEnemy);

let createPokemonEnemy = function(pokemon) {
    let enemy = pokemons.find(item => item.name === selectedPokemonEnemy.name);
    let enemyPokemon = new Pokemon({
        ...enemy,
        selectors: 'player2',
    });
    return enemyPokemon
}
    let player2 = createPokemonEnemy(selectedPokemonEnemy)
console.log(player2);
    const {attacks: [firstAttack]} = selectedPokemonEnemy;

    const $control = document.querySelector('.control');
    player1.attacks.forEach(item => {
        const $btn = document.createElement('button');
        $btn.classList.add('button');
        $btn.innerText = item.name;
        const btnCount = countBtn( item.maxCount, $btn);

        $btn.addEventListener('click', () => {
            console.log('click button', $btn.innerText);
            btnCount();
            player2.changeHP(random(item.maxDamage, item.minDamage), function (count) {
                console.log(generateLog(player1, player2, count));
            });
            player1.changeHP(random(firstAttack.maxDamage, firstAttack.minDamage), function (count) {
                console.log(generateLog(player2, player1, count));
            });
            if(player2.hp.current === 0) {
                let chosePokemonEnemy1 = prompt(`Бой завершен! Выберите следующего противника, указав его номер, или введите "0" для случайного выбора
        №1 Pikachu
        №2 Charmander 
        №3 Bulbasaur 
        №4 Squirtle 
        №5 Pidgey 
        №6 Mew`, 0);
                selectedPokemonEnemy = initPokemonEnemy(chosePokemonEnemy1);
                player2.hp.current = player2.hp.total
                player2.renderHP()

            } else if (player1.hp.current === 0){
                for (let i = 0; i < $control.children.length; i++) {
                  $control.children[i].disabled = true;
              };
                alert('Бой завершен! Ты проиграл, но знай что ты сражался достойно(отстойно) =|. Можешь попробовать еще раз.')
            }
            console.log($btn);

        });

        $control.appendChild($btn);
    });
    function init() {
        console.log('Start Game!');
        player1.renderHP();
        player2.renderHP();
    }
    init();
    console.log(player1);
    console.log(player2);
})




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


/*$btn.addEventListener('click', function () {
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
});*/





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



