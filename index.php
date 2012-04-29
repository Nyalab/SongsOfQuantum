<html>
    <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8" />

        <link rel="stylesheet" type="text/css" href="css/main.css" />
        <link rel="stylesheet" type="text/css" href="css/scrollbars.css" />
        <link rel="stylesheet" type="text/css" href="css/scrollbars-black.css" />

        <script type="text/javascript" src="js/lib/class.js"></script>

        <script type="text/javascript" src="js/lib/paintbrush.common.js"></script>
        <script type="text/javascript" src="js/lib/paintbrush.core.js"></script>

        <script type="text/javascript" src="js/lib/jquery.min.js"></script>
        <script type="text/javascript" src="js/lib/jquery.ui.js"></script>
        <script type="text/javascript" src="js/lib/jquery.rotate.js"></script>
        <script type="text/javascript" src="js/lib/jquery.collision.js"></script>

        <script type="text/javascript" src="js/lib/sylvester.js"></script>
        <script type="text/javascript" src="js/lib/angle.js"></script>
        <script type="text/javascript" src="js/lib/jquery.mousehold.js"></script>
        <script type="text/javascript" src="js/lib/jquery.event.drag-2.0.min.js"></script>
        <script type="text/javascript" src="js/lib/jquery.mousewheel.js"></script>
        <script type="text/javascript" src="js/lib/jquery.resizeevent.js"></script>
        <script type="text/javascript" src="js/lib/aplweb.scrollbars.js"></script>

        <script type="text/javascript" src="js/classes/generics/drawable.class.js"></script>
        <script type="text/javascript" src="js/classes/generics/movable.class.js"></script>
        <script type="text/javascript" src="js/classes/generics/entity.class.js"></script>

        <script type="text/javascript" src="js/classes/bodies/asteroid.class.js"></script>

        <script type="text/javascript" src="js/classes/ships/ship.class.js"></script>
        <script type="text/javascript" src="js/classes/ships/vrenrHive.class.js"></script>
        <script type="text/javascript" src="js/classes/ships/vrenrMiner.class.js"></script>
        <script type="text/javascript" src="js/classes/ships/shipManager.class.js"></script>

        <script type="text/javascript" src="js/classes/buildings/building.class.js"></script>
        <script type="text/javascript" src="js/classes/buildings/vrenrNest.class.js"></script>

        <script type="text/javascript" src="js/classes/weapons/weapon.class.js"></script>
        <script type="text/javascript" src="js/classes/weapons/weaponManager.class.js"></script>
        <script type="text/javascript" src="js/classes/weapons/weaponGenerator.class.js"></script>

        <script type="text/javascript" src="js/classes/side.class.js"></script>
        <script type="text/javascript" src="js/classes/game.class.js"></script>
        <script type="text/javascript" src="js/classes/cursor.class.js"></script>
        <script type="text/javascript" src="js/classes/menu.class.js"></script>

        <script type="text/javascript" src="js/maps/rohnokdual.map.js"></script>

        <script type="text/javascript" src="js/core.js"></script>
    </head>

    <body>

        <div id="header">
            <div style="color: white">
                <img src="images/asteroids_icon.png" />
                <span id="minerals_display"></span>
            </div>
        </div>

        <div id="map">
            <div id="viewport"></div>
        </div>
        <div id="menu">

            <div id="infos">
                <h1 id="unit_title"></h1>
                <h2 id="unit_life"></h2>
                
                <div id="queue_production"></div>
                
            </div>

            <div id="buttons">
                <div id="menu_slot_01"></div>
                <div id="menu_slot_02"></div>
                <div id="menu_slot_03"></div>
                <div id="menu_slot_04"></div>

                <div id="menu_slot_05"></div>
                <div id="menu_slot_06"></div>
                <div id="menu_slot_07"></div>
                <div id="menu_slot_08"></div>

                <div id="menu_slot_09"></div>
                <div id="menu_slot_10"></div>
                <div id="menu_slot_11"></div>
                <div id="menu_slot_12"></div>
            </div>
        </div>
    </body>
</html>