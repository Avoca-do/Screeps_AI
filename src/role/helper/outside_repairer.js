var constants = require('./CONSTANTS');
var builderRole = require('role.builder');

module.exports = {
    /** @param {Creep} creep **/
    run: function(creep, task){
        if(creep.run_task('travel_target')){
            if(task == constants.WORK){
                if(creep.run_task('repair')){
                    creep.setTask(constants.HARVEST);
                }
            }else if(task == constants.HARVEST){
                if(creep.run_task('harvest')){
                    creep.setTask(constants.WORK);
                }
            }else{
                creep.setTask(constants.WORK);
            }
        }
    }
}