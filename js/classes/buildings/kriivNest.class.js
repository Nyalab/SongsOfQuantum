var KriivNest = Building.extend({
    __construct: function(id, x, y){
       
        this.properties = {
            name: "Nest",
            life: 650,
            image: 'images/kriiv/commandcenter.png',
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
            icon: 'images/kriiv/miner_menu.png',
            command: 'BUILD_MINER'
        },
        {
            slot: '#menu_slot_02',
            icon: 'images/kriiv/hive_menu.png',
            command: 'BUILD_HIVE'
        }
        ];
       
        this._super(id, x, y);
        this.flag('kriiv');
        this.flag('mainbuilding');
    },
   
    processBuildMiner: function(){
        this.processAddBuild(KriivMiner, 50, 10000);
    },
   
    processBuildHive: function(){
        this.processAddBuild(KriivHive, 150, 30000);
    }
});

