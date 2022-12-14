import {
  world,
  MinecraftEffectTypes,
  EntityRaycastOptions,
  ItemStack,
  Items,
} from "mojang-minecraft";

function checkForAmmo(inventory, itemID) {
  for (var c = 0; c < inventory.size; c++) {
    var stack = inventory.getItem(c);
    if (typeof stack !== "undefined") {
      if (stack.id === itemID) {
        var n = new ItemStack(Items.get(itemID), stack.amount - 1);
        n.nameTag = stack.nameTag;
        inventory.setItem(c, n);
        return true;
      }
    }
  }
}

export function getArmor(entity) {
  var calc = 1;
  if (entity.hasTag("_guns__002")) {
    calc -= 0.04;
  }
  if (entity.hasTag("_guns__003")) {
    calc -= 0.08;
  }
  if (entity.hasTag("_guns__004")) {
    calc -= 0.12;
  }
  if (entity.hasTag("_guns__005")) {
    calc -= 0.12;
  }
  if (entity.hasTag("_guns__006")) {
    calc -= 0.2;
  }
  if (entity.hasTag("_guns__007")) {
    calc -= 0.24;
  }
  if (entity.hasTag("_guns__008")) {
    calc -= 0.32;
  }
  if (entity.hasTag("_guns__009")) {
    calc -= 0.08;
  }
  if (entity.hasTag("_guns__010")) {
    calc -= 0.12;
  }
  if (entity.hasTag("_guns__011")) {
    calc -= 0.16;
  }
  if (entity.hasTag("_guns__012")) {
    calc -= 0.2;
  }
  if (entity.hasTag("_guns__013")) {
    calc -= 0.24;
  }
  if (entity.hasTag("_guns__014")) {
    calc -= 0.04;
  }
  if (entity.hasTag("_guns__015")) {
    calc -= 0.08;
  }
  if (entity.hasTag("_guns__016")) {
    calc -= 0.12;
  }
  return calc;
}

export function gunFire(event, maxD, damage, soundID, ammo) {
  if (event.source.getItemCooldown("guns") === 0) {
    if (
      checkForAmmo(
        event.source.getComponent("minecraft:inventory").container,
        ammo
      )
    ) {
      event.source.runCommand(`playsound ${soundID} @a[r=160] ~ ~ ~ 10`);
      var opts = new EntityRaycastOptions();
      opts.maxDistance = maxD;
      var ent = event.source.getEntitiesFromViewVector(opts);
      if (ent.length > 0) {
        if (!ent[0].hasTag("_guns__001")) {
          var h = ent[0].getComponent("minecraft:health");
          if (typeof h !== "undefined") {
            var armor = getArmor(ent[0]);
            ent[0].runCommand("summon snowball ~ ~.2 ~");
            h.setCurrent(Math.ceil(h.current - damage * armor));
          }
        }
      }
    }
  } else {
    event.source.runCommand(`title @s actionbar Still reloading...`);
  }
}

export function scopeHandler() {
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
}
