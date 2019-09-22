var constants = require('./CONSTANTS');

const SETUP = constants.CONTINUE;
const INSTALL = 11;
const MINE = 2;

module.exports = {
    /** @param {Creep} creep **/
    run : function(creep, task){
        if(task == constants.CONTINUE){
            let sources = creep.room.find(FIND_SOURCES);
            for(let i in sources){
                let name = creep.room.memory.miners[i];
                let source = sources[i];
                if(Game.creeps[name]){
                    if(name == creep.name)
                    {
                        creep.memory.task = MINE;
                        break;
                    }
                    //console.log("no target :'(")
                    continue;
                }
                let container = source.pos.findInRange(FIND_STRUCTURES, 1, {
                    filter : (s) => s.structureType == STRUCTURE_CONTAINER
                });
                if(container.length > 0){
                    creep.room.memory.miners[i] = creep.name;
                    creep.memory.tid = container[0].pos;
                    creep.memory.source = source.id;
                    creep.memory.task = MINE;
                    console.log('found a container!' + creep.memory.tid );
                    break;
                }else{
                    let cc = source.pos.findInRange(FIND_CONSTRUCTION_SITES, 1, {
                        filter : (c) => c.structureType == STRUCTURE_CONTAINER,
                    })
                    if(cc.length > 0){
                        creep.room.memory.miners[i] = creep.name;
                        creep.memory.tid = cc[0].pos;
                        creep.memory.source = source.id;
                        creep.memory.task = MINE;
                        console.log('found a future container!' + creep.memory.tid);
                        break;
                    }else{
                        let path = creep.pos.findPathTo(source, {
                            ignoreCreeps : true,
                            ignoreRoads : true,
                        });
                        path = path.reverse()[1];
                        creep.room.memory.miners[i] = creep.name;
                        creep.room.createConstructionSite( path.x, path.y , STRUCTURE_CONTAINER );
                        creep.memory.tid = path;
                        creep.memory.source = source.id;
                        creep.memory.task = MINE;
                        console.log('found a target and started construction for container!!' + creep.memory.tid);
                        break;
                    }
                }
            }
        }else if(task == MINE){
            let pos = creep.memory.tid;
            if(creep.pos.getRangeTo(pos.x, pos.y) > 0){
                creep.moveTo(pos.x, pos.y);
            }else{
                creep.harvest(Game.getObjectById(creep.memory.source));
            }

            if(creep.ticksToLive < 75 && !creep.memory.replacement){
                let mn = creep.room.energyCapacityAvailable * 0.5;
                if(mn > 800)
                    mn = 800;
                const args = {
                    memory : {
                        role : 'miner',
                    },
                    max_energy : 1000,
                    min_energy : mn,
                }
                creep.room.memory.spawn_queue.unshift(args);
                creep.memory.replacement = true;
                console.log('called for replacement!');
            }
            //console.log('hmmmmmm mining! ' + creep.memory.tid);
        }else{
            creep.setTask(SETUP);
        }
    }
}