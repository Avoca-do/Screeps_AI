    /** @param {Source[]} arr **/
function check_multiples(arr){
    do{
    let first = arr.pop();
    for(let i in arr){
        if(arr[i].pos == first.pos)
            return first;
    }
    }while(arr.length > 1)
}


module.exports = {

    /** @param {Creep} creep **/
    run : function(creep){
        let sp = creep.memory.asource;
        let source = null;
        if(!sp){
            let sources = creep.room.find(FIND_DROPPED_RESOURCES);
            if(sources.length > 1){
                let source = check_multiples(sources);
                if(source){
                    creep.memory.asource = source.pos;
                }
            }
        }
        else{
            source = creep.room.lookForAt(LOOK_RESOURCES, sp.x, sp.y);
            if(!source){
                creep.memory.asource = null;
                return false;
            }
        }

        if(source){
            if(creep.pickup(source) == ERR_NOT_IN_RANGE){
                creep.moveTo(source, {reusePath : 25});
                //creep.reusePath(source);
            }
            return true;
        }
        return false;
    }
}