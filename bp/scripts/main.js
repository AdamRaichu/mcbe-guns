import { world, MinecraftEffectTypes } from "mojang-minecraft";
import { Test as test } from "mojang-gametest";

var overworld = world.getDimension("overworld");
var joinedPlayers = [];


world.events.playerJoin.subscribe(function (e) {
  joinedPlayers.push(e.player);
});

world.events.tick.subscribe(function (e) {
  for (var c = 0; c < joinedPlayers.length; c++) {
    if (typeof joinedPlayers[c] === "undefined") {
      overworld.runCommand("tell @a undefined was found in playerlist");
      return
    }
    var inv = joinedPlayers[c].getComponent("minecraft:inventory").container
    if (inv.getItem(joinedPlayers[c].selectedSlot).id === "guns:sniper" && joinedPlayers[c].isSneaking) {
      joinedPlayers[c].addEffect(MinecraftEffectTypes.slowness, 5, 255, false)
    }
  }
});

world.events.beforeItemUse.subscribe(function (e) {
  if (e.item.id === "guns:sniper") {
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
  }
});