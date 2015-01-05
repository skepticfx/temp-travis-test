var pcap = require("pcap"),
    os = require('os');

function getValidInterface(){
  var list = Object.keys(os.getNetworkInterfaces());
  for(iface in list){
    if(list[iface].match(/^lo/i) == null)
      return list[iface];
  }
}

var pcap_session = pcap.createSession(getValidInterface(), "");

console.log("Listening on " + pcap_session.device_name);

pcap_session.on('packet', function (raw_packet) {
    var packet = pcap.decode.packet(raw_packet);
      console.log(raw_packet);
});
