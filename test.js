var pcap = require("pcap");
var os = require('os');
var should =require('should');
var assert = require('assert');

function getValidInterface(){
  var list = Object.keys(os.getNetworkInterfaces());
  for(iface in list){
    if(list[iface].match(/^lo/i) == null)
      return list[iface];
  }
}

var pcap_session = pcap.createSession(getValidInterface(), "");
console.log("Listening on " + pcap_session.device_name);

pcap_session.once('packet', function (raw_packet) {
  var packet = pcap.decode.packet(raw_packet);
  assert(true);
  process.nextTick(process.exit);
})
