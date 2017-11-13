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

    const use_pick = "class";
    const use_ban = "ban";
    const use_out = "out";


    // WebSocket
	var socket = io.connect();
	// neue Nachricht
	socket.on('chat', function (data) {
        //if(data.source == 'admin') return;
        // var zeit = new Date(data.zeit);
        // $('#content').append(
			// $('<li></li>').append(
			// 	// Uhrzeit
			// 	$('<span>').text('[' +
			// 		(zeit.getHours() < 10 ? '0' + zeit.getHours() : zeit.getHours())
			// 		+ ':' +
			// 		(zeit.getMinutes() < 10 ? '0' + zeit.getMinutes() : zeit.getMinutes())
			// 		+ '] '
			// 	),
			// 	// Name
			// 	$('<em>').text(typeof(data.source) != 'undefined' ? data.source + ': ' : '')
			// 	// Text
        // ));

        if(typeof data.nameA != 'undefined'){
            $('#nameA').val(data.nameA);
        }
        if(typeof data.nameB != 'undefined'){
            $('#nameB').val(data.nameB);
        }
        if(typeof data.scoreA != 'undefined'){
            $('#scoreA').val(data.scoreA);
        }
        if(typeof data.scoreB != 'undefined'){
            $('#scoreB').val(data.scoreB);
        }

        if(typeof data.picksA != 'undefined'){
            for(var i of data.picksA) {
                initializeCheckboxes(i,use_pick,'A');
            };
        };
        if(typeof data.picksB != 'undefined'){
            for(var i of data.picksB) {
                initializeCheckboxes(i,use_pick,'B');
            };
        };
        if(typeof data.bansA != 'undefined'){
            for(var i of data.bansA) {
                initializeCheckboxes(i,use_ban,'A');
            };
        };
        if(typeof data.bansB != 'undefined'){
            for(var i of data.bansB) {
                initializeCheckboxes(i,use_ban,'B');
            };
        };
        if(typeof data.outA != 'undefined'){
            for(var i of data.outA) {
                initializeCheckboxes(i,use_out,'A');
            };
        };
        if(typeof data.outB != 'undefined'){
            for(var i of data.outB) {
                initializeCheckboxes(i,use_out,'B');
            };
        };
        if(typeof data.overviewShowScore !== "undefined") {
            console.log(data.overviewShowScore);
            $("input[name='showScore']").prop("checked", data.overviewShowScore);
        }
        if(typeof data.overviewShowClasses !== "undefined") {
            $("input[name='showClasses']").prop("checked", data.overviewShowClasses);

        }


	});
	// Nachricht senden
	function senden(){
		// Eingabefelder auslesen
		var nameA = $('#nameA').val();
		var nameB = $('#nameB').val();
		var scoreA = $('#scoreA').val();
		var scoreB = $('#scoreB').val();
        var picksA = $('input[class=picksA]:checked').map(function(_, el) {
            return $(el).val();
        }).get();
        var picksB = $('input[class=picksB]:checked').map(function(_, el) {
            return $(el).val();
        }).get();
        var bansA = $('input[class=bansA]:checked').map(function(_, el) {
            return $(el).val();
        }).get();
        var bansB = $('input[class=bansB]:checked').map(function(_, el) {
            return $(el).val();
        }).get();
        var outA = $('input[class=outA]:checked').map(function(_, el) {
            return $(el).val();
        }).get();
        var outB = $('input[class=outB]:checked').map(function(_, el) {
            return $(el).val();
        }).get();
        var overviewShowClasses = $('input[name=showClasses]').prop("checked");
        var overviewShowScore = $('input[name=showScore]').prop("checked");

		// Socket senden
		socket.emit('chat', { nameA: nameA, nameB: nameB ,scoreA: scoreA, scoreB: scoreB, picksA: picksA, picksB: picksB, bansA: bansA, bansB: bansB, outA: outA, outB: outB, source:"admin", overviewShowClasses: overviewShowClasses, overviewShowScore: overviewShowScore});
		// Text-Eingabe leeren
		$('#text').val('');
	}
	// bei einem Klick
	$('#senden').click(senden);
	// oder mit der Enter-Taste
	$('#text').keypress(function (e) {
		if (e.which == 13) {
			senden();
		}
	});

    $('.qtyplus').click(function(e){
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        fieldName = $(this).attr('field');
        // Get its current value
        var currentVal = parseInt($('input[name='+fieldName+']').val());
        // If is not undefined
        if (!isNaN(currentVal)) {
            // Increment
            $('input[name='+fieldName+']').val(currentVal + 1);
        } else {
            // Otherwise put a 0 there
            $('input[name='+fieldName+']').val(0);
        }
    });
    // This button will decrement the value till 0
    $(".qtyminus").click(function(e) {
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        fieldName = $(this).attr('field');
        // Get its current value
        var currentVal = parseInt($('input[name='+fieldName+']').val());
        // If it isn't undefined or its greater than 0
        if (!isNaN(currentVal) && currentVal > 0) {
            // Decrement one
            $('input[name='+fieldName+']').val(currentVal - 1);
        } else {
            // Otherwise put a 0 there
            $('input[name='+fieldName+']').val(0);
        }
    });

});

function initializeCheckboxes(heroClass, use, aOrB) {
    $('#'+use+heroClass+aOrB).prop("checked", true);
}