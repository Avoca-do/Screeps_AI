module.exports = {

    control: function(){
        for(let name in Game.rooms){
            let room = Game.rooms[name];
            if(!room.controller.my)
                continue;
            let towers = room.find(FIND_MY_STRUCTURES, {
                filter : (s) => s.structureType == STRUCTURE_TOWER
            });
            if(!Memory.underAttack){
                for(let tname in towers){
                    /** @param {StructureTower} tower **/
                    let tower = towers[tname];

                    // let test = [2, 1, 4, 10, 3, 5, 10];
                    // test = test.sort(function(a,b){return a - b});
                    // console.log(test);

                    if(tower.energy < 700){
                        if(tower.energy > 400){
                            let healc = room.find(FIND_MY_CREEPS, {
                                filter : (c) => c.hits < c.hitsMax
                            })
                            tower.heal(healc[0]);
                        }
                        continue;
                    }

                    let utime = Game.time - tower.getMemory().rt;
                    let repairTarget = Game.getObjectById(tower.getMemory().tid);
                    if(!repairTarget || repairTarget.hits == repairTarget.hitsMax || utime > 20){
                        if(utime == 0 || utime > 7 || !utime){
                            repairTarget = tower.room.find(FIND_STRUCTURES, {
                                filter : s => s.hits < s.hitsMax * 0.2 && s.hits < 30000
                            }).sort((s, s2) => s.hits - s2.hits);
                            //console.log(repairTarget[repairTarget.length - 1].hits);
                            if(repairTarget.length > 0){
                                repairTarget = repairTarget[0];
                                tower.getMemory().tid = repairTarget.id;
                                tower.getMemory().rt = Game.time - 10;
                                //console.log(' tower new target = ' + repairTarget + " hip -" + repairTarget.hits);
                            }
                            else
                                tower.getMemory().rt = Game.time;
                        }else{
                            repairTarget = null;
                            tower.getMemory().tid = null;
                        }
                    }

                    if(repairTarget){
                        tower.repair(repairTarget);
                    }else{
                        let healc = room.find(FIND_MY_CREEPS, {
                            filter : (c) => c.hits < c.hitsMax
                        })
                        tower.heal(healc[0]);
                    }

                    //onsole.log(repairTarget + " . " + utime);
                }
            }else{
                console.log("?!!?!?!", room);
                var attackers = room.find(FIND_HOSTILE_CREEPS);
                if(attackers.length > 0){
                    for(let tname in towers){
                        let tower = towers[tname];
                        let target = tower.pos.findClosestByRange(attackers);
                        tower.attack(target);
                    }
                }
            }
        }
    }
}