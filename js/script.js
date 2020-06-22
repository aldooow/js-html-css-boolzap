$(document).ready(
  function(){



    // FINESTRA MESSAGI.
    // Quando faccio CLICK sulla icona sui messagi, faccio apparire una finestra con delle opzioni.
    $(document).on('click', '.icon-settings-message',
      function(){
        $(this).parents().siblings('.settings-message').toggleClass('active');
        $(this).parents().parents().siblings().find('.settings-message').removeClass('active')
        // Quando faccio CLICK sulla opzione DELETE, cancello il messaggio.
        $('.js_delete-message').click(
          function(){
          $(this).parents('.js_msg').addClass('hidden');
        });
      });


    // FINESTRA CONTATTI.
    // Quando faccio CLICK su un CONTACT, si apri il CONTAINER MESSAGE.
    $('.wrapper-contacts .contact').click(
          function() {

        // --> Il BOX del CONTACT clickato, viene aggiunta la class SELECTED(cambio colore),
            // e agli altri viene tolta la class SELECTED(cambio colore).
            $(this).addClass('selected').siblings().removeClass('selected');
            // Nel caso ci fossero notifiche nel BOX CONTACT, dopo il CLICK, si aggiunge la class HIDDEN.
            $(this).find('.notifications-message-contact').addClass('hidden')

       // --> Su tutti CONTACT viene tolta la class ACTIVE(display: block);
            var contact = $(this).attr('src');
            $('.container-message').removeClass('active');
            // E sul CONTAINER MESSAGE con lo stesso ATTR di CONTACT, viene aggiunta la Class ACTIVE(display: block)
            var selettore = '.container-message[src-msg="' + contact + '"]'
            $(selettore).addClass('active')

     // --> Prendo ATTR e TEXT dal CONTACT clickato
              //--> Avatar del contatto.
            var contactAvatar = $(this).find('img').attr('src');
              //--> Nome del contatto.
            var contactName = $(this).find('h4').text();
              //--> Vissualizazione orario contatto.
            var contactLastTimeSeen = $(this).find('.time-contact p').text();
          // e le aggiungo/ Sostituisco con quelli del HEADER BAR CONTACT.
              //--> Sostituisco Avatar del contatto.
            var currentContactAvatar = $('.header-contact-bar').find('img').attr('src', contactAvatar);
              //--> Sostituisco Nome del contatto.
            var currentContactName = $('.header-contact-bar').find('h4').text(contactName);
              //--> Sostituisco Vissualizazione orario contatto.
            var currentContactLastTimeSeen = $('.header-contact-bar').find('.last-access p').text('ulimo accesso oggi alle ' + contactLastTimeSeen);

        });


    // BLOCCO SEARCH.
    // Quando faccio "CLICK" sul 'INPUT' di SEARCH,
    $('#js_search').on("keyup", function() {
      // e inserisco una Parola,
      var value = $(this).val().toLowerCase();
      // viene confrontata con ogni parola a dentro un H4 appartenente al BOX CONTACT
      $('.box-contact h4').each(
        function() {
          // Se dentro il testo, fosse inclusa la parola che ho inserito,
          if($(this).text().toLowerCase().includes(value)){
            // lascio in show CONTACT,
            $(this).parents('.contact').show();
          } else {
            // altrementi hide CONTACT.
            $(this).parents('.contact').hide();
          }
      });
    });

    // MESSAGE.
    //  Quando faccio CLICK sulla INPUT si vede la ICONA INVIA e sparisce la ICONA VOICE.
    $('.write-message input').click( function(){
      $('#js_enter').removeClass('hidden');
      $('#js_voice').addClass('hidden');
    });

      // Quando faccio "CLICK", si appende il 'INPUT' nel area dei messaggi.
    $('#js_enter').click(
      function(){
        sendMessage();
        // Ho aggiunto un SET TIME OUT, din un secondo, per far vedere nel BOX CONTACT
        // a sinistra, i messagi del area messagi prima che venga fuori la scriva "sta scrivendo un  messaggio".
        setTimeout(function(){
          replyMessage();
        }, 1000);
        // RESET:: Quando invio il messagio sparisce il bottone INVIA e torna la VOICE.
        $('#js_enter').addClass('hidden');
        $('#js_voice').removeClass('hidden');
      });

    // Quando faccio KEYDOWN, si appende 'INPUT' nel area dei messaggi.
    $('.write-message input').keydown(
      function(event){
        if(event.which=='13'){
          sendMessage();
          // Ho aggiunto un SET TIME OUT, din un secondo, per far vedere nel BOX CONTACT
          // a sinistra, i messagi del area messagi prima che venga fuori la scriva "sta scrivendo un  messaggio".
          setTimeout(function(){
            replyMessage();
          }, 1000);

        }
       });

     /*FUNZIONI*/

   //  FUNCTION: sendMessage(): Questa funzione contiene il messaggio da inviare, e l'ora del messagio.
     function sendMessage(){

       var message = $('.write-message input').val();
       var template = $('.template').find('.message-right').clone();
       var checkMessage = ' <i class="check fas fa-check"></i> ';
       // Inserire Ora.
       var date = new Date();
       var currentHours = date.getHours();
       var currentMinutes = date.getMinutes();
       var currentTime = addZeroToNumber(currentHours) + ':' + addZeroToNumber(currentMinutes);
       // Aggiungo a MESSAGE HOUR il testo di CURRENT-TIME.
       template.find('.message-hour').html(currentTime + checkMessage);
       // Aggiunto a MESSAGE SEND il MESSAGE.
       template.find('.js_message-send').text(message);
       // Append il TEMPLATE sul CONTAINER MESSAGE si ha la class ACTIVE.
       $('.container-message.active').append(template);
       // Reset VALUE del INPUT.
       $('.write-message input').val('');

       /* Vissualizare ultimo messaggio */
       $('.container-message').scrollTop($('.container-message').height());

       // L'orario e il testo  del TIME CONTACT si vedono anche nel BOX CONTACT.
       $('.contact.selected').find('.time-contact p').text(currentTime);
       $('.contact.selected').find('.box-contact p').html(checkMessage + message);

     }

     //  FUNCTION: replyMessage(): Questa funzione genera una risposta automatica dopo 1.5 sec.
     function replyMessage(){
        // Mentre aspetta il messaggio di risposta far vedre nella HEADER CONTACT BAR un messaggio..
        $('.header-contact-bar').find('.last-access p').text('sta scrivendo un messagio...');
        $('.contact.selected').find('.box-contact p').text('sta scrivendo un messagio...');

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
           'Sicuro???',
           'devo salutarti',
           'Tutto è cambiato',
           'devo portare il cane fuori',
           'volendo domani possiamo uscire'
         ];

         var numeroRandon = creaNumeroRandom(messagesReceived);
         var template = $('.template').find('.message-left').clone();

        // Inserire Ora.
         var date = new Date();
         var currentHours = date.getHours();
         var currentMinutes = date.getMinutes();
         var currentTime = addZeroToNumber(currentHours) + ':' + addZeroToNumber(currentMinutes);
         // Aggiungo a MESSAGE HOUR il testo di CURRENT-TIME.
         template.find('.box-left .message-hour').text(currentTime);
         // Aggiungo a MESSAGE RECEIVED il testo del "Risposte Automatiche".
         template.find('.js_message-received').text(messagesReceived[numeroRandon]);
         // Append il TEMPLATE sul CONTAINER MESSAGE si ha la class ACTIVE.
         $('.container-message.active').append(template);

         /* Vissualizare ultimo messaggio */
         $('.container-message').scrollTop($('.container-message').height());

         // Dopo che a risposto con un messagio far apparire nella HEADER CONTACT BAR questo messaggio.
         $('.header-contact-bar').find('.last-access p').text('ultimo accesso oggi alle ' + currentTime);

         // L'orario e il testo  del TIME CONTACT si vedono anche nel BOX CONTACT.
         $('.contact.selected').find('.time-contact p').text(currentTime);
         $('.contact.selected').find('.box-contact p').text(messagesReceived[numeroRandon]);

       }, 1500);
     }

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
     /*END FUNZIONI*/

  }
);
