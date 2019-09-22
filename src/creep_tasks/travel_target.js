module.exports = {
    run : function(creep){
        if(creep.room.name == creep.memory.targetRoom){
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
        }    
        return false;
    }
}
