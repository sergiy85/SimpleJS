/* Самый простой работающий вариант
		*/

	// $(function(e){
	// 	$('.question').on('click', function(e){
	// 		$(this).next('.answer').toggleClass('open');					
	// 	});						
	// });

		/* Вариант с анимацией для более плавного перехода
		*/

	$(function(e){
		$('.question').on('click', function(e){
			$(this).next('.answer').slideUp(100).toggleClass('open').stop();
		});						
	});