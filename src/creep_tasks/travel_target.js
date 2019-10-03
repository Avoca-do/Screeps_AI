module.exports = {
    run : function(creep){
        if(creep.room.name == creep.memory.targetRoom){
            if(creep.pos.x == 49){
                creep.move(LEFT)
                return false;
            }else if(creep.pos.y == 49){
                creep.move(TOP);
                return false;
            }else if(creep.pos.x == 0){
                creep.move(RIGHT);
                return false;
            }else if(creep.pos.y == 0){
                creep.move(BOTTOM);
                return false;
            }
            creep.memory.exit_pos = null;
            return true;
        }
    
        // let exit = creep.memory.exit_pos;
        // if(exit){
        //     creep.reusePath(exit);
        // }else{
        //     exit = creep.room.findExitTo(creep.memory.targetRoom);
        //     creep.reusePath(creep.pos.findClosestByPath(exit));
        //     creep.memory.exit_pos = creep.pos.findClosestByPath(exit);
        // }
        const route = Game.map.findRoute(creep.room, creep.memory.targetRoom);
        //console.log(JSON.stringify(route[0]));
        if(route.length > 0){
            let exit = creep.pos.findClosestByPath(route[0].exit);
            creep.moveTo(exit, { reusePath : 25, 
                //visualizePathStyle: {stroke: '#ffffff'},
                plainCost: 2,
                swampCost: 3,
            });
            return false;
        }    
        return true;
    }
}
