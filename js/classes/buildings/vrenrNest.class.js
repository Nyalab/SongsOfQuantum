var VrenrNest = Building.extend({
    __construct: function(id, x, y){
       
        this.properties = {
            name: "Nest",
            life: 650,
            image: 'images/vrenr/commandcenter.png',
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
            icon: 'images/vrenr/miner_menu.png',
            command: 'BUILD_MINER'
        },
        {
            slot: '#menu_slot_02',
            icon: 'images/vrenr/hive_menu.png',
            command: 'BUILD_HIVE'
        }
        ];
       
        this._super(id, x, y);
        this.flag('vrenr');
        this.flag('mainbuilding');
    },
   
    processBuildMiner: function(){
        this.processAddBuild(VrenrMiner, 50, 10000);
    },
   
    processBuildHive: function(){
        this.processAddBuild(VrenrHive, 150, 30000);
    }
});

