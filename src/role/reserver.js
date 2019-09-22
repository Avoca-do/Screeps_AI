var constants = require('./CONSTANTS');

module.exports = {
    /** @param {Creep} creep **/
    run: function(creep, task){
        //creep.say('yes sER!');
        creep.run_task('reserve');
    }
}