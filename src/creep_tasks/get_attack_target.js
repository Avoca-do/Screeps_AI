module.exports = {

    /** @param {Creep} creep **/
    run : function(creep){
        let targets = creep.room.find(FIND_HOSTILE_STRUCTURES, { filter : (s) => s.structureType == STRUCTURE_TOWER });
        if(targets.length > 0){
            console.log('found target moving in!');
            let target = creep.pos.findClosestByPath(targets);
            return target;
        }else{
            targets = creep.room.find(FIND_HOSTILE_CREEPS, {
                filter : (c) => c.getActiveBodyparts(ATTACK) > 0 || c.getActiveBodyparts(RANGED_ATTACK) > 0
            });
            if(targets.length > 0){
                console.log('found target moving in!');
                let target = creep.pos.findClosestByPath(targets);
                return target;
            }else{
                targets = creep.room.find(FIND_HOSTILE_CREEPS);
                targets = targets.concat(creep.room.find(FIND_HOSTILE_STRUCTURES, {
                    filter : s => s.structureType != STRUCTURE_CONTROLLER
                }));
                //targets = targets.concat(creep.room.find(FIND_HOSTILE_CONSTRUCTION_SITES));
                //targets.push(creep.room.find(FIND_HOSTILE_STRUCTURES));
                //targets.push(creep.room.find(FIND_HOSTILE_STRUCTURES));
                if(targets.length > 0){
                    let target = creep.pos.findClosestByPath(targets);

                    return target;
                }else{
                    targets = creep.room.find(FIND_HOSTILE_CONSTRUCTION_SITES);
                    if(targets.length > 0){
                        let target = creep.pos.findClosestByPath(targets);
    
                        return target;
                    }
                }
            }
        }
    }
}