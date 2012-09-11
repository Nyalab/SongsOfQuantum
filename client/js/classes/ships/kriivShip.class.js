var KriivShip = Ship.extend({
	__construct: function(id, x, y){
		this._super(id, x, y);
	},

	processPlaceBuilding: function(build, cost, duration){
      if(this.getSide().hasEnoughtMinerals(-cost)){
        this.getSide().changeMinerals(-cost);
        var options = {};

        options.build = build;
        options.cost = cost;
        options.duration = duration;

        GameGlobals.mouse.setState(MouseBehaviorPlacebuilding, options);
        this.nextOrder();
      }
	},

	processBuild: function(order){
	  var build = order.build;
	  var position = order.target;
	  var duration = order.duration;

      if(position.distanceFrom(this.getPosition()) > this.properties.building.range){
        this.setTarget(position);
        this.computeMove();
      }
      else{
        var nest = new build('building_' + Guid.generate(), position.elements[0], position.elements[1]);
        nest.draw('map').appendTo(GameGlobals.viewport);;
        nest.flag('controllable');
        nest.disable();
        GameGlobals.playerSide.add(nest);
        GameGlobals.shipManager.register(nest);
        setTimeout(function(){
          nest.enable();
        }, duration);
        this.nextOrder();
      }
	}
});