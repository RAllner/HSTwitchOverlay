$(document).ready(function(){
	// WebSocket
	var socket = io.connect();
	// neue Nachricht
	socket.on('chat', function (data) {
		var zeit = new Date(data.zeit);
		$('#content').append(
			$('<li></li>').append(
				// Uhrzeit
				$('<span>').text('[' +
					(zeit.getHours() < 10 ? '0' + zeit.getHours() : zeit.getHours())
					+ ':' +
					(zeit.getMinutes() < 10 ? '0' + zeit.getMinutes() : zeit.getMinutes())
					+ '] '
				),
				// Name
				$('<b>').text(typeof(data.name) != 'undefined' ? data.name + ': ' : ''),
				// Text
				$('<span>').text(data.text))
		);
		// nach unten scrollen
		$('body').scrollTop($('body')[0].scrollHeight);
	});
	// Nachricht senden
	function senden(){
		// Eingabefelder auslesen
		var nameA = $('#nameA').val();
		var nameB = $('#nameB').val();
		var scoreA = $('#scoreA').val();
		var scoreB = $('#scoreB').val();
        var picksA = $('input[name=picksA]:checked').map(function(_, el) {
            return $(el).val();
        }).get();
        var picksB = $('input[name=picksB]:checked').map(function(_, el) {
            return $(el).val();
        }).get();
        var bansA = $('input[name=bansA]:checked').map(function(_, el) {
            return $(el).val();
        }).get();
        var bansB = $('input[name=bansB]:checked').map(function(_, el) {
            return $(el).val();
        }).get();
        var outA = $('input[name=outA]:checked').map(function(_, el) {
            return $(el).val();
        }).get();
        var outB = $('input[name=outB]:checked').map(function(_, el) {
            return $(el).val();
        }).get();

		// Socket senden
		socket.emit('chat', { nameA: nameA, nameB: nameB ,scoreA: scoreA, scoreB: scoreB, picksA: picksA, picksB: picksB, bansA: bansA, bansB: bansB, outA: outA, outB: outB});
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