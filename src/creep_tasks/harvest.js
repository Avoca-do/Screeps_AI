module.exports = {
    /** @param {Creep} creep **/
    run : function(creep){
        var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        let response = creep.harvest(source);
        //console.log("WORKs Harvest work!");
        if(response == ERR_NOT_IN_RANGE){
            creep.moveTo(source, { reusePath : 25, 
               // visualizePathStyle: {stroke: '#ffffff'},
                plainCost: 2,
                swampCost: 3,
            });
            //creep.reusePath(source);
        }else if((response == ERR_INVALID_TARGET && creep.carry.energy >= 50)){
            return true;
        }
    
        if(creep.carry.energy == creep.carryCapacity){
            return true;
        }else if(creep.ticksToLive < 30){
            return true;
        }
        return false;
    }
}