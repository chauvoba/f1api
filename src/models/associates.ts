import {Teams, Races, Drivers, RaceDrivers} from "./tables";

//TEAMS <-> DRIVERS
Teams.hasMany(Drivers, {
    as: "drivers",
    foreignKey: "team_id"
});
Drivers.belongsTo(Teams, {
    as: "teams",
    foreignKey: "team_id"
});
//RACEDRIVERS <-> DRIVERS
Drivers.hasMany(RaceDrivers, {
    as: "racedrivers",
    foreignKey: "driver_id"
});
RaceDrivers.belongsTo(Drivers, {
    as: "drivers",
    foreignKey: "driver_id"
});
//RACEDRIVERS <-> RACES
Races.hasMany(RaceDrivers, {
    as: "racedrivers",
    foreignKey: "race_id"
});
RaceDrivers.belongsTo(Races, {
    as: "races",
    foreignKey: "race_id"
});

console.log(`loading associate done`);
