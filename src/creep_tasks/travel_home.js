module.exports = {
    run : function(creep){
        if(creep.room.name == creep.memory.home){
            return true;
        }  
        // t = Game.cpu.getUsed();
        // let exit = creep.memory.exit_pos;
        // if(exit){
        //     creep.reusePath(exit);
        // }else{
        //     creep.memory.home = Game.spawns['Spawn1'].room.name;
        //     exit = creep.room.findExitTo(creep.memory.home);
        //     creep.reusePath(creep.pos.findClosestByPath(exit));
        //     creep.memory.exit_pos = creep.pos.findClosestByPath(exit);
        // }
        if(!creep.memory.home){
            creep.memory.home = Game.spawns['Spawn1'].room.name;
        }
        const route = Game.map.findRoute(creep.room, creep.memory.home);
        if(route.length > 0){
            let exit = creep.pos.findClosestByPath(route[0].exit);
            creep.moveTo(exit, { reusePath : 25 });
        } 

        return false;
    }
}
