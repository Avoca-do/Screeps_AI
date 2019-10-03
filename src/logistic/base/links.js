module.exports = {
    /** @param {Room} room **/
    run : (room) => {
        let links = room.find(FIND_MY_STRUCTURES, {
            filter : (s) => s.structureType == STRUCTURE_LINK
        })
        if(links.length <= 1)
            return;

        for(let link of links){
            let memory = link.getMemory();
            if(!memory.initialized){
                if(link.pos.getRangeTo(room.controller) <= 3){
                    memory.role = 'controller';
                    room.memory.links['controller'] = link.id;
                }
                else if(room.storage && link.pos.getRangeTo(room.storage) <= 3){
                    memory.role = 'storage';
                    room.memory.links['storage'] = link.id;
                }
                memory.initialized = true;
            }
        }
        for(let link of links){
            let memory = link.getMemory();
            console.log(JSON.stringify(memory), room);
            if(link.cooldown == 0 && memory.role != 'controller' && link.energy > 200){
                let cl = Game.getObjectById(room.memory.links['controller']);
                if(!cl || (cl.energy > 600 || link.transferEnergy(cl) != 0)){
                    console.log("?sending?", room.memory.links['storage']);
                    let cl = Game.getObjectById(room.memory.links['storage']);
                    if(cl.energy < 600){
                        link.transferEnergy(cl)
                    }
                }
                console.log("?sending?", cl, room);
            }
        }
    }
}