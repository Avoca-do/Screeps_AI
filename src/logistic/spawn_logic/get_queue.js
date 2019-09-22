const roles = {
    transferer : [2 , 8],
    repairer : [1 , 3],
    builder : [1 , 4],
    upgrader : [3, 6],
}

const min_energy_c = 1200;

module.exports = { 

    /** @param {Room} room **/
    get: function(room){
        //let mroles = room.memory.roles;
        let min_energy = room.energyCapacityAvailable * 0.75;
        if(min_energy > min_energy_c)
            min_energy = min_energy_c;
        let priority = 10;
        let transferers = _.sum(Game.creeps, (c) => c.memory.role == 'transferer');
        //console.log(transferers + ' t');
        if(transferers < 1){
            return {
                role : 'transferer'
            }
        }

        if(room.energyAvailable >= min_energy){
            //console.log("?");
            let queue = undefined;
            console.log('spawn stats room -', room.name)
            for(let role in roles){
                //let ir = mroles[role];
                let ir = _.sum(Game.creeps, (c) => !c.memory.remote && 
                    (c.memory.home == room.name) && c.memory.role == role);
                //console.log(ir, role);
                if(ir == null){
                    mroles[role] = 0;
                }

                let rv = Math.floor((min_energy - 300) * 0.0025);
                if(rv < 0)
                    rv = 0;
                let nm = roles[role][0] - rv;
                nm = nm < 1 ? 1 : nm;
                console.log(nm + " - " + role + ' q - ' + ir);
                if(nm > ir){
                    let qpriority = (ir + 1) / roles[role][1];
                    if(qpriority < priority){
                        priority = qpriority;
                        queue = role;
                    }
                }
                //console.log(queue);
            }
            if(queue){
                return {
                    role : queue,
                }
            }else{
                return null;
            }
            //return spawnLogDistanceCreep(spawn);
        }
        return ERR_NOT_ENOUGH_ENERGY;
    }


}