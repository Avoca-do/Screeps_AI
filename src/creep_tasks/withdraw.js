module.exports = {

    /** @param {Creep} creep **/
    run : function(creep){
        if(creep.carry.energy == creep.carryCapacity || creep.ticksToLive < 50){
            return true;
        }

        if(creep.room.memory.harvest && creep.run_task('harvest'))
            return true;

        let response = creep.run_task('pickup');
        if(response == ERR_NOT_IN_RANGE){
            return false;
        }

        let cap = creep.carryCapacity;
        if(cap > 100)
            cap = 100;
        let container = creep.room.find(FIND_STRUCTURES, {
            filter : (s) => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > cap
            ||  s.structureType == STRUCTURE_LINK && s.energy > cap && s.getMemory().role
        })
        let source = creep.pos.findClosestByPath(container);
        if(!source){
            source = creep.room.storage;
            if(source && source.store.energy < 100){
                source = null;
            }
        }

        if(source){
            
            //console.log("WORKs Harvest work!");
            if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(source, {reusePath : 25});
                //creep.reusePath(source);
            }
            return false;
        }else{
            if(creep.carry.energy > 25)
                return true;
            //if(creep.memory.gather)
        }
        return false;
    }
}