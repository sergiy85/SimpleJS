$(function(){
   let navHeight = $('nav').outerHeight();
   let sections = $('.section');

   $('.nav__link[href^="#"]').on('click', function(ev){
   ev.preventDefault();
   
   let id = $(this).attr('href');
    //теперь надо получить высоту элемента относительно страницы(top). для этого  
   let offsetTop = ($(id).offset().top > 0) ? $(id).offset().top - navHeight : $(id).offset().top; 
   // console.log(offsetTop);

   // $('.nav__link').removeClass('nav__link--active');
   // $(this).addClass('nav__link--active');


   //проскролить страницу на несколько пикселовю буде скролить и html и body (для кроссбраузерности). 
   //чтобы плавно animate

   $('html, body').animate({
      scrollTop: offsetTop
   }, 500);


   });

   //задаем событие скролл для документа (чтобы при скроллинге перемещался и активный класс)

   $(document).on('scroll', function(){
      let scrollPoint = $(this).scrollTop();// сколько мы проскролили

      sections.each(function () {
      let offsetTop = ($(this).offset().top > 0) ? $(this).offset().top - navHeight - 1 : $(this).offset().top; // позицию секции относительно верха документа
      if (scrollPoint > offsetTop) { // проскролили ли мы больше, чем позиция секции
        
        let id = $(this).attr('id'); // получаем id этой секции 

        $('.nav__link').removeClass('nav__link--active'); // забрали у всех классы
        $(`.nav__link[href="#${id}"]`).addClass('nav__link--active'); // даем активный класс ссылке, у которой в href лежит id секции
      }
    });

   });
   
   // ================================== HOMEWORK===================================================


   //возвращаем активный класс при перезагрузке страницы

   $(document).ready(function() {
       let active = window.location.hash;
       active = $('.nav__link--active').click(); 
   });

   //обработка/прокрутка кнопок
      
   $(document).ready(function(){
      $("#btn--up").click(function(){
      let scrollPath = $(document).scrollTop();
      let scrollTime = scrollPath/2.00;
      $("body,html").animate({
         "scrollTop":0},scrollTime);
      });

   $("#btn--down").click(function(){
      let scrollPath = $(document).scrollTop();
      let height = $("body").height();
      let scrollTime = (height - scrollPath)/2.00;
      $("body,html").animate({
         "scrollTop":height},scrollTime);
      });
   });

   //скрываем/показываем кнопки при прокрутке

   $(window).scroll(function() {
      if ($(window).scrollTop() > 1300)  {                  
          $('#btn--down').css('display', 'none');
         }
      else {
         $('#btn--down').css('display', '');
        }  
   });

   $(window).scroll(function() {
      if ($(window).scrollTop() === 0)  {                  
          $('#btn--up').css('display', 'none');
         }
      else {
         $('#btn--up').css('display', '');
        }  
   });

});



