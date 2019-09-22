# Screeps_AI


My screeps AI-bot

So far so good,

Capabilities - 
Automatic unit spawn,
automatic upgrades, build and repair,
Tower defence,

long distance harvesting,


Spawn Options :

Spawn "units" with the same target and goal,

how to add to spawn queue : 
Game.spawns['Spawn1'].room.memory.spawn_queue.push({ memory : { role: 'upgrader', helper: true, home: 'E47N29'} , max_energy : 350 });

this create an upgrader 
that would transfer to E47N29
and then would start his job as an upgrader by disabeling helper variable.

max_energy - maximum energy cost of the unit.
min_energy - minimum energy cost of the unit.

memory - the creeps initial memory.

military unit :

Game.spawns['Spawn1'].room.memory.spawn_queue.push({ memory : { role: 'attacker', unit : 'A1'} , max_energy : 1800 , min_energy : 1200 });

create an attacker , energy cost 1200-1800.
the attacker "unit" is 'A1'  that means that all his actions would be based on 'A1' commands.


unit- options so far:
Memory.military['unitname'] = {
  target : 'E47N29'  -  the target room to 'attack/defend' or advance toward.
  command : 'gather' - the command of the unit
};

supported commands : 
'gather' - gather outside the target room , on the edge of exit toward 'target', from the faster rout possible.
'conquer' - for all other units, as regular just enter the room and kill everything in it by this priority -
tower -> offensive creeps -> everything else.
the catch it create an conqueror troop that would attack the controller and then claim it when possible.
create a CLAIM creep every 700 ticks +-.

