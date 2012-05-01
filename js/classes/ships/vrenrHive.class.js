
var VrenrHive = Ship.extend({
   
   __construct: function(id, x, y){
       
       this.properties = {
            name: "Hive",
            life: 60,
            rotationSpeed: 1,
            advanceSpeed: 0.5,
            image: 'images/vrenr/hive.png',
            icon: 'images/vrenr/hive_menu.png',
            weapon: {
                life: 100,
                image: 'images/vrenr/weapon.png',
                advanceSpeed: 3,
                rotationSpeed: 10,
                range: 200,
                reloadTime: 60,
                damage: 10
            },
            actions:{
                MOVE: this.processMove,
                ATTACK: this.processAttack
            }
        };
       
       this._super(id, x, y);
       this.flag('vrenr');
   }
   
});