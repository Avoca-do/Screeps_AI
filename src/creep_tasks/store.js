const upgrade_task = require('./creep_tasks.upgrade')

module.exports = {
    run : function(creep){
        let structure = Game.getObjectById(creep.memory.tid);
        let utime = Game.time - creep.memory.rt;
        if(!structure || structure.energy + 15 > structure.energyCapacity || utime > 20){
            if(creep.carry.energy < 25)
                return true;
            if(utime == 0 || utime > 7 || !utime){
                structure = creep.room.find(FIND_MY_STRUCTURES, {
                    filter :(s) => ( s.structureType == STRUCTURE_EXTENSION 
                        || s.structureType == STRUCTURE_SPAWN 
                        || s.structureType == STRUCTURE_TOWER)
                        && s.energy < s.energyCapacity
                }).sort((a, b) => ((a.energy + 10) / a.energyCapacity) - ((b.energy + 10)/ b.energyCapacity));
                structure = structure.slice(0, structure.length * 0.75 + 1);
                structure = creep.pos.findClosestByPath(structure);
            
                if(structure){
                    //console.log('wtf?' + structure);
                    creep.memory.tid = structure.id;
                    creep.memory.rt = Game.time - 10;
                }
                else
                    creep.memory.rt = Game.time;
            }else{
                structure = null;
            }
        }
    
        if(structure){
            var response = creep.transfer(structure, RESOURCE_ENERGY);
            if(response == ERR_NOT_IN_RANGE){
                creep.moveTo(structure, {reusePath : 50});
                //creep.reusePath(structure);
            }
        }else{
            //upgraderRole.run(creep, task);
            return upgrade_task.run(creep);
        }
        return creep.carry.energy == 0;
    }
}