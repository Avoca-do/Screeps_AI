var constants = require('./CONSTANTS');
var upgraderRole = require('role.upgrader');

module.exports = {
    /** @param {Creep} creep **/
    run: function(creep, task){
        //creep.prototype.interact(creep);
        //var task = creep.memory.task;
        //console.log(creep.name + " transf - " + task);
        if(task == constants.WORK){
            if(creep.run_task('store')){
                creep.setTask(constants.HARVEST);
            }
        }else if(task == constants.HARVEST){
            if(!creep.run_task('pickup_all')){
                if(creep.run_task('smart_withdraw')){
                    creep.setTask(constants.WORK);
                }
            }
        }else{
            creep.setTask(constants.WORK);
        }
    }
}