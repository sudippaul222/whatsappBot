const qrcode = require('qrcode-terminal');
const axios = require ('axios');

const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');




  const client = new Client({
    authStrategy: new LocalAuth()
  });


client.on('qr', (qr) => {
   qrcode.generate(qr, { small: true });
   resp.status(200).json({"qr":qr});
   return
  
});


client.on('message', async (message) => {
	if (message.body === 'Hi') {
		await client.sendMessage(message.from, 'Hello '+message._data.notifyName+', \nWelcome to IOT BASED GREAY WATER SYSTEM\n\n🔴Send 1: To Know Water Flow Rate\n\n🔴Send 2: Know Water pH\n\n🔴Send 3: To Know Filtered Water level\n\n🔴Send 4: Exit\n\n📍Know more visit Our 🌐\n🔗https://www.savewater.netfy.org/');
	}
});


client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async (message) => {
	const content = message.body

  console.log(message);
  // console.log(client);
    
    if(content === "name") {
    
        
     const meme = await axios("https://meme-api.herokuapp.com/gimme")
    
       .then(res => res.data)
    
    client.sendMessage(message.from, await MessageMedia.fromUrl(meme.url))
    
    } 
   // _______________________________________________________________
     else if(content === "Pls joke") {
    
     const joke = await axios("https://v2.jokeapi.dev/joke/Any?safe-mode")
    .then(res => res.data)
    
    const jokeMsg = await client.sendMessage(message.from, joke.setup)
    if(joke.delivery) setTimeout(function() { jokeMsg.reply(joke.delivery) }, 5000)
    }
     // _______________________________________________________________
       else if(content === "1") {
    
        const water = await axios("https://script.google.com/macros/s/AKfycbxluqiKeGMWehZoePpMqZSn7_6zhORS13zT0kRJmNjRh4ir62pQhMZwhDW-WH09xrdslA/exec")
       .then(res => res.data)

       const str="Now Water Flow(1): "+ water.data[0].flow_1.toFixed(2)+" L/m\n"+"                    Flow(2): "+water.data[0].flow_2.toFixed(2)+" L/m";
       const waterMsg = await client.sendMessage(message.from, str)}
     // _______________________________________________________________
       else if(content === "2") {
    
        const water = await axios("https://script.google.com/macros/s/AKfycbxluqiKeGMWehZoePpMqZSn7_6zhORS13zT0kRJmNjRh4ir62pQhMZwhDW-WH09xrdslA/exec")
       .then(res => res.data)

       const str="Now Water pH: "+ water.data[0].pH.toFixed(2);
       const waterMsg = await client.sendMessage(message.from, str)}

     // _______________________________________________________________

     else if(content === "3") {
    
        const water = await axios("https://script.google.com/macros/s/AKfycbxluqiKeGMWehZoePpMqZSn7_6zhORS13zT0kRJmNjRh4ir62pQhMZwhDW-WH09xrdslA/exec")
       .then(res => res.data)

       const str="Now in Filtered Water tank's water have: "+ water.data[0].water_label+"%";
       const waterMsg = await client.sendMessage(message.from, str)}
     // _______________________________________________________________ 

     else if (content === "4") {
		await client.sendMessage(message.from,"Thank You.....\n\nSee You Soon ☺️");
	 }
   // _______________________________________________________________

   
    else if (content === "Mc"){
        const water = await axios("https://script.google.com/macros/s/AKfycbwSIN6cBcFlxqhceTaQydsq5YYC1Rv1eI2pKnDZBxOx9VC51py1AlcZA3wf62TIiYJjxQ/exec")
        .then(res => res.data)
    var s="Hii "+message._data.notifyName+ water.data[0].gali;
      await client.sendMessage(message.from,s);
    }

     



});

client.initialize();


