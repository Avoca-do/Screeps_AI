const body_types = {
    miner : [[WORK], 0.14],
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
    outside_repairer : body_types.normal,
    ranger : [[TOUGH, TOUGH, TOUGH, RANGED_ATTACK, RANGED_ATTACK], 10],
    attacker : [[TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, ATTACK, ATTACK], 10],
    healer : [[TOUGH, TOUGH, TOUGH, TOUGH, HEAL, HEAL, HEAL], 8],
    conqueror : [[TOUGH, TOUGH, CLAIM, CLAIM], 4],
}

const SpawnCreature = (spawn, body, memory)=>{
    if(!spawn.spawning){
        let name = memory.role + Game.time;
        if(memory.remote){
            name = 'remote_' + name;
        }

        if(!memory.home){
            memory.home = spawn.room.name;
        }
        memory.task = 0; 

        console.log(body, JSON.stringify(memory));
        return spawn.spawnCreep( body, name, {
            memory : memory
        });
    }else{
        return ERR_BUSY;
    }
}

/** @param {StructureSpawn} spawn **/
module.exports = function(spawn ,args){
    console.log(JSON.stringify(args));
    let creep_memory = args.memory;
    let body_type = creeps[creep_memory.role];
    let mv = body_type[1];
    if(args.memory.remote){
        body_type = body_types.remote;
        mv *= 3;
    }

    let energy = spawn.room.energyAvailable;
    if(args.min_energy){
        energy = energy > args.min_energy ? energy : args.min_energy;
    }

    if(args.max_energy){
        energy = energy < args.max_energy ? energy : args.max_energy;
    }
    let body = createBody(energy, body_type[0], mv);
    let response = SpawnCreature(spawn, body, creep_memory);
    if(response == 0){
        console.log('spawning' , JSON.stringify(args));
        return response;
    }
    return response;
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

const createBody = (energy, body_parts, moveRatio) => {
    let body = [];

    if(moveRatio < 1){
        let scost = bodyCost(body_parts);
        let mr = Math.floor((energy - 50) / scost);
        if(mr < 1)
            mr = 1;
        let ratio = 1 / moveRatio;
        if(ratio > mr){
            ratio = mr;
        }
        for(let i = 0; i < ratio; i++){
            body = body.concat(body_parts);
        }
        body.push(MOVE);
    }else{
        for(let i = 0; i < moveRatio; i++){
            body.push(MOVE);
        }
        body = body.concat(body_parts);
    }
    let cost = bodyCost(body);
    if(cost > energy){
        return body;
    }
    let numDuplicate = Math.floor(energy / cost);
    let ebody = [];
    for(let i = 0; i < numDuplicate; i++){
        ebody = ebody.concat(body);
    }
    console.log('createBody f', body, cost, energy, numDuplicate, bodyCost(ebody));
    ebody.sort();
    ebody = ebody.reverse();
    return ebody;
}

function bodyCost (body) {
    return body.reduce(function (cost, part) {
        return cost + BODYPART_COST[part];
    }, 0);
}