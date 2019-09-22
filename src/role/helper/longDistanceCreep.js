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

const onSwitch = function(creep, role){
    //console.log('RESET harvest func! ' + creep.name);
    if(role == 'harvester'){

    }else{

    }
}

module.exports = {
    run : function(creep){
        this.transferRoom(creep, creep.memory.task);
    },

    /** @param {Creep} creep **/
    transferRoom : function(creep, task){

        //console.log('long dist creep ready! ' + creep.name + ' // ' + task);
        // cycle -> RESET -> HARVEST ->  WORK -> RESET ->...
        if(task == constants.HARVEST){
            //console.log("??2");
            if(creep.run_task('travel_target')){
                //console.log("??");
                if(creep.run_task('harvest')){
                    creep.setTask(constants.WORK);
                }
                //roles[creep.memory.role].run(creep, constants.HARVEST);


                //roles[creep.memory.role].run(creep, constants.HARVEST);
            }
            return;
        }else if(task == constants.WORK){
            //console.log("??3");
            if(creep.run_task('travel_home')){
                roles[creep.memory.role].run(creep, constants.WORK);
                //roles[creep.memory.role].run(creep, constants.WORK);
            }
            return;
            //console.log('need to go bACK');
        }else{
            creep.memory.task = constants.WORK;
        }
    }
};