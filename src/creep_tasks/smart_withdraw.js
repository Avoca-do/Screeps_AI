module.exports = {

    /** @param {Creep} creep **/
    run : function(creep){
        if(creep.carry.energy == creep.carryCapacity || creep.ticksToLive < 50){
            creep.memory.sid = null;
            return true;
        }

        source = Game.getObjectById(creep.memory.sid);
        if(!source || source.energy <= 25){
            let cap = creep.carryCapacity;
            if(cap > 100)
                cap = 100;
            let source = creep.room.find(FIND_STRUCTURES, {
                filter : (s) => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > cap 
                //||  s.structureType == STRUCTURE_LINK && s.energy > cap 
            });
            source = source.concat(creep.room.find(FIND_DROPPED_RESOURCES, {
                filter : (s) => s.energy > cap
            }));

            source = creep.pos.findClosestByPath(source);
            if(source){
                creep.memory.sid = source.id;
            }
        }

        if(!source){
            let source = creep.room.find(FIND_STRUCTURES, {
                filter : (s) => s.structureType == STRUCTURE_LINK && s.energy > 200 
            });
            if(creep.room.storage)
                source.push(creep.room.storage)
            source = creep.pos.findClosestByPath(source);
        }

        if(source){
            if(source instanceof Structure){
                if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(source, {reusePath : 25});
                }
                return false;
            }else{
                if(creep.pickup(source) == ERR_NOT_IN_RANGE){
                    creep.moveTo(source, {reusePath : 25});
                }
            }   
        }else{
            if(creep.carry.energy > 25){
                return true;
            }
            //if(creep.memory.gather)
        }
        return false;
    }
}