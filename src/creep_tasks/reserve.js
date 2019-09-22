const travel_task = require('./creep_tasks.travel_target')

module.exports = {
    /** @param {Creep} creep **/
    run : function(creep){
        if(travel_task.run(creep)){
            let controller = creep.room.controller;
            if(creep.reserveController(controller) == ERR_NOT_IN_RANGE){
                creep.moveTo(controller, {reusePath : 25});
                //creep.reusePath(creep.room.controller);
            }else{
                if(creep.memory.signed){
                    creep.signController(controller, "what shall i put here?!");
                    creep.memory.signed = true;
                }
            }

            return true;
        }
        return false;
    }
}