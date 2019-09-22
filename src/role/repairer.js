var constants = require('./CONSTANTS');
var builderRole = require('role.builder');

module.exports = {
    /** @param {Structure} repairTarget **/
    run: function(creep, task){
        if(task == constants.WORK){
            if(creep.run_task('repair')){
                creep.setTask(constants.HARVEST);
            }
        }else if(task == constants.HARVEST){
            if(creep.run_task('withdraw')){
                creep.setTask(constants.WORK);
            }
        }else{
            creep.setTask(constants.WORK);
        }
    }
}