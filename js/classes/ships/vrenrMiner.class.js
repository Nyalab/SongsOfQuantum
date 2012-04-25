
var VrenrMiner = Ship.extend({
   
   __construct: function(id, x, y){
       
       this.properties = {
            name: "Miner",
            life: 15,
            rotationSpeed: 50,
            advanceSpeed: 1,
            image: 'images/vrenr/miner.png',
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
            deposit:{
                range: 30
            },
            actions:{
                MOVE: this.processMove,
                ATTACK: this.processAttack,
                GATHER: this.processGather,
                DEPOSIT: this.processDeposit
            }
        };
       
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
            if(this.lastAsteroid == null){
                this.lastAsteroid = this.findNearest('.asteroid');
            }
           
            this.setOrder({
                command: "GATHER", 
                target: this.lastAsteroid
            });
       }
   }
   
});