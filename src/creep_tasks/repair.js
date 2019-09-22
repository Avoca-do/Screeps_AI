const build_task = require('./creep_tasks.build');

module.exports = {
    run : function(creep){
        let repairTarget = Game.getObjectById(creep.memory.rid);
        let utime = Game.time - creep.memory.rt;
        if(!repairTarget || repairTarget.hits == repairTarget.hitsMax || utime > 20){
            if(utime == 0 || utime > 7 || !utime){
                repairTarget = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter : (s) => (s.hits + 200) < s.hitsMax && s.hits < 10000
                });
                if(repairTarget){
                    creep.memory.rid = repairTarget.id;
                    creep.memory.rt = Game.time - 10;
                }
                else
                    creep.memory.rt = Game.time;
            }else{
                repairTarget = null;
                //creep.memory.tid = null;
            }
        }
        if(repairTarget){
            if(creep.repair(repairTarget) == ERR_NOT_IN_RANGE){
                creep.moveTo(repairTarget, {reusePath : 50});
                //creep.reusePath(repairTarget);
            }
        }else{
            return build_task.run(creep);
        }
        return creep.carry.energy == 0;
    }
}