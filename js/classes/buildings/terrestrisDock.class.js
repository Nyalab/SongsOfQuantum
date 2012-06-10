var TerrestrisDock = Building.extend({
    __construct: function(id, x, y){
       
        this.properties = {
            name: "Dock",
            life: 650,
            image: 'images/terrestris/commandcenter.png',
            productionType: 'queue',
            actions:{
                BUILD: this.processBuild,
                BUILD_MINER: this.processBuildMiner,
                BUILD_HIVE: this.processBuildHive,
                RALLY_ORDER: this.processRallyOrder
            }
        };
       
        this.menu = [
        {
            slot: '#menu_slot_01',
            icon: 'images/terrestris/miner_menu.png',
            command: 'BUILD_MINER'
        }
        ];
       
        this._super(id, x, y);
        this.flag('terrestris');
        this.flag('mainbuilding');
    },
   
    processBuildMiner: function(){
        this.processAddBuild(TerrestrisMiner, 50, 10000);
    }
});

