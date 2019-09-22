var constants = require('./CONSTANTS');
var upgraderRole = require('role.upgrader');

module.exports = {
    /** @param {Creep} creep **/
    run: function(creep){
        if(creep.run_task('travel_home')){
            creep.memory.helper = false;
            creep.moveTo(creep.room.controller);
        }
    }
}