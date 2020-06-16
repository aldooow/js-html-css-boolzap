$(document).ready(


  function(){
    /*********************************/

    // Click su .... , per aprire le opzioni
    $('#js_enter').click(
      function(){
        var message = $('.write-message input').val()
        var template = $('.template').children('.message-me').clone();
        console.log(template)
        template.text(message)
        $('.wrapper-message').append(template);

      }
    );


    /*********************************/
  }

);
