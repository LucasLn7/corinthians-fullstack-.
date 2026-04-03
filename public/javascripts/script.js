// script.js - Responsável por interações gerais do site, como menu móvel, navegação e animações de scroll.
$(document).ready(function() {
    $('#mobile_btn').on('click', function () {
        $('#mobile_menu').toggleClass('active');
        $('#mobile_btn i').toggleClass('fa-bars fa-x');
    });
     
    $('#mobile_nav_list a').on('click', function(){
        $('#mobile_menu').removeClass('active');
        $('#mobile_btn i').removeClass('fa-x').addClass('fa-bars');
    });

    const sections = $('section');
    const navItems = $('.nav-item');

    $(window).on('scroll', function () {
        const header = $('header');
        const scrollPosition = $(window).scrollTop();
        const headerHeight = header.outerHeight();

        let activeSectionIndex = 0;

        if (scrollPosition <= 0) {
            header.css('box-shadow', 'none');
        } else {
            header.css('box-shadow', '5px 1px 5px rgba(0, 0, 0, 0.1)');
        }

        sections.each(function(i) {
            const section = $(this);
            const sectionTop = section.offset().top - headerHeight - 20;
            const sectionBottom = sectionTop + section.outerHeight();

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activeSectionIndex = i;
                return false;
            }
        });

        navItems.removeClass('active');
        $(navItems[activeSectionIndex]).addClass('active');
    });

    if (typeof ScrollReveal !== 'undefined') {
        ScrollReveal().reveal('#cta', {
            origin: 'left',
            duration: 1500,
            distance: '20%'
        });
        ScrollReveal().reveal('#banner', {
            origin: 'right',
            distance: '60px',
            duration: 1500
        });
        
        ScrollReveal().reveal('.talvez .card', {
            origin: 'bottom',
            duration: 1500,
            distance: '20%',
            interval: 300
        });
        
        
        ScrollReveal().reveal('.topicos .card', {
            origin: 'bottom',
            duration: 1200,
            distance: '20%',
            interval: 150
        });
    
        ScrollReveal().reveal('#saiba .saiba-card', {
            origin: 'bottom',
            duration: 1500,
            distance: '20%', 
            scale: 0.9
        });
    }
    
    $('.card').on('mouseenter',function(){
        $(this).css('z-index','10');
    }).on('mouseleave',function(){
        $(this).css('z-index','1');
    });
});
