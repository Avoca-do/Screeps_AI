var constants = require('./CONSTANTS');


module.exports = {

    heavyTask: function(creep, task){},
    
    /** @param {Creep} creep **/
    run: function(creep, task){
        //var pos = new RoomPosition(creep.memory._move.dest.x, creep.memory._move.dest.y, creep.room);
        //creep.prototype.interact(creep);
        //console.log(creep.name + " upgrader - " + task);
        if(task == constants.WORK){
            //console.log('upgrade loop?!');
            if(creep.run_task('upgrade')){
                creep.setTask(constants.HARVEST);
            }
        }else if(task == constants.HARVEST){
            if(creep.run_task('withdraw')){
                creep.setTask(constants.WORK);
            }
        }else{
            creep.setTask(constants.WORK);
        }
    }
}
