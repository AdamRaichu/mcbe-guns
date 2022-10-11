import {
  world,
  MinecraftEffectTypes,
  EntityRaycastOptions,
} from "mojang-minecraft";
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

function gunFire(event, maxD, damage) {
  if (event.source.getItemCooldown("guns") === 0) {
    event.source.runCommand(`playsound guns.sniper.fire @a[r=160] ~ ~ ~ 10`);
    var opts = new EntityRaycastOptions();
    opts.maxDistance = maxD;
    var ent = event.source.getEntitiesFromViewVector(opts);
    if (ent.length > 0) {
      if (!ent[0].hasTag("_guns__001")) {
        var h = ent[0].getComponent("minecraft:health");
        if (typeof h !== "undefined") {
          var armor = 1;
          ent[0].runCommand("summon snowball ~ ~.2 ~");
          h.setCurrent(h.current - damage * armor);
        }
      }
    }
  } else {
    event.source.runCommand(`title @s actionbar Still reloading...`);
  }
}

world.events.beforeItemUse.subscribe(function (e) {
  // For rifle firing
  if (e.item.id === "guns:sniper") {
    gunFire(e, 150, 15);
  } else if (e.item.id === "guns:machine") {
    gunFire(e, 20, 2);
  }
});
