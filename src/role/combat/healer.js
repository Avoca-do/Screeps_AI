var constants = require('./CONSTANTS');
var builderRole = require('role.builder');

module.exports = {
    /** @param {Creep} creep **/
    run: function(creep, task){
        if(task == 0){
            creep.set_unit();
            creep.memory.task = 1;
        }

        if(creep.run_task('invade')){
            if(creep.hits < creep.hitsMax * 0.5){
                let creeps = creep.room.find(FIND_MY_CREEPS, (c) => creep.hits + 100 < creep.hitsMax);
                let target = creep.pos.findClosestByPath(creeps);
                creep.moveTo(target);
                creep.heal(target);
                creep.rangedHeal(target);
                console.log('healing', target);
            }else{
                let creeps = creep.room.find(FIND_MY_CREEPS, {filter : (c)=> c.memory.role == "attacker" || c.memory.role == "ranger" });
                //console.log(creeps.length,  creep.name);
                let target = creep.pos.findClosestByPath(creeps);
                creep.moveTo(target);
            }
            //let targets = creep.room.find(FIND_HOSTILE_CREEPS, { filter : (c) => c.body});
        }
    }
}