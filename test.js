var pcap = require("pcap");
var os = require('os');
var should =require('should');

function getValidInterface(){
  var list = Object.keys(os.getNetworkInterfaces());
  for(iface in list){
    if(list[iface].match(/^lo/i) == null)
      return list[iface];
  }
}

describe('test capture interface', function(){
  var pcap_session = pcap.createSession(getValidInterface(), "");
  console.log("Listening on " + pcap_session.device_name);

  it('capture one packet', function(done){
    pcap_session.once('packet', function (raw_packet) {
      var packet = pcap.decode.packet(raw_packet);
      done();
    })
  })

})
