class Selectors {
    constructor(name) {
        this.elHP = document.getElementById(`health-${name}`);
        this.elProgressbar = document.getElementById(`progressbar-${name}`);
    }
}

class Pokemon extends Selectors {
    constructor ({name, hp, type, selectors, attacks = [] }) {
        super(selectors);
        this.name = name;
        this.hp = {
            current: hp,
            total: hp,
        };
        this.type = type;
        this.attacks = attacks

        this.renderHP();
    }



    renderHP = () => {
        this.renderHPLife();
        this.renderProgressbarHP();
    }

    renderHPLife = () => {
        const {elHP, hp: {current, total}} = this;
        elHP.innerText = current + ' / ' + total;
    }

    renderProgressbarHP = () => {
        const { hp: { current, total }, elProgressbar} = this;
        const percent = current / ( total / 100 );

        let $health1 = document.getElementById('progressbar-player1');
        console.log($health1);
        let $health2 = document.getElementById('progressbar-player2');
        let $healthStyle1 = document.getElementById('progressbar-player1').style.width;
        let percentNum1 = $healthStyle1.slice(0, 3);
        $healthStyle1 = Number(percentNum1);
        let $healthStyle2 = document.getElementById('progressbar-player2').style.width;
        let percentNum2 = $healthStyle2.slice(0, 3);
        $healthStyle2 = Number(percentNum2);

        console.log($healthStyle1);
        console.log($healthStyle2);
        if ($healthStyle1 < 60 && $healthStyle1 > 20) {
            $health1.classList.add("low")
        } else if ($healthStyle1 < 20) {
            $health1.classList.add("critical")
        };
        if ($healthStyle2 < 60 && $healthStyle2 > 20) {
            $health2.classList.add("low")
        } else if ($healthStyle2 < 20) {
            $health2.classList.add("critical")
        }else if ($healthStyle2 > 60 || $healthStyle2 === NaN) {
            $health2.classList.remove("low", "critical")
        } ;;
        elProgressbar.style.width = percent + '%';

    }

    changeHP = (count, cb) => {
        this.hp.current -= count;

        if (this.hp.current <= 0) {
            this.hp.current = 0;
        }

        this.renderHP();
        cb && cb(count);
    }
}





export default Pokemon;