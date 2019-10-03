module.exports = {
    /** @param {Creep} creep **/
    run : function(creep){
        let unit = creep.unit();
        let target = unit.target;
        if(unit.command == 'free'){
            let t = creep.memory.targetRoom;
            target = t ? t : target;
        }
        if(creep.room.name == target){
            creep.memory.exit_pos = null;
            return true;
        }
        const route = Game.map.findRoute(creep.room, target);
        //console.log(creep.memory.targetRoom);
        //console.log(JSON.stringify(route[0]));
        if(route.length > 0){
            let exit = creep.pos.findClosestByPath(route[0].exit);
            //console.log('nani?!');
            let invade = unit.command != 'gather'; 
            if(invade || route.length > 1 || creep.pos.getRangeTo(exit) > 2){
                creep.moveTo(exit, { reusePath : 25, 
                    //visualizePathStyle: {stroke: '#ffffff'},
                    plainCost: 2,
                    swampCost: 3,
                });
            }else{
                console.log(creep.name ,'w8ing for the order to invade!');
                return true;
            }
        }else{
            creep.memory.targetRoom = creep.room.name;
        }
        return false;
    }
}
