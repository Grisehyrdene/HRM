const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    controlsText: [
        `<img src='icons/left.svg' class='slick-prev'></img> `,
        `<img src='icons/right.svg'></img> `
    ]
  });


(function($) {
    $(function() {
      
      $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab-active)', function() {
        $(this)
          .addClass('catalog__tab-active').siblings().removeClass('catalog__tab-active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });
      


    });

    

    function toggleSlide(item){
        $(item).each(function(i){
            $(this).on('click', function(e){
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list')   .eq(i).toggleClass('catalog-item__list_active');
    
            });
        });
    };

    toggleSlide('.catalog-item__back');
    toggleSlide('.catalog-item__link');
    

    // Modal

    $('[data-modal=consultation]').on('click', function() {
      $('.overlay, #consultation').fadeIn('slow');
  });
  $('.modal__close').on('click', function() {
      $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
  });

  $('.button_mini').each(function(i) {
      $(this).on('click', function() {
          $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
          $('.overlay, #order').fadeIn('slow');
      });
  });

  const formProperties = {
    rules:{
        name: 'required', 
        phone: 'required',
        email: {
            required: true,
            email: true
        }
    },
    messages: {
      name: "Пожалуйста, введите Ваше имя.",
      email: {
        required: "Пожалуйста, введите Ваш email адрес.",
        email: "Ваш email адрес должен был в формате name@domain.com"
      },
      phone: "Пожалуйста, введите ваш номер телефона"
    }
}
  $('#consultation-form').validate(formProperties);
  $('#consultation form').validate(formProperties);
  $('#order form').validate(formProperties);
  
  $('input[name=phone]').mask("+7 (999) 999-9999");


  $('form').submit(function(e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
    }).done(function() {
        $(this).find("input").val("");
        $('#consultation, #order').fadeOut();
        $('.overlay, #thanks').fadeIn('slow');

        $('form').trigger('reset');
    });
    return false;
});

// SmoothScroll and pageup

$(window).scroll(()=>{
    if($(this).scrollTop() > 1600){
       $('.pageup').fadeIn();
    }else{
       $('.pageup').fadeOut();
    }
});

$("a[href^='#']").click(function(){
    const _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    return false;
});

new WOW().init();

})(jQuery);