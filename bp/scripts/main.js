import { world } from "mojang-minecraft";
import { Test as test } from "mojang-gametest";

var overworld = world.getDimension("overworld");

world.events.beforeItemUse.subscribe(function (e) {
  if (e.item.id === "adamraichu:sniper") {
    if (e.source.getItemCooldown("guns") === 0) {
      e.source.runCommand(`playsound guns.sniper.fire @a[r=160] ~ ~ ~ 10`);
      var ent = e.source.getEntitiesFromViewVector();
      if (ent.length > 0) {
        var h = ent[0].getComponent("minecraft:health");
        var armor = 1;
        h.setCurrent(h.current - (15 * armor));
      }
    } else {
      e.source.runCommand(`title @s actionbar Still reloading...`)
    }
  } else if (e.item.id === "adamraichu:scope") {
    if (e.source.hasTag("_guns_001")) {
      e.source.runCommand("tag @s remove _guns__001");
    } else {
      e.source.runCommand("tag @s add _guns__001");
    }
  }
});