//Game.spawns['Spawn1'].room.memory.spawn_queue.push({ role: 'attacker'});
//Game.spawns['Spawn1'].room.memory.spawn_queue.push({ unit: 'A1' role: 'attacker'});

//Game.spawns['Spawn1'].room.memory.spawn_queue.push({ memory : { role: 'upgrader'} , max_energy : 350 });
//Game.spawns['Spawn1'].room.memory.spawn_queue.push({ memory : { role: 'upgrader', helper: true, home: 'E47N29'} , max_energy : 350 });
//Memory.args = { unit: true, command : "conquer", name:'A1', target: 'E47N29' }


const body_types = {
    miner : [[WORK], 0.15],
    transferer : [[CARRY], 0.5],
    normal : [[CARRY, WORK], 1],
    remote : [[CARRY, CARRY, WORK], 1],
}

const creeps = {
    miner :  body_types.miner,
    transferer :  body_types.transferer,
    repairer :  body_types.normal,
    builder :  body_types.normal,
    upgrader :  body_types.normal,
    reserver : [[CLAIM], 0.7],
    harvester : body_types.normal,
    ranger : [[TOUGH, TOUGH, TOUGH, RANGED_ATTACK, RANGED_ATTACK], 10],
    attacker : [[TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, ATTACK, ATTACK], 10],
    healer : [[TOUGH, TOUGH, TOUGH, TOUGH, HEAL, HEAL, HEAL], 8],
    conqueror : [[TOUGH, TOUGH, CLAIM, CLAIM], 4],
}

const get_queue = require('./logistic.spawn_logic.get_queue')
const get_queue_remote = require('./logistic.spawn_logic.get_remote_queue')
const spawn_creep = require('./logistic.spawn_logic.get_order');
const helper = require('./logistic.spawn_logic.helpers')
const reinforcement = require('./memory.reinforcement')


const safety_check = function(room){
    let miners = room.memory.miners;
    let sm = room.find(FIND_MY_CREEPS, { filter : c => c.memory.role == 'miner' }).length;
    //console.log(sm);
    if((!Game.creeps[miners[0]] || !Game.creeps[miners[1]]) && sm < 2){   
        if(room.memory.spawn_queue.length == 0){
            if(Game.creeps[miners[0]] || Game.creeps[miners[1]])
            {
                if(room.find(FIND_MY_CREEPS, { filter : c => c.memory.role == 'transferer' }).length == 0){

                    const args = {
                        memory : {
                            role : 'transferer',
                        },
                        max_energy : 800
                    }
                    room.memory.spawn_queue.unshift(args);
                    return;
                }
            }
            const args = {
                memory : {
                    role : 'miner',
                },
                max_energy : 1000
            }
            room.memory.spawn_queue.unshift(args);
        }
    }
}

module.exports = {
    /** @param {Room} room **/
    run : function(room){
        safety_check(room);
        let spawn = get_spawn(room);
        if(!spawn)
            return;
        //if there is creeps in queue spawn them first!
        let queue_list = room.memory.spawn_queue;
        if(queue_list.length > 0){
            //let response = SpawnCreature(spawn, body, queue_list[0] );
            let response = spawn_creep(spawn, queue_list[0]);
            console.log('trying to spawn', JSON.stringify(queue_list[0]), response);
            if(response == 0){
                room.memory.spawn_queue.shift();
                return;
            }
        }else{
            let queue = reinforcement.first();
            if(queue){
                //console.log("am i firsT?");
                let response = spawn_creep(spawn ,queue.data);
                if(response == 0){
                    console.log('spawning' , JSON.stringify(queue));
                    reinforcement.remove(queue.id);
                    return;
                }
                return;
            }
            let creep_settings = get_queue.get(room);
            //if need to create creeps for this room spawn them!
            if(creep_settings == ERR_NOT_ENOUGH_ENERGY)
                return;
            if(creep_settings){
                let args = {
                    memory : creep_settings,
                }
                if(creep_settings.role == 'transferer'){
                    args.max_energy = 800;
                }
                let response = spawn_creep(spawn, args);
                if(response == 0){
                    console.log('spawning' , JSON.stringify(creep_settings));
                    return;
                }
            }else{
                if(room.energyCapacityAvailable < 600){
                    return;
                }
                let creep_settings = get_queue_remote.get();
                let args = {
                    memory : creep_settings,
                }
                let response = spawn_creep(spawn, args);
                if(response == 0){
                    console.log('spawning' , JSON.stringify(creep_settings));
                    return;
                }
            }
        }  
    }
}



const get_spawn = (room)=>{
    let spawns = room.find(FIND_MY_SPAWNS, {
        filter : (s) => !s.spawning,
    });
    if(spawns.length > 0){
        return spawns[0];
    }
    return null;
}