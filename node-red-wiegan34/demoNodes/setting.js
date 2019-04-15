const wiegand = require('wiegand');
const Gpio = require('onoff').Gpio;
const w = wiegand();

var idCard = "345678";
var Arr_dir = []
//w.begin({ d0: 17, d1: 18});

// w.on('reader', (id) => {
//    idCard = id
//  });


module.exports = function(RED) {
    function wig(config) {
        RED.nodes.createNode(this,config);
	      this.host = config.host;
        this.timer = config.timer;
        var context = this.context();
        var node = this;
        const b0 = new Gpio(node.host, 'in', 'both');
        const b1 = new Gpio(node.timer, 'in', 'both');

        	//start read card
        	w.begin({ d0: node.host, d1: node.timer});
        	node.status({ fill: "green", shape: "dot", text:"ready" });

        		node.dateCard = setInterval(function (){
        		var msg = { payload: null}

                w.on('reader', (id) => {
                    //idCard = id
                    node.send({ payload: id })
                });

      			if (msg.payload === null || msg.payload === undefined) {
           			node.send({ payload: null })
      			}else{
      			node.send(msg)
      			}

		        },3000);

		 			 this.on("close", function() {
            	 if (this.dateCard) { clearInterval(this.dateCard); }
        	 });
	}
    RED.nodes.registerType("Wiegand",wig);
};
