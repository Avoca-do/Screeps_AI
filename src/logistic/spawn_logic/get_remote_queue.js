const roles = {
    transferer : 8,
    repairer : 4,
    //builder : [3 , 4],
    upgrader : 4,
    //conqueror : 6,
}
const sr = ['harvester', 'upgrader'];

const rooms = ['E48N29', 'E49N28' ]//, 'E48N28'];

module.exports = { 

    get: function(){

        let hr = [];
        let ur = [];

        let qt = [];
        for(let i in rooms){
            let room = rooms[i];
            let harvesters = _.sum(Memory.creeps, (c) => c.targetRoom == room && c.role == 'harvester');
            hr.push(harvesters);
            let upgraders = _.sum(Memory.creeps, (c) => c.targetRoom == room && c.role == 'upgrader');
            ur.push(upgraders);
            
            qt.push(upgraders + harvesters);
            //console.log('test ' + room);
        }

        let t = 0;
        let num = qt[0];
        for(let i in qt){
            if(num > qt[i]){
                num = qt[i];
                t = i;
            }
        }

        if(num > 1){
            let reservers = _.sum(Memory.creeps, (c) => c.targetRoom == rooms[t] && c.role == 'reserver');
            if(reservers == 0){
                return {
                    role : 'reserver',
                    targetRoom : rooms[t],
                }
            }
            let response = outside_repairer_s(rooms[t]);
            if(response)
                return response;
            console.log(num);
            if(num > 4){
                return;
            }
        }

        if(hr[t] > ur[t]){
            return {
                role : 'upgrader',
                targetRoom : rooms[t],
                remote : true,
            }
        }else{
            return {
                role : 'harvester',
                targetRoom : rooms[t],
                remote : true,
            }
        }
    }
}

const outside_repairer_s = function(room_name){
    let outside_repairer = _.sum(Memory.creeps, (c) => c.targetRoom == room_name && c.role == 'outside_repairer');
            //console.log(' rep - ' + outside_repairer);
    if(outside_repairer == 0){
        let room = Game.rooms[room_name];
        if(room){
            let roads = room.find(FIND_STRUCTURES, { filter : (s) => s.structureType == STRUCTURE_ROAD }).length
            if(Game.rooms[room_name].find(FIND_CONSTRUCTION_SITES).length > 0 || roads > 0){
                return {
                    role : 'outside_repairer',
                    targetRoom : room_name,
                    remote : false,
                }
            }
        }
    }
    return false;
}