import { world } from "mojang-minecraft";

var overworld = world.getDimension("overworld");
// overworld.runCommand()

world.events.beforeItemUse.subscribe(function(e) {
  if (e.item.id === "adamraichu:sniper") {
    overworld.runCommand("tell @a loud noise");
    var ent = e.source.getEntitiesFromViewVector();
    if (ent.length > 0) {
      var h = ent[0].getComponent("minecraft:health");
      h.setCurrent(h.current - 15);
    }
    // (recoil) execute as user tp @s ^ ^ ^-1
  }
});