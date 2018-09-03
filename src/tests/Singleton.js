class Singleton {
    constructor() {
        if (!this.instance) {
            this.getInstance();
        }
    }

    getInstance() {
        if (!this.instance) {
            this.instance = {
                name: 'David',
                age: 30
            };
        }

        return this.instance;
    }
}

module.exports = {
    Singleton
};