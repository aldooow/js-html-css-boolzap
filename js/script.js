$(document).ready(


  function(){
    /*********************************/

    $('#js_enter').click(
      function(){

        var message = $('.write-message input').val()
        var template = $('.template').children('.message-me').clone();
        // console.log(template)
        template.text(message)
        $('.wrapper-message').append(template);
        // Reset Value
        $('.write-message input').val('')
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
        $('.write-message input').val('')
        }
       }
     );

     // // Quando il tasto si alza resset al 'INPUT'.
     // $(document).keyup(
     //   function(event){
     //     if(event.which=='13'){
     //     $('.write-message input').val('')
     //     }
     //    }
     //  );


    /*********************************/
  }

);
