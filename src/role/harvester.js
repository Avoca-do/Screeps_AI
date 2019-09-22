var constants = require('./CONSTANTS');
var upgraderRole = require('role.upgrader');

module.exports = {
    /** @param {Creep} creep **/
    run: function(creep, task){
        //creep.prototype.interact(creep);
        //var task = creep.memory.task;
        //console.log(creep.name + " harvester - " + task);
        if(task == constants.WORK){
            if(creep.run_task('store')){
                if(creep.ticksToLive < 25){
                    creep.suicide();
                }
                creep.setTask(constants.HARVEST);
            }
        }else if(task == constants.HARVEST){
            //console
            if(creep.run_task('harvest')){
                creep.setTask(constants.WORK);
            }
        }else{
            creep.setTask(constants.WORK);
        }
    }
}