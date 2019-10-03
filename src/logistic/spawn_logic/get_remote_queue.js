//Game.rooms['E47N29'].memory.remote = {}
//Game.rooms['E47N29'].memory.remote.target = ['E48N29', 'E47N28', 'E46N29']

module.exports = { 

    /** @param {Room} home **/
    get: function(home){
        let rooms = home.memory.remote.target;
        if(rooms.length == 0)
            return;

        let hr = [];
        let ur = [];

        let qt = [];
        for(let i in rooms){
            let room = rooms[i];
            let harvesters = _.sum(Memory.creeps, (c) => c.targetRoom == room && c.role == 'harvester');
            hr.push(harvesters);
            let builders = _.sum(Memory.creeps, (c) => c.targetRoom == room && c.role == 'builder');
            ur.push(builders);
            
            qt.push(builders + harvesters);
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
            if(num > 4){
                return;
            }
        }

        if(hr[t] > ur[t] && home.controller.level < 8){
            return {
                role : 'builder',
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