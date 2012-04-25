var VrenrNest = Building.extend({
    __construct: function(id, x, y){
       
        this.properties = {
            name: "Nest",
            life: 650,
            image: 'images/vrenr/commandcenter.png',
            actions:{
                BUILD_MINER: this.processBuildMiner,
                BUILD_HIVE: this.processBuildHive
            }
        };
       
        this.menu = [
        {
            slot: '#menu_slot_01',
            icon: 'images/vrenr/miner.png',
            command: 'BUILD_MINER'
        },
        {
            slot: '#menu_slot_02',
            icon: 'images/vrenr/hive.png',
            command: 'BUILD_HIVE'
        }
        ];
       
        this._super(id, x, y);
        this.flag('vrenr');
        this.flag('mainbuilding');
    },
   
    processBuildMiner: function(){
        this.processBuild(VrenrMiner, 50, 3000);
    },
   
    processBuildHive: function(){
        this.processBuild(VrenrHive, 150, 6000);
    }
});

