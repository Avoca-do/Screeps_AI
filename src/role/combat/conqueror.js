var constants = require('./CONSTANTS');
var builderRole = require('role.builder');

module.exports = {
    /** @param {Creep} creep **/
    run: function(creep, task){
        if(task == 0){
            creep.set_unit();
            creep.memory.task = 1;
        }
        //console.log('attacker readdy?' , creep.name)
        if(creep.run_task('invade')){
            let target = creep.room.controller;
            if(target.my){
                creep.unit().command = "defence";
                return;
            }
            //console.log(target.owner);
            creep.moveTo(target);
            let st = creep.unit().block_end;
            //let sleep = st && (st > Game.time); 
            //console.log(st);
            if(st < Game.time){
                if(target.owner != null){
                    creep.attackController(target);
                    if(target.upgradeBlocked){
                        let sleep = target.upgradeBlocked + Game.time;
                        creep.unit().block_end = sleep;
                        console.log("sleep till", sleep, " | GTIME", Game.time, creep.unit().block_end);
                    }
                }else{
                    creep.claimController(target);
                }
    
                if(!target.sign){
                    creep.signController(target, "ketchop is not allowed!");
                }
            }
            //let targets = creep.room.find(FIND_HOSTILE_CREEPS, { filter : (c) => c.body});

        }
    }
}