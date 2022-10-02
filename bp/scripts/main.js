import { world } from "mojang-minecraft";

var overworld = world.getDimension("overworld");

world.events.beforeItemUse.subscribe(function (e) {
  if (e.item.id === "adamraichu:sniper" && e.source.getItemCooldown("guns") === 0) {
    e.source.runCommand(`playsound guns.sniper.fire @s ~ ~ ~ 10`);
    var ent = e.source.getEntitiesFromViewVector();
    if (ent.length > 0) {
      var h = ent[0].getComponent("minecraft:health");
      h.setCurrent(h.current - 20);
    }
  } else {
    e.source.runCommand(`title @s actionbar Still reloading...`)
  }
});