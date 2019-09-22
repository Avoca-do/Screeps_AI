module.exports = {

    /** @param {Creep} creep **/
    run : function(creep){
        let sources = creep.room.find(FIND_DROPPED_RESOURCES, {
            filter : (s) => s.energy > creep.carryCapacity * 0.25
        })
        if(sources.length > 0){
            let source = creep.pos.findClosestByPath(sources);
            //console.log("WORKs Harvest work!");
            if(creep.pickup(source) == ERR_NOT_IN_RANGE){
                creep.moveTo(source, {reusePath : 25});
                //creep.reusePath(source);
            }
        
            if(creep.carry.energy == creep.carryCapacity || creep.ticksToLive < 50){
                return true;
            }
            return ERR_NOT_IN_RANGE;
        }
        return false;
    }
}