import { world } from "mojang-minecraft";

var overworld = world.getDimension("overworld");
// overworld.runCommand()

world.events.beforeItemUse.subscribe(function (e) {
  if (e.item.id === "adamraichu:sniper") {
    overworld.runCommand(`playsound guns.sniper.fire ${e.source.name} ~ ~ ~ 10`);
    var ent = e.source.getEntitiesFromViewVector();
    if (ent.length > 0) {
      var h = ent[0].getComponent("minecraft:health");
      h.setCurrent(h.current - 15);
    }
  }
});