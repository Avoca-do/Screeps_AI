const reinforcement = require('./memory.reinforcement');

const intializeRoom = function(room){
    if(!room.memory.initialized){
        let sc = room.find(FIND_SOURCES);

        room.memory.sources = sc.length;
        if(!room.memory.miners)
            room.memory.miners = new Array(sc.length);

        let sp = room.find(FIND_CONSTRUCTION_SITES, { filter : (s)=> s.structureType == STRUCTURE_SPAWN});
        let center = {};
        if(sp.length > 0){
            center.x = sp[0].pos.x;
            center.y = sp[0].pos.y;
            room.memory.center = center;
        }else if(!room.memory.center){
            let x = room.controller.pos.x;
            let y = room.controller.pos.y;
            let s = 1;
            for(let i in sc){
                x += sc[i].pos.x;
                y += sc[i].pos.y;
                s++;
            }

            x /= s;
            y /= s;

            x = Math.round(x);
            y = Math.round(y); 

            room.memory.center = { x : x, y : y }
        }
        center = room.memory.center;
        room.createConstructionSite(center.x, center.y, STRUCTURE_SPAWN, 'Spawn' + Game.spawns.length + 1);

        //let map = room.getTerrain();
        //for(let x1 = ; x1 >)
        
        //console.log(JSON.stringify(map.get(x, y)));
        console.log(center.x, center.y, 'spawn point?');

        room.memory.initialized = true;
        if(!room.memory.spawn_queue)
            room.memory.spawn_queue = [];
        
        console.log('initialazing room - ' + room.name);
    }
}

const find_pos = function(){

}

module.exports = {
    /** @param {Room} room **/
    run : function(room){
        intializeRoom(room);
        //console.log("hallo?");
        let spawns = room.find(FIND_MY_SPAWNS);

        if(room.memory.harvest){
            if(room.find(FIND_MY_CREEPS, { filter : c => c.memory.role == 'harvester' }) < 2){
                if(room.memory.spawn_queue.length == 0){
                    const args = {
                        memory : {
                            role : 'harvester',
                        },
                        max_energy : 1000
                    }
                    room.memory.spawn_queue.unshift(args);
                }
            }
        }

        if(spawns.length == 0){
            console.log('no spawn wtf?!');
            let builders = _.sum(Game.creeps, (c) => c.memory.role == 'builder' && c.memory.home == room.name);
            builders += _.sum(reinforcement.get_all(), (r) => {
                let m = r.data.memory;
                return m.role == 'builder' && m.home == room.name;
            });

            if(builders < 3){
                reinforcement.add({ memory : { role : 'builder', helper : true, home : room.name }, min_energy : 1000 });
            }
            //console.log("working?");
            let sp = room.find(FIND_CONSTRUCTION_SITES, { filter : (s)=> s.structureType == STRUCTURE_SPAWN});
            let center = room.memory.center;
            if(sp.length > 0){
                center.x = sp[0].pos.x;
                center.y = sp[0].pos.y;
            }
            let map = room.getTerrain();



            //console.log(room.)

        }
    }
}