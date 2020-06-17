$(document).ready(

  function(){


    /**/
    $('#js_search').on("keyup", function() {
      var value = $(this).val().toUpperCase();
      console.log(value);


      $('.box-contact h4').each(
        function() {
          if($(this).text().toUpperCase().includes(value)){
            $(this).parents('.contact').show();
          } else {
            $(this).parents('.contact').hide();
          }
        // $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)

      });
    });
    /**/
    /*********************************/

    /* Risposte Automatiche */
    var messagesReceived = [
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



      // Quando faccio "CLICK", si appende il 'INPUT' nel area dei messaggi.
    $('#js_enter').click(
      function(){

        sendMessage();

        /******/
      }
    );

    // Quando il tasto si abbassa appende 'INPUT' nel area dei messaggi.
    $('.write-message input').keydown(
      function(event){
        if(event.which=='13'){

        sendMessage();

        /******/
        }
       }
     );



     /*FUNZIONI*/

  // FUNCTION: creaNumeroRandom(): Questa Funzione crea un numero random tenendo in considerazione come range max, la larghezza del array inserito.
     //   --> array: array da inserire.
     function creaNumeroRandom(array){
         var numero = Math.round(Math.random()*(array.length-1));
         return numero;
       }

   //  FUNCTION: addZeroToNumber(): Questa funzione aggiunge uno zero da vanti a un numero menore di 10.
     function addZeroToNumber(number){
       if(number < 10) {
         return '0' + number;
       }
       return number;
     }

   //  FUNCTION: sendMessage(): Questa funzione contiene il messaggio da inviare, e l'ora del messagio. C'e anche  una risposta automatica.
     function sendMessage(){
       var message = $('.write-message input').val()
       var template = $('.template').find('.message-right').clone();
       // console.log(template)

       // Inserire Ora.
       var date = new Date();
       var currentHours = date.getHours();
       var currentMinutes = date.getMinutes();
       var currentTime = addZeroToNumber(currentHours) + ':' + addZeroToNumber(currentMinutes);
       template.find('.message-hour').text(currentTime);

       template.children('.box-right').html(message + '<span class="message-hour">' + currentTime + '</span>');
       $('.wrapper-message').append(template);
       // Reset Value
       $('.write-message input').val('');

       /* Vissualizare ultimo messaggio */
       $('.container-message').scrollTop($('.container-message').height());

       /*** Risposta Automatica dopo 1 secondi ***/
       setTimeout(function(){
         var numeroRandon = creaNumeroRandom(messagesReceived);
         var template = $('.template').find('.message-left').clone();
         // console.log(template)

         template.children('.box-left').html(messagesReceived[numeroRandon] + '<span class="message-hour">' + currentTime + '</span>');
         $('.wrapper-message').append(template);

         /* Vissualizare ultimo messaggio */
         $('.container-message').scrollTop($('.container-message').height());
       }, 1000);
     }



     /*END FUNZIONI*/


    /*********************************/
  }

);
