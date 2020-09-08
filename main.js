import random from "./utils.js";
import Pokemon from "./pokemon.js";

let startButton = document.getElementById('start');

class Game {
    getPokemons = async () => {
        const responce = await fetch('https://reactmarathon-api.netlify.app/api/pokemons');
        const body = await responce.json();
        console.log(body);
        return body
    };

    start = async () => {

        const pokemons = await this.getPokemons();
        console.log(pokemons);

        startButton.addEventListener('click', function () {

            let attackButtons = document.querySelectorAll('.control .button');
            attackButtons.forEach($item => $item.remove());


            let chosePokemon = function (player) {

             return  prompt(`Выберите ${player} покемона, указав его имя, или введите "0" для случайного выбора
        №1 ${pokemons[0].name}
        №2 ${pokemons[1].name}
        №3 ${pokemons[2].name}
        №4 ${pokemons[3].name}
        №5 ${pokemons[4].name}
        №6 ${pokemons[5].name}
        №7 ${pokemons[6].name}`, 0);
            };
            async function selectPokemonRandom() {
                const responce = await fetch('https://reactmarathon-api.netlify.app/api/pokemons?random=true');
                const body = await responce.json();
                console.log(body);
                return body
            };
            async function selectPokemon(pokemon) {
                const responce = await fetch(`https://reactmarathon-api.netlify.app/api/pokemons?name=${pokemon}`);
                const body = await responce.json();
                console.log(body);
                return body
            };


            async function initPokemon (pokemon, number) {
                let selectedPokemon = pokemon == 0 ? await selectPokemonRandom() : await selectPokemon(pokemon);
                console.log(selectedPokemon);
                let playerImg = document.getElementById(`player${number}-img`);
                playerImg.src = selectedPokemon.img;
                let playerName = document.getElementById(`name-player${number}`);
                playerName.innerText = selectedPokemon.name;
                const player = new Pokemon({
                    ...selectedPokemon,
                    selectors: `player${number}`
                })
                return player;
            };

            /*let selectedPokemon = initPokemon(chosePokemon(),1)
            const character = pokemons.find(item => item/!*.name*!/ === selectedPokemon/!*.name*!/);*/




            let helth1 = document.getElementById('progressbar-player1');
            helth1.classList.remove('low', 'critical');

/*

            let selectedPokemonEnemy = initPokemon(chosePokemon('противнику'), 2);

            let createPokemonEnemy = function(pokemon) {
                let enemy = pokemons.find(item => item/!*.name*!/ === selectedPokemonEnemy/!*.name*!/);
                let enemyPokemon = new Pokemon({
                    ...enemy,
                    selectors: 'player2',
                });
                return enemyPokemon
            };

            let player2 = createPokemonEnemy(selectedPokemonEnemy);
            const {attacks: [firstAttack]} = selectedPokemonEnemy;
*/

            const helth2 = document.getElementById('progressbar-player2');
            helth2.classList.remove('low', 'critical')

            const $control = document.querySelector('.control');
async function addButtons() {
    let player1 = await initPokemon(chosePokemon(), 1);

    let player2 = await initPokemon(chosePokemon(), 2);
    const {attacks: [firstAttack]} = player2;
    console.log(player1, player2);

                player1.attacks.forEach(item => {
                    const $btn = document.createElement('button');
                    $btn.classList.add('button');
                    $btn.innerText = item.name;
                    const btnCount = countBtn(item.maxCount, $btn);

                    $btn.addEventListener('click', () => {
                        console.log('click button', $btn.innerText);
                        btnCount();
                        player2.changeHP(random(item.maxDamage, item.minDamage), function (count) {
                            console.log(item);
                            console.log(generateLog(player1, player2, count));
                        });
                        player1.changeHP(random(firstAttack.maxDamage, firstAttack.minDamage), function (count) {
                            console.log(generateLog(player2, player1, count));
                        });
                        if (player2.hp.current === 0) {
                            /*let chosePokemonEnemy1 = chosePokemon('противнику нового')*/
                            player2 = initPokemon(chosePokemon('противнику нового'), 2);
                            console.log('sdg ');
                            player2.hp.current = player2.hp.total
                            player2.renderHP()
                            const helth2 = document.getElementById('progressbar-player2');
                            helth2.classList.remove('low', 'critical')
                        } else if (player1.hp.current === 0) {
                            for (let i = 0; i < $control.children.length; i++) {
                                $control.children[i].disabled = true;
                            }
                            ;
                            alert('Бой завершен! Ты проиграл, но знай что ты сражался достойно(отстойно) =|. Но ты можешь попробовать еще раз.')
                        }

                    });

                    $control.appendChild($btn);
                });
    function init() {
        console.log('Start Game!');
        player1.renderHP();
        player2.renderHP();
    }
    init();
        };

addButtons()


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
    }
}

const game = new Game();
game.start()




