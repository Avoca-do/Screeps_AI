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

        let container = creep.room.find(FIND_STRUCTURES, {
            filter : (s) => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > creep.carryCapacity
        })
        if(container.length > 0){
            let source = creep.pos.findClosestByPath(container);
            //console.log("WORKs Harvest work!");
            if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(source, {reusePath : 25});
                //creep.reusePath(source);
            }
            return false;
        }else{
            //if(creep.memory.gather)
        }
        return false;
    }
}