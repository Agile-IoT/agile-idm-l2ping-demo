//var blue = require('./build/Release/addon');
var blue = require('bluetooth-presence-ping');
var request = require('request');
//docker copies in this location the file in conf/
var devices = require('/etc/l2ping/devices');
if(!devices){
  console.log('cannot find devices');
}
var status = {};
function update(){

  request.post(
    'http://localhost:1880/api/updates',
    { json: status },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
	else{
           console.log("error"+error);
        }
    }
);
    console.log("update "+JSON.stringify(status));
}
function repeat(){
  devices.forEach(function(mac){
    var result = blue.l2ping(mac,2);
    console.log("ping mac")
    if(result.sent && result.received && result.sent === result.received){
      if(!status[mac]){
        status[mac] = result.avg;
        update();
      }

    }
    else{
      if(status[mac]){
        delete status[mac];
        update();
      }
    }
  });
  setTimeout(repeat,8000);
}

repeat();
