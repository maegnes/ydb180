/**
 * Class to calculate possible checkout paths for given points
 *
 * @type {CheckoutPath}
 */
CheckoutPath = class CheckoutPath {

    /**
     * Array with the available single fields
     *
     * @type {*[]}
     */
    singles = [
        {
            value: 25,
            name: 'Single Bull'
        }
    ];

    /**
     * Array with the available double fields
     *
     * @type {*[]}
     */
    doubles = [
        {
            value: 50,
            name: 'Bullseye'
        }
    ];

    /**
     * Array with the available triple fields
     *
     * @type {*[]}
     */
    triples = [];

    /**
     * Array to store the different checkout paths (ONE = with 1 dart; TWO = with 2 darts etc.)
     *
     * @type {{ONE: Array, TWO: Array, THREE: Array}}
     */
    paths = {
        ONE: [],
        TWO: [],
        THREE: []
    };

    /**
     * Creates the fields and their values
     */
    constructor() {
        // Create the possible scores
        for (var i = 1; i <= 20; i++) {
            this.singles.push({
                value: i,
                name: 'S' + i
            });
            this.doubles.push({
                value: 2 * i,
                name: 'D' + i
            });
            this.triples.push({
                value: 3 * i,
                name: 'T' + i
            });
        }
    };

    /**
     * Recursive solution to calculate the checkout paths
     *
     * @param points
     * @param dartsRemaining
     * @param path
     */
    calculate = (points, dartsRemaining, path = []) => {
        let finalPath = [];
        if (0 == dartsRemaining) {
            return;
        }
        // Last throw must be a double
        this.triples.forEach((score) => {
            let myPath = path.slice();
            let newScore = points - score.value;
            if (newScore <= 0) {
                return;
            }
            myPath.push(score);
            this.calculate(newScore, dartsRemaining - 1, myPath)
        });
        this.singles.forEach((score) => {
            let myPath = path.slice();
            let newScore = points - score.value;
            if (newScore <= 0) {
                return;
            }
            myPath.push(score);
            this.calculate(newScore, dartsRemaining - 1, myPath);
        });
        this.doubles.forEach((score) => {
            let myPath = path.slice();
            let newScore = points - score.value;
            if (newScore < 0) {
                return;
            }
            myPath.push(score);
            if (0 == newScore) {
                finalPath.push(myPath);
                switch (finalPath[0].length) {
                    case 1:
                        this.paths.ONE.push(finalPath[0]);
                        break;
                    case 2:
                        this.paths.TWO.push(finalPath[0]);
                        break;
                    case 3:
                        this.paths.THREE.push(finalPath[0]);
                }
            } else {
                this.calculate(newScore, dartsRemaining - 1, myPath);
            }
        });
    };
};