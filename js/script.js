$(document).ready(
  function(){

    $('.box-contacts .contact').click(
          function() {
            // Seleziono dati dell'utente su quale clicco
              //--> Avatar del contatto.
            var contactAvatar = $(this).find('img').attr('src');
              //--> Nome del contatto.
            var contactName = $(this).find('h4').text();
              //--> Vissualizazione orario contatto.
            var contactLastTimeSeen = $(this).find('.time-contact p').text();

            // Sostituisco dati del "Header Contact Bar".
              //--> Sostituisco Avatar del contatto.
            var currentContactAvatar = $('.header-contact-bar').find('img').attr('src', contactAvatar);
              //--> Sostituisco Nome del contatto.
            var currentContactName = $('.header-contact-bar').find('h4').text(contactName);
              //--> Sostituisco Vissualizazione orario contatto.
            var currentContactLastTimeSeen = $('.header-contact-bar').find('.ultimo-accesso p').text('ulimo accesso oggi alle ' + contactLastTimeSeen);
        });

  activeSettingsMessages();

  $('.box-contacts .contact').click(function(){
    var contact = $(this).attr('src');
    $('.container-message').addClass('hidden');
    var selettore = '.container-message[src-msg="' + contact + '"]'
    $(selettore).removeClass('hidden')
  });


    /*********** SEARCH ************/
    // Quando faccio "CLICK" sul 'INPUT' di SEARCH,
    $('#js_search').on("keyup", function() {
      // e inserisco una Parola,
      var value = $(this).val().toLowerCase();
      // viene confrontata con ogni parol a dentro un H4 appartenente al div.box-contact.
      $('.box-contact h4').each(
        function() {
          // Se dentro il testo, fosse inclusa la parola che ho inserito,
          if($(this).text().toLowerCase().includes(value)){
            // lascio in vista in div.contact,
            $(this).parents('.contact').show();
          } else {
            // altrementi nascondo il div.contact.
            $(this).parents('.contact').hide();
          }
      });
    });
    /*********************************/

    /************ MESSAGE **************/
      // Quando faccio "CLICK", si appende il 'INPUT' nel area dei messaggi.
    $('#js_enter').click(
      function(){
        sendMessage();
        replyMessage();
      }
    );

    // Quando il tasto si abbassa appende 'INPUT' nel area dei messaggi.
    $('.write-message input').keydown(
      function(event){
        if(event.which=='13'){
          sendMessage();
          replyMessage();
        }
       }
     );
     /*********************************/


     /*FUNZIONI*/

     // FUNCTION: creaNumeroRandom(): Questa Funzione crea un numero random tenendo in considerazione come range max, la larghezza del array inserito.
      //   --> array: array da inserire.
     function creaNumeroRandom(array){
         var numero = Math.round(Math.random()*(array.length-1));
         return numero;
       }

    // FUNCTION: addZeroToNumber(): Questa funzione aggiunge uno zero da vanti a un numero menore di 10.
      //   --> number: numero da inserire.
     function addZeroToNumber(number){
       if(number < 10) {
         return '0' + number;
       }
       return number;
     }

   //  FUNCTION: sendMessage(): Questa funzione contiene il messaggio da inviare, e l'ora del messagio. C'e anche  una risposta automatica.
     function sendMessage(){

       var message = $('.write-message input').val();
       var template = $('.template').find('.message-right').clone();
       // console.log(template)

       // Inserire Ora.
       var date = new Date();
       var currentHours = date.getHours();
       var currentMinutes = date.getMinutes();
       var currentTime = addZeroToNumber(currentHours) + ':' + addZeroToNumber(currentMinutes);
       template.find('.message-hour').text(currentTime);

       template.find('.box-right p').text(message);

       $('.wrapper-message').append(template);
       // Reset Value
       $('.write-message input').val('');

       /* Vissualizare ultimo messaggio */
       $('.container-message').scrollTop($('.container-message').height());
     }

     //  FUNCTION: replyMessage(): Questa funzione genera una risposta automatica dopo 1 sec.
     function replyMessage(){
       setTimeout(function(){
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

         var numeroRandon = creaNumeroRandom(messagesReceived);
         var template = $('.template').find('.message-left').clone();

        // Inserire Ora.
         var date = new Date();
         var currentHours = date.getHours();
         var currentMinutes = date.getMinutes();
         var currentTime = addZeroToNumber(currentHours) + ':' + addZeroToNumber(currentMinutes);
         template.find('.message-hour').text(currentTime);

         template.find('.box-left p').text(messagesReceived[numeroRandon]);

         $('.wrapper-message').append(template);

         /* Vissualizare ultimo messaggio */
         $('.container-message').scrollTop($('.container-message').height());
       }, 1000);
     }

     //  FUNCTION: activeSettingsMessages(): Questa Funzione attiva le impostazioni dei messaggi, e ti da la opzione di eliminare il messagio.
     function activeSettingsMessages(){
       $('.icon-settings-message').click(
         function(){
           $(this).parents().siblings('.settings-message').toggleClass('active');
           $(this).parents().parents().siblings().find('.settings-message').removeClass('active')

           $('.js_delete-message').click(
             function(){
             $(this).parents('.js_msg').addClass('hidden');
           }
           );
         }
       );
     }

     /*END FUNZIONI*/



  }
);
