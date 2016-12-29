$(document).ready(function(){
	const warrior = "warrior";
	const hunter = "hunter";
	const rogue = "rogue";
	const mage = "mage";
	const druid = "druid";
	const shaman = "shaman";
	const priest = "priest";
	const warlock = "warlock";
	const paladin = "paladin";

	const use_pick = "pick";
	const use_ban = "ban";
	const use_out = "out";


	// WebSocket
	var socket = io.connect();
	// neue Nachricht
	socket.on('chat', function (data) {
		var zeit = new Date(data.zeit);
		$('#nameA').text(data.nameA);
		$('#nameB').text(data.nameB);
        $('#scoreA').text(data.scoreA);
        $('#scoreB').text(data.scoreB);
		// nach unten scrollen
        if(typeof data.picksA !== "undefined"){
            updateShownImages(data.picksA, use_pick, "A");
        }
        if(typeof data.picksA !== "undefined"){
            updateShownImages(data.picksB, use_pick, "B");
        }
        if(typeof data.picksA !== "undefined"){
            updateShownImages(data.bansA, use_ban, "A");
        }
        if(typeof data.picksA !== "undefined"){
            updateShownImages(data.bansB, use_ban, "B");
        }
        if(typeof data.picksA !== "undefined"){
            updateShownImages(data.outA, use_out, "A");
        }
        if(typeof data.picksA !== "undefined"){
            updateShownImages(data.outB, use_out, "B");
        }
		$('body').scrollTop($('body')[0].scrollHeight);
	});
	// Nachricht senden

	function updateShownImages(picks, use, aOrB) {
	    $('#'+use+"_img_"+warrior+'_'+aOrB).addClass('hidden').removeClass('shown');
	    $('#'+use+"_img_"+shaman+'_'+aOrB).addClass('hidden').removeClass('shown');
	    $('#'+use+"_img_"+rogue+'_'+aOrB).addClass('hidden').removeClass('shown');
	    $('#'+use+"_img_"+mage+'_'+aOrB).addClass('hidden').removeClass('shown');
	    $('#'+use+"_img_"+druid+'_'+aOrB).addClass('hidden').removeClass('shown');
	    $('#'+use+"_img_"+priest+'_'+aOrB).addClass('hidden').removeClass('shown');
	    $('#'+use+"_img_"+paladin+'_'+aOrB).addClass('hidden').removeClass('shown');
	    $('#'+use+"_img_"+hunter+'_'+aOrB).addClass('hidden').removeClass('shown');
	    $('#'+use+"_img_"+warlock+'_'+aOrB).addClass('hidden').removeClass('shown');

		for(var i = 0; i< picks.length; i++){
            hideOrShowImg(picks[i],  use, aOrB);
		}
    }
    function hideOrShowImg(pick, use, aOrB) {
	    var selector = "";
		if(pick.localeCompare(warrior) == 0){
			selector += "warrior_"+aOrB;
		} else if(pick.localeCompare(shaman) == 0){
            selector += "shaman_"+aOrB;
		}else if(pick.localeCompare(rogue) == 0){
            selector += "rogue_"+aOrB;
        }else if(pick.localeCompare(paladin) == 0){
            selector += "paladin_"+aOrB;
        }else if(pick.localeCompare(hunter) == 0){
            selector += "hunter_"+aOrB;
        }else if(pick.localeCompare(druid) == 0){
            selector += "druid_"+aOrB;
        }else if(pick.localeCompare(warlock) == 0){
            selector += "warlock_"+aOrB;
        }else if(pick.localeCompare(mage) == 0){
            selector += "mage_"+aOrB;
        }else if(pick.localeCompare(priest) == 0){
            selector += "priest_"+aOrB;
        }
        if(use.localeCompare(use_out) == 0){
            $("#pick_img_"+selector).removeClass('shown').addClass('hidden');
        }
        $("#"+ use + "_img_"+selector).removeClass('hidden').addClass('shown');
    }
});