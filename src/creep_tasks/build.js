const upgrade_task = require('./creep_tasks.upgrade')

module.exports = {
    run : function(creep){
        var cid = creep.memory.tid;
        var constructionSite = Game.getObjectById(cid);
        if(!constructionSite || constructionSite){
            let utime = Game.time - creep.memory.rt;
            if(utime == 0 || utime > 7 || !utime){
                var plist = creep.room.find(FIND_MY_CONSTRUCTION_SITES).filter(s => s.structureType != STRUCTURE_ROAD);
                if(plist.length == 0){
                    constructionSite = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES);
                }
                else
                    constructionSite = creep.pos.findClosestByPath(plist);
                //console.log(constructionSite);
                //var test = creep.pos.findClosestByPath(test);
                if(constructionSite){
                    //console.log(constructionSite , creep.name);
                    creep.memory.tid = constructionSite.id;
                    creep.memory.rt = Game.time - 10;
                    //console.log("found target - " + creep.name +  " t - " + utime);
                }else{
                    creep.memory.rt = Game.time;
                }        
            }else{
                constructionSite = null;
            }
        }
        if(constructionSite){
            let response = creep.build(constructionSite);
            //console.log("found target constructing - " + creep.name + " res - " + response);
            if(response == ERR_NOT_IN_RANGE){
                creep.moveTo(constructionSite, {reusePath : 25});
                //creep.reusePath(constructionSite);
            }
        }else{
            return upgrade_task.run(creep);
        }

        return creep.carry.energy == 0;
    }
}