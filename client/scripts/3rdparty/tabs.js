	
	$(document).ready(function() {
    $("div.dashboard-tab-menu>div.list-group>a").click(function(e) {
        e.preventDefault();
        $(this).siblings('a.active').removeClass("active");
        $(this).addClass("active");
        var index = $(this).index();
        $("div.dashboard-tab>div.dashboard-tab-content").removeClass("active");
        $("div.dashboard-tab>div.dashboard-tab-content").eq(index).addClass("active");
    });



    $("#slider").slider({
              animate: true,
              value:1,
              min: 0,
              max: 800,
              step: 10,
              slide: function(event, ui) {
                  update(1,ui.value); //changed
              }
          });

          $("#slider2").slider({
              animate: true,
              value:0,
              min: 0,
              max: 1000,
              step: 1,
              slide: function(event, ui) {
                  update(2,ui.value); //changed
              }
          });

          //Added, set initial value.
          $("#calorie").val(0);
          $("#price").val(0);
          $("#calorie-label").text(0);
          $("#price-label").text(0);
          
          update();
   

      //changed. now with parameter
      function update(slider,val) {

        //changed. Now, directly take value from ui.value. if not set (initial, will use current value.)
        var $calorie = slider == 1?val:$("#calorie").val();
        var $price = slider == 2?val:$("#price").val();

        /* commented
        $calorie = $( "#slider" ).slider( "value" );
        $price = $( "#slider2" ).slider( "value" );
         */

         $total = "$" + ($calorie * $price);
         $( "#calorie" ).val($calorie);
         $( "#calorie-label" ).text($calorie);
         $( "#price" ).val($price);
         $( "#price-label" ).text($price);
         $( "#total" ).val($total);
         $( "#total-label" ).text($total);

         $('#slider a').html('<label><span class="glyphicon glyphicon-chevron-left"></span> '+$calorie+' <span class="glyphicon glyphicon-chevron-right"></span></label>');
         $('#slider2 a').html('<label><span class="glyphicon glyphicon-chevron-left"></span> '+$price+' <span class="glyphicon glyphicon-chevron-right"></span></label>');


     }



});