//Game.spawns['Swamp'].spawnCreep( [WORK, CARRY, MOVE], 'Builder2', { memory: { role: 'builder', task: 0 } } );
//Game.spawns['Swamp'].room.controller.activateSafeMode();
//Game.spawns['Swamp'].room.createConstructionSite( 23, 22, STRUCTURE_TOWER );

//import {myExport} from './role.harvester.js';

//import HarvesterManager from './HarvesterManager.js';
//var harvesterRole = require('role.harvester');
require('./prototype.creep')();
require('./creep_tasks')();
var constants = require('./CONSTANTS');
var towerControll = require('./towerController');
var longDistc = require('./role.helper.longDistanceCreep');
var logistics = require('./logistics');
var helper = require('./role.helper.helper');

require('./logistic.room_planner.draw_layout');
//import "./consts/CONSTANTS"

const roles = {
    harvester : require('./role.harvester'),
    upgrader : require('./role.upgrader'),
    builder : require('./role.builder'),
    repairer : require('./role.repairer'),
    reserver : require('./role.reserver'),
    miner : require('./role.miner'),
    transferer : require('./role.transferer'),
    outside_repairer : require('./role.helper.outside_repairer'),
    ranger : require('./role.combat.ranger'),
    attacker : require('./role.combat.attacker'),
    healer : require('./role.combat.healer'),
    conqueror : require('./role.combat.conqueror'),
}

const buildIfSwamp = function(room, x, y){
    let response = room.lookForAt('terrain', x, y);
    if(response == 'swamp'){
        response = room.lookForAt(LOOK_STRUCTURES, x, y);
        if(response.length == 0){
            creep.room.createConstructionSite( creep.pos.x, creep.pos.y , STRUCTURE_ROAD );
        }
    }
}


module.exports.loop = function () {
    //console.log(TESSSSSSSSSSSSSSSST);
    //console.log(TESSSSSSSSSSSSSSSST);
    //console.log(Game.cpu.getUsed());

    var spawn = Game.spawns['Spawn1'];

    //Memory.army['lel'] = 1;
    // console.log(Memory.army['lel']);
    towerControll.control();
    let frame = Game.time % 7;
    try{
        // drawLayout(Game.spawns['Spawn1'].room, false);
        // drawRoads(Game.spawns['Spawn1'].room);

        // drawLayout(Game.spawns['Spawn2'].room, false);
        // drawRoads(Game.spawns['Spawn2'].room);
    }catch(error){
        
    }

    //console.log(Game.map.findExit(spawn.room, 'E51N29') + ' exit ?!');
    if(frame == 0){
        //console.log(Game.cpu.getUsed() + "me");
        //spawner.run(Game.spawns['Spawn1'], roles);
        var attackers = 0;
        for(let i in Game.spawns){
            attackers += Game.spawns[i].room.find(FIND_HOSTILE_CREEPS).length;
        }

        if(attackers > 0){
            console.log("?!222222222!!! under ATTACK!!!!!");
            Memory.underAttack = true;
        }else{
            console.log("?SDSDS");
            Memory.underAttack = false;
        }
    }else if(frame == 1){
        logistics.run();
    }

    for(var name in Game.creeps){
        var creep = Game.creeps[name];
        //console.log(creep.memory.remote);
        if(creep.memory.helper){
            helper.run(creep);
            continue;
        }

        if(creep.memory.remote == true){
            let time = Game.cpu.getUsed();
            longDistc.run(creep);  
            //console.log(Game.cpu.getUsed() - time, " cr - " + creep.name , " r -" + creep.room.name);
        }else{
            //console.log(name);
            //console.log(name);
            if(!creep.memory.home)
                creep.memory.home = creep.room.name;
            let task = creep.memory.task;
            let role = creep.memory.role;
            roles[role].run(creep, task);         
        }
    }

    if(frame == 2){
        //console.log(Game.cpu.getUsed());
        //console.log(Object.keys(Game.constructionSites).length);
        if(Object.keys(Game.constructionSites).length < 80){
            for(let name in Game.creeps){
                let creep = Game.creeps[name];
                let response = creep.pos.lookFor(LOOK_STRUCTURES);

                if(response.length == 0){
                    response = creep.pos.lookFor(LOOK_CONSTRUCTION_SITES);
                    //console.log(response);
                    if(response.length == 0){
                        //creep.room.createConstructionSite( creep.pos.x, creep.pos.y , STRUCTURE_ROAD );
                        //console.log("created new ROAD");
                    }
                }
            }

            
        }
        //console.log(Game.cpu.getUsed());
    }
    console.log("Run time : " + Game.cpu.getUsed() + " , order : " + frame);

    try{
        let profiler = Memory.profiler;
        if(profiler.reset){
            profiler.cpu = 0;
            profiler.cycles = 0;
            profiler.reset = false;
            profiler.avg_cpu = 0;
        }
    
        profiler.cycles += 1;
        let ticks = profiler.cycles;
        if(ticks > 100){
            ticks = 100;
        }
        let pr = 1 / ticks;
        let cpu = Game.cpu.getUsed();
        profiler.avg_cpu = profiler.avg_cpu * (1 - pr) + cpu * pr;
        profiler.cpu += cpu;
    
        if(profiler.enabled){
            console.log("Avg cpu " + profiler.avg_cpu + ' ticks - ' + ticks);
            console.log("Avg cpu " + profiler.cpu / profiler.cycles + ' ticks - ' + profiler.cycles);
        }
    }catch(error){
        console.log("wat");
        delete Memory.cycles;
        delete Memory.avg_cpu;
        delete Memory.reset;
        Memory.profiler = {
            cycles : 0,
            cpu : 0,
            avg_100 : 0,
            reset : false,
            enabled : true,
        };

        //console.log(Memory.profiler);
    }
    //console.log(Game.cpu.getUsed());
}