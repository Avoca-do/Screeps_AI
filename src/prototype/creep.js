var constants = require('./CONSTANTS');

const comparePos = (posA, posB)=>{
    if(!posA || !posB)
        return false; 
    return posA.x == posB.x && posB.y == posA.y && posA.roomName == posB.roomName;
}


module.exports = function(){
    /** @param {Structure} target **/
    Creep.prototype.reusePath = function(target, args){
        if(target && !(target.x)){
            target = target.pos;
        }

        if(!comparePos(target, this.memory.path_end) || this.memory.fails > 5){
            //console.log("generating new path! f - " + this.memory.fails + " creep -" + this.name , this.room.name);
            this.memory.path = this.pos.findPathTo(target, {
                //ignoreCreeps : true
            });
            this.memory.path_end = target;
            this.memory.fails = 0;
            this.memory.path_id = 0;
        }
        //let endn = this.memory.path.reverse()[0];
        //console.log(endn.x + " ," + endn.y);
        //let res = this.moveByPath(this.memory.path);
        let path = this.memory.path;
        let res = this.move(path[this.memory.path_id]);
        if(res == ERR_NOT_FOUND){
            this.memory.fails += 1;
        }else{
            //this.memory.path_id += 1;   
        }
        console.log(res + ' ' + this.name);
        //this.memory.last_move = Game.time;
        //this.moveByPath(this.memory.path);
    }

    Creep.prototype.normalHarvest = function(break_task){ 
        var source = this.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        let response = this.harvest(source);
        //console.log(response);
        if(response == ERR_NOT_IN_RANGE){
            this.moveTo(source, { reusePath : 10, 
                visualizePathStyle: {stroke: '#ffffff'},
                plainCost: 2,
                swampCost: 3,
            });
        }else if((response == ERR_INVALID_TARGET && this.carry.energy >= 50)){
            this.setTask(break_task);
            return false;
        }

        if(this.carry.energy == this.carryCapacity || this.ticksToLive < 50){
            this.setTask(break_task);
            return false;
        }
        return true;
    }

    Creep.prototype.setTask = function(task){
        this.memory.task = task; 
    }

    Creep.prototype.set_unit = function(){
        let unit_name = this.memory.unit;
        if(!unit_name){
            unit_name = this.room.name;
            this.memory.unit = unit_name;
        }
        console.log('adding soldier to unit', unit_name);
        try{
            let unit = Memory.military[unit_name];
            if(!unit){
                console.log('creating new unit', unit_name);
                let target = this.memory.targetRoom;
                Memory.military[unit_name] = {
                    target : target ? target : this.room.name,
                    command : 'defend',
                    sleep : 0,
                    block_end : 0
                }
            }
        }catch(error){
            Memory.military = {}
            console.log('military term doesnt exit!');
            this.set_unit(unit_name);
        }
    }

    Creep.prototype.unit_members = function(){
        return _.filter(Game.creeps, (c) => c.memory.unit == this.memory.unit);
    }

    Creep.prototype.unit = function(){
        return Memory.military[this.memory.unit];
    }

    //Memory.structures = {};
    Structure.prototype.getMemory = function(){
        try{
            let obj = Memory.structures[this.id];
            if(!obj){
                Memory.structures[this.id] = {};
                return Memory.structures[this.id];
            }
            return obj;
        }catch(error){
            Memory.structures = {};
            return this.getMemory();
        }
    }

    
}