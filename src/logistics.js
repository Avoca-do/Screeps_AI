const containers = require('./logistic.containers')

const spawn_logistic = require('./logistic.spawn');
const room_build = require('./logistic.buildings');
const links = require('./logistic.base.links');

const base = require('./logistic.room_planner.room_constractor')

/** @param {Room} room **/
const initRoom = function(room){
    if(!room.memory.initialized){
        let sc = room.find(FIND_SOURCES);

        room.memory.sources = sc.length;
        room.memory.initialized = true;
        room.memory.miners = [ '', ''];
        room.memory.spawn_queue = [];
        room.memory.remote = {};
        room.memory.remote.target = [];
        room.memory.links = {};
        
        console.log('initialazing room - ' + room.name);
    }
}

module.exports = {
    run: function(){
        let roles = {};
        let roles_remote = {};
        for(let name in Game.rooms){
            let room = Game.rooms[name];
            if(!room.controller.my)
                continue;
            links.run(room);
            initRoom(room);
            base.init(room);
            if(!room.memory.planner.disabled){ 
                base.loop(room);
            }
            //console.log(room);
            //console.log(Game.cpu.getUsed() + " ms");  
        }

        room_build.run(Game.rooms['E47N29']);
        let room = Game.rooms["E49N29"];
        for(let name in Memory.creeps){
            //console.log(Game.creeps.length);
            if(!Game.creeps[name]){
                let task = Memory.creeps[name].task;
                delete Memory.creeps[name];
            }
        } 
        spawn_logistic.run(room);
        let rm2 = Game.rooms['E47N29'];

        spawn_logistic.run(rm2);

        //base.init(room);
        //base.loop(room);

        //containers.run(Game.rooms["E49N29"]);

        let args = Memory.args;
        if(args){
            console.log('processing', JSON.stringify(args), '!!');
            if(args.unit){
                let unit = Memory.military[args.name];
                if(unit){
                    if(args.target){
                        unit.target = args.target;
                    }

                    if(args.command){
                        unit.command = args.command;
                    }
                }
            }
            delete Memory.args;
        }

        let units = Memory.military;
        for(let i in units){
            let unit = units[i];

            if(unit.command == 'conquer'){
                let conquerors = _.sum(Game.creeps, (c) => c.memory.unit == i && c.memory.role == "conqueror");
                let bmaking = _.sum(room.memory.spawn_queue, (q) => q.role == 'conqueror' && q.unit == i);
                conquerors += bmaking;
                if(conquerors == 0){
                    let be = unit.block_end;
                    //console.log(be);
                    if(Game.time > be - 400){
                        console.log("creating new conqueror!");
                        room.memory.spawn_queue.push({ unit: i, role: 'conqueror'})
                    }
                }
                //console.log(i, conquerors, unit.block_end);
            }
        }
    }
}