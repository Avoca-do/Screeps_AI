const body_types = {
    miner : { scalable : [WORK], movement : 0.14, fixed : [CARRY, CARRY],},
    transferer : { scalable : [CARRY], movement : 1, fixed : [],},
    normal : { scalable : [CARRY, WORK], movement : 1, fixed : [],},
    remote : { scalable : [CARRY, CARRY], movement : 1.5, fixed : [WORK, WORK, WORK, MOVE, MOVE, CARRY],},
}

const creeps = {
    miner :  body_types.miner,
    transferer :  body_types.transferer,
    repairer :  body_types.normal,
    builder :  body_types.normal,
    upgrader :  body_types.normal,
    reserver : { scalable : [CLAIM], movement : 1, fixed : []},
    harvester : body_types.normal,
    outside_repairer : body_types.normal,
    ranger : { scalable : [TOUGH, TOUGH, TOUGH, RANGED_ATTACK, RANGED_ATTACK], movement : 10, fixed : [],},
    attacker : { scalable : [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, ATTACK, ATTACK], movement : 10, fixed : [],},
    healer : { scalable : [TOUGH, TOUGH, TOUGH, TOUGH, HEAL, HEAL, HEAL], movement : 8, fixed : []},
    conqueror : { scalable : [TOUGH, TOUGH, CLAIM, CLAIM], movement : 4, fixed : []},
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
        return spawn.spawnCreep( body, name, {
            memory : memory
        });
    }else{
        return ERR_BUSY;
    }
}

/** @param {StructureSpawn} spawn **/
module.exports = function(spawn ,args){
    //console.log(JSON.stringify(args));
    let creep_memory = args.memory;
    let body_type = creeps[creep_memory.role];
    if(args.memory.remote){
        body_type = body_types.remote;
        console.log(JSON.stringify(body_type));
    }

    let energy = spawn.room.energyAvailable;
    if(args.min_energy){
        energy = energy > args.min_energy ? energy : args.min_energy;
    }

    if(args.max_energy){
        energy = energy < args.max_energy ? energy : args.max_energy;
    }

    if(args.memory.role == 'miner'){
        
    }
    let body = createBody(energy, body_type);
    let response = SpawnCreature(spawn, body, creep_memory);
    if(response == 0){
        //console.log('spawning' , JSON.stringify(args));
        return response;
    }else{
        console.log(response, " - failed to spawn!");
    }
    return response;
}

const createBody = (energy, body_configuration) => {
    let body = [];
    body_parts = body_configuration.scalable;
    moveRatio = body_configuration.movement;
    let ac = bodyCost(body_configuration.fixed);
    if(moveRatio < 1){
        let scost = bodyCost(body_parts);
        let mr = Math.floor((energy - 50 - ac) / scost);
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
    let max = Math.floor((50 - body_configuration.fixed.length) / body.length);
    let numDuplicate = Math.floor((energy - ac) / cost);
    let hm = false;
    if(numDuplicate > max){
        numDuplicate = max;
        hm = true;
    }
    let ebody = body_configuration.fixed;
    for(let i = 0; i < numDuplicate; i++){
        ebody = ebody.concat(body);
    }
    if(hm){
        for(let i = body.length; i < 50; i++){
            body.push(MOVE);
        }
    }
    //console.log('createBody f', cost, energy, numDuplicate, bodyCost(ebody));
    ebody.sort();
    ebody = ebody.reverse();
    return ebody;
}

function bodyCost (body) {
    return body.reduce(function (cost, part) {
        return cost + BODYPART_COST[part];
    }, 0);
}