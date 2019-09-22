const tasksIds = {
    0 : require('./creep_tasks.travel_target'),
    1 : require('./creep_tasks.travel_home'),
    2 : require('./creep_tasks.store'),
    3 : require('./creep_tasks.harvest'),
    4 : require('./creep_tasks.upgrade'),
    5 : require('./creep_tasks.build'),
    6 : require('./creep_tasks.repair'),
    7 : require('./creep_tasks.reserve'),
    8 : require('./creep_tasks.withdraw'),
    9 : require('./creep_tasks.pickup'),
}

const tasks = {
    travel_target : require('./creep_tasks.travel_target'),
    travel_home : require('./creep_tasks.travel_home'),
    store : require('./creep_tasks.store'),
    harvest : require('./creep_tasks.harvest'),
    upgrade : require('./creep_tasks.upgrade'),
    build : require('./creep_tasks.build'),
    repair : require('./creep_tasks.repair'),
    reserve : require('./creep_tasks.reserve'),
    withdraw : require('./creep_tasks.withdraw'),
    pickup : require('./creep_tasks.pickup'),
    invade : require('./creep_tasks.invade'),
    get_attack_target : require('./creep_tasks.get_attack_target'),
}

module.exports = function(){
    Creep.prototype.run_task_id = function(task_id){
        return tasksIds[task_id].run(this);
    }

    Creep.prototype.run_task = function(task_name){
        //console.log(task_name + " " + tasks[task_name]);
        return tasks[task_name].run(this);
    }
}