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
   .script("js/lib/jquery.mousehold.js")
   .script("js/lib/jquery.event.drag-2.0.min.js")
   .script("js/lib/jquery.mousewheel.js")
   .script("js/lib/jquery.resizeevent.js")
   .script("js/lib/aplweb.scrollbars.js")

   // Generic classes
   .script("js/classes/generics/drawable.class.js")
   .script("js/classes/generics/movable.class.js")
   .script("js/classes/generics/entity.class.js")

   // Space bodies classes
   .script("js/classes/bodies/asteroid.class.js")

   // Ships classes
   .script("js/classes/ships/ship.class.js")
   .script("js/classes/ships/vrenrShip.class.js")
   .script("js/classes/ships/vrenrHive.class.js")
   .script("js/classes/ships/vrenrMiner.class.js")
   .script("js/classes/ships/shipManager.class.js")

   // Weapons classes
   .script("js/classes/weapons/weapon.class.js")
   .script("js/classes/weapons/weaponManager.class.js")
   .script("js/classes/weapons/weaponGenerator.class.js")

   // Building classes
   .script("js/classes/buildings/building.class.js")
   .script("js/classes/buildings/vrenrNest.class.js")

   // Side classes
   .script("js/classes/side.class.js")

   // Main game class
   .script("js/classes/game.class.js")

   // Mouse & cursor class
   .script("js/classes/cursor.class.js")
   .script("js/classes/mouse.class.js")
   .script("js/classes/mouseBehavior/mouseBehaviorDefaults.class.js")
   .script("js/classes/mouseBehavior/mouseBehaviorPlaceBuilding.class.js")

   // GUI menu class
   .script("js/classes/menu.class.js")

   // Maps
   .script("js/maps/rohnokdual.map.js").wait()

   // Core 
   .script("js/core.js");
