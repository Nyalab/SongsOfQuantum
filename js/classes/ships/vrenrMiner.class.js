
var VrenrMiner = VrenrShip.extend({
   
   __construct: function(id, x, y){
       
       this.properties = {
            name: "Miner",
            life: 15,
            rotationSpeed: 50,
            advanceSpeed: 1,
            image: 'images/vrenr/miner.png',
            icon: 'images/vrenr/miner_menu.png',
            weapon: {
                life: 20,
                image: 'images/vrenr/weapon.png',
                advanceSpeed: 1,
                rotationSpeed: 2,
                range: 20,
                reloadTime: 60,
                damage: 1
            },
            mining:{
                range: 15,
                capacity: 5,
                cooldown: 60,
                current: 0,
                lastAsteroid: null,
                depositPoint: null
            },
            building: {
              range: 30
            },
            deposit:{
                range: 30
            },
            actions:{
                MOVE: this.processMove,
                ATTACK: this.processAttack,
                GATHER: this.processGather,
                DEPOSIT: this.processDeposit,
                PLACE_COMMAND_CENTER: this.processPlaceCommandCenter,
                BUILD: this.processBuild
            }
        };
       
        this.menu = [
          {
              slot: '#menu_slot_01',
              icon: 'images/vrenr/commandcenter.png',
              command: 'PLACE_COMMAND_CENTER'
          }
        ];

       this._super(id, x, y);
       this.flag('vrenr');
   },
   
   findNearestDepositPoint: function(){
       this.depositPoint = this.findNearest('.vrenr.mainbuilding.' + this.getSide().name);
   },
   
   processGather: function(order){
       this.lastAsteroid = order.target;
       if(order.target.getPosition().distanceFrom(this.getPosition()) > this.properties.mining.range){
           this.setTarget(order.target.getPosition());
           this.computeMove();
       }
       else if(this.properties.mining.current < this.properties.mining.cooldown){
           this.properties.mining.current++;
       }
       else{
           this.setSprite('images/vrenr/miner_full.png');
           this.properties.mining.current = 0;
           this.lastAsteroid.inflictDamages(this.properties.mining.capacity);
           this.findNearestDepositPoint();
            this.setOrder({
                command: "DEPOSIT", 
                target: this.depositPoint
            });
       }
   },
   
   processDeposit: function(order){
       if(order.target.getPosition().distanceFrom(this.getPosition()) > this.properties.deposit.range){
           this.setTarget(order.target.getPosition());
           this.computeMove();
       }
       else{
          this.setSprite('images/vrenr/miner.png');
          this.getSide().changeMinerals(this.properties.mining.capacity);
          if(this.lastAsteroid == null || this.lastAsteroid.isDead()){
              this.lastAsteroid = this.findNearest('.asteroid');
          }
          
          if(this.lastAsteroid != null){
            this.setOrder({
                command: "GATHER", 
                target: this.lastAsteroid
            });
          }
          else{
            this.nextOrder();
          }
       }
   },

   processPlaceCommandCenter: function(){
      this.processPlaceBuilding(VrenrNest, 300, 10000);
   },
   
});