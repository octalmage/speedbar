var speedTest=require("speedtest-net");
var gui = require("nw.gui");
var win = gui.Window.get();

var tray = new gui.Tray(
{
	title: "Testing"
});

// Give it a menu.
var menu = new gui.Menu();
menu.append(new gui.MenuItem(
{
	label: "Exit",
	click: function()
	{
		gui.App.quit();
	},
}));
tray.menu = menu;

//win.showDevTools();

setInterval(function()
{
    testSpeed();
}, 60000);

testSpeed();

//Servers: 
//Austin: 6000
//Austin: 5024
//Austin: 723
//Austin: Google Fiber: 5087
//Houston: 1816
//Cali: Google Fiber: 5086
//Utah: Google Fiber: 5085

function testSpeed()
{    
    var test = speedTest({maxTime:10000, serverId: 6000});
    
    console.log("Testing.");
    
    test.on('data',function(data)
    {
        console.log(data.speeds.download);
        tray.title = Math.round(data.speeds.download) + "Mbps";
    });

    test.on('error',function(err)
    {
      console.error(err);
    });
}
