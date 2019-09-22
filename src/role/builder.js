var constants = require('./CONSTANTS');
var upgraderRole = require('role.upgrader');

module.exports = {
    /** @param {Creep} creep **/
    run: function(creep, task){
        if(task == constants.WORK){
           if(creep.run_task('build')){
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