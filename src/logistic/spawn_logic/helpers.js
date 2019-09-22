const reinforcement = require('./memory.reinforcement')

module.exports = { 
    /** @param {Room} room **/
    get: function(){
       let queue = reinforcement.get_all();
       console.log(JSON.stringify(reinforcement.first()));
       return null;
    }
}