var constants = require('./CONSTANTS');

const MOVE_HOME = 51;
const MOVE_ROOM = 52;

const WORK = 54;
const RESET_WORK = constants.HARVEST;
const HARVEST = 53;
const RESET_HARVEST = constants.WORK;

const roles = {
    harvester : require('./role.harvester'),
    upgrader : require('./role.upgrader'),
    builder : require('./role.builder'),
    repairer : require('./role.repairer'),
}

module.exports = {
    run : function(creep){
        this.transferRoom(creep, creep.memory.task);
    },

    /** @param {Creep} creep **/
    transferRoom : function(creep, task){
        if(task == constants.HARVEST){
            if(creep.run_task('travel_target')){
                if(creep.run_task('harvest')){
                    creep.setTask(constants.WORK);
                }
            return;
            }
        }else if(task == constants.WORK){
            if(creep.run_task('travel_home')){
                roles[creep.memory.role].run(creep, constants.WORK);
            }
            return;
        }else{
            creep.memory.task = constants.WORK;
        }
    }
};