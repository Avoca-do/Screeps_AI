module.exports = {
    /** @param {Creep} creep **/
    run : function(creep){
        if(creep.room.name == creep.memory.home){
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
            return true;
        }  
        const route = Game.map.findRoute(creep.room, creep.memory.home);
        if(route.length > 0){
            let exit = creep.pos.findClosestByPath(route[0].exit);
            creep.moveTo(exit, { reusePath : 25 });
            return false;
        } 
        return true;
    }
}
