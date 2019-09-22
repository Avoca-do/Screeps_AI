module.exports = {
    run : function(creep){
        //console.log("upgrade works!");
        var controlBlock = creep.room.controller;
        if(creep.upgradeController(controlBlock) == ERR_NOT_IN_RANGE){
            creep.moveTo(controlBlock, {reusePath : 25});
            //creep.reusePath(controlBlock);
        }
        return creep.carry.energy == 0;
    }
}