var constants = require('./CONSTANTS');
var builderRole = require('role.builder');

module.exports = {
    /** @param {Creep} creep **/
    run: function(creep, task){
        //creep.memory.targetRoom = Memory.attackRoom;
        //console.log('attacker readdy?' , creep.name)
        if(task == 0){

            creep.set_unit();
            creep.memory.task = 1;
        }

        if(creep.run_task('invade')){
            //console.log(JSON.stringify(creep.unit()))
            let target = creep.run_task('get_attack_target');
            //console.log(target, creep.name);
            if(target){
                creep.moveTo(target);
                creep.attack(target);
            }
            //let targets = creep.room.find(FIND_HOSTILE_CREEPS, { filter : (c) => c.body});

        }
    }
}