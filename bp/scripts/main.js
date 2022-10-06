import { world, MinecraftEffectTypes } from "mojang-minecraft";
import { Test as test } from "mojang-gametest";

var overworld = world.getDimension("overworld");

world.events.tick.subscribe(function (e) {
  // For scoping
  var players = world.getPlayers();
  for (var p of players) {
    var inv = p.getComponent("minecraft:inventory").container;
    var selected = inv.getItem(p.selectedSlot);
    if (typeof selected !== "undefined") {
      // this is in case player is holding nothing
      if (selected.id === "guns:sniper" && p.isSneaking) {
        p.addEffect(MinecraftEffectTypes.slowness, 5, 255, false);
      }
    }
  }
});

world.events.beforeItemUse.subscribe(function (e) {
  // For rifle firing
  if (e.item.id === "guns:sniper") {
    if (e.source.getItemCooldown("guns") === 0) {
      e.source.runCommand(`playsound guns.sniper.fire @a[r=160] ~ ~ ~ 10`);
      var ent = e.source.getEntitiesFromViewVector();
      if (ent.length > 0) {
        if (!ent[0].hasTag("_guns__001")) {
          var h = ent[0].getComponent("minecraft:health");
          var armor = 1;
          ent[0].runCommand("summon snowball ~ ~.2 ~");
          h.setCurrent(h.current - (15 * armor));
        }
      }
    } else {
      e.source.runCommand(`title @s actionbar Still reloading...`);
    }
  }
});