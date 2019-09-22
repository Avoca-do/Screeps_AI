module.exports = {
    add : function(data){
        try{
            let reinforcement = Memory.logistics.reinforcement ;
            let id = Memory.logistics.next_rf;
            reinforcement[id] = { id : id, data : data };
            Memory.logistics.next_rf++;
            if(Memory.logistics.next_rf > 10000){
                Memory.logistics.next_rf = 0;
            }
            console.log('Added', JSON.stringify(data), 'to ');
        }catch(error){
            try{
                Memory.logistics.reinforcement = { };
            }catch(error){
                Memory.logistics = {
                    reinforcement : {},
                    next_rf : 0,
                }
            }
            this.add(data);
        }
    },

    remove : function(id){
        let reinforcement = Memory.logistics.reinforcement;
        if(reinforcement[id]){
            console.log('removed data at',id);
            delete reinforcement[id];
        }
    },

    remove_object : function(obj){
        if(obj.id){
            this.remove(obj.id);
        }
    },

    first : function(){
        let all = this.get_all();
        for(let o in all){
            return all[o];
        }
        return null;
    },

    get_all : function(){
        return Memory.logistics.reinforcement;
    },
}