import { world } from "mojang-minecraft";
import { getArmor, gunFire, scopeHandler } from "./definitions.js";

world.events.tick.subscribe(function (e) {
  scopeHandler();
});

world.events.beforeItemUse.subscribe(function (e) {
  // For rifle firing
  if (e.item.id === "guns:sniper") {
    gunFire(e, 150, 20, "guns.sniper.fire", "minecraft:dirt");
  } else if (e.item.id === "guns:machine") {
    gunFire(e, 20, 2, "guns.machine.fire", "minecraft:dirt");
  }
});
