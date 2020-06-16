$(document).ready(


  function(){
    /*********************************/

    /* Risposte Automatiche */
    var messageFriends = [
      'Tutto Ok, dai!!',
      'Non sapevo nulla',
      'grazie',
      'non lo sapevo',
      'Sono contento',
      'Raccontami qualcosa.',
      'Vieni a casa!!',
      'Ci vediamo domani',
      'Sicuro???'
    ];

    //  FUNCTION: creaNumeroRandom(): Questa Funzione crea un numero random tenendo in considerazione come range max, la larghezza del array inserito.
    //   --> array: array da inserire.
    function creaNumeroRandom(array){
        var numero = Math.round(Math.random()*(array.length-1));
        return numero;
      }

      // Quando faccio "CLICK", si appende il 'INPUT' nel area dei messaggi.
    $('#js_enter').click(
      function(){

        var message = $('.write-message input').val()
        var template = $('.template').children('.message-me').clone();
        // console.log(template)
        template.text(message)
        $('.wrapper-message').append(template);
        // Reset Value
        $('.write-message input').val('');

        /*** Risposta Automatica dopo 2 secondi ***/
        setTimeout(function(){
          var numeroRandon = creaNumeroRandom(messageFriends);
          var template = $('.template').children('.message-he').clone();
          // console.log(template)
          template.text(messageFriends[numeroRandon])
          $('.wrapper-message').append(template);
          // Reset Value
        }, 1000);
        /******/
      }
    );

    // Quando il tasto si abbassa appende 'INPUT' nel area dei messaggi.
    $('.write-message input').keydown(
      function(event){
        if(event.which=='13'){
        var message = $('.write-message input').val()
        var template = $('.template').children('.message-me').clone();
        // console.log(template)
        template.text(message)
        $('.wrapper-message').append(template);
        // Reset Value
        $('.write-message input').val('');

        /*** Risposta Automatica dopo 2 secondi ***/
        setTimeout(function(){
          var numeroRandon = creaNumeroRandom(messageFriends);
          var template = $('.template').children('.message-he').clone();
          // console.log(template)
          template.text(messageFriends[numeroRandon])
          $('.wrapper-message').append(template);
          // Reset Value
        }, 1000);
        /******/
        }
       }
     );


    /*********************************/
  }

);
