$LAB
   // OOP engine
   .script("js/lib/class.js")
   .script("js/classes/utils/guid.class.js")

   // Paintbrush image processing library
   .script("js/lib/paintbrush.common.js")
   .script("js/lib/paintbrush.core.js")

   // Maths lib
   .script("js/lib/sylvester.js")
   .script("js/lib/angle.js")

   // Jquery
   .script("js/lib/jquery.min.js")
   .script("js/lib/jquery.ui.js")
   .script("js/lib/jquery.rotate.js")
   .script("js/lib/jquery.collision.js")
   .script("js/lib/jquery.stellar.js")

   // Generic classes
   .script("js/classes/generics/drawable.class.js")
   .script("js/classes/generics/movable.class.js")
   .script("js/classes/generics/entity.class.js")

   // Effects classes
   .script("js/classes/effects/explosion.class.js")
   .script("js/classes/effects/complexExplosion.class.js")

   // Space bodies classes
   .script("js/classes/bodies/asteroid.class.js")

   // Ships classes
   .script("js/classes/ships/ship.class.js")
   .script("js/classes/ships/kriivShip.class.js")
   .script("js/classes/ships/kriivHive.class.js")
   .script("js/classes/ships/kriivMiner.class.js")
   .script("js/classes/ships/shipManager.class.js")

   // Weapons classes
   .script("js/classes/weapons/weapon.class.js")
   .script("js/classes/weapons/weaponManager.class.js")
   .script("js/classes/weapons/weaponGenerator.class.js")

   // Building classes
   .script("js/classes/buildings/building.class.js")
   .script("js/classes/buildings/kriivNest.class.js")

   // Side classes
   .script("js/classes/side.class.js")

   // Main game class
   .script("js/classes/game.class.js")

   // Mouse & cursor class
   .script("js/classes/cursor.class.js")
   .script("js/classes/mouse.class.js")
   .script("js/classes/keyboard.class.js")
   .script("js/classes/mouseBehavior/mouseBehaviorDefaults.class.js")
   .script("js/classes/mouseBehavior/mouseBehaviorPlaceBuilding.class.js")

   // GUI menu class
   .script("js/classes/menu.class.js")

   // Maps
   .script("js/maps/rohnokdual.map.js").wait()

   // Core 
   .script("js/core.js");
