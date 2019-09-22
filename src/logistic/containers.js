module.exports = {

    /** @param {Room} room **/
    run : function(room){
        let sources = room.find(FIND_SOURCES);

        if(sources.length > mc || !mc){
            let spawn = room.find(FIND_MY_SPAWNS)[0];
            let containers = 0;
            for(let i = 0; i < sources.length; i++){
                let source = sources[i];
                let containers = source.pos.findInRange(FIND_STRUCTURES, 1, {
                    filter : (s) => s.structureType == STRUCTURE_CONTAINER
                });
    
                console.log(containers.length);
                if(containers.length > 0){
                    containers += 1;
                }else{
                    let path = spawn.pos.findPathTo(source, {
                        ignoreCreeps : true,
                        ignoreRoads : true,
                    });
                    path = path.reverse()[1];
                    let str = room.lookForAt(LOOK_CONSTRUCTION_SITES, path.x, path.y);
                    if(str.length == 0){
                        room.createConstructionSite( path.x, path.y , STRUCTURE_CONTAINER );
                    }
                }
            }
            console.log("wtf?");
        }
    }
}