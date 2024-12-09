$(document).ready(function (){

    // Mobile Menu //
    $(document).on('click', '.btn-menu', function (e) {
        e.preventDefault();
        $('html').toggleClass("open--nav");
    });
    $(document).on('click', '.overlay', function () {
        $('html').removeClass("open--nav");
    });
    // End Mobile Menu //

    // Select //
    $(document).on('click', '.select .selected', function(e){
        e.stopImmediatePropagation();
        $(this).closest('.select').toggleClass('open');
    });
    $(document).on('click', '.select .select-list .item .option', function(e){
        e.stopImmediatePropagation();
        const $select = $(this).closest('.select');
        $select.children('.selected').html($(this).clone());
        $select.toggleClass('open');
        $select.trigger('change', $(this));
        $(this).addClass('active').siblings().removeClass('active');
    });
    $(document).on('click', function() {
        $('.select.open').removeClass('open');
    });
    $('.select .select-list .item:first-child').addClass('active');
    // End Select //

    // TABS //
    $(".tab").click(function(e) {
        e.preventDefault();

        const $tabs_el = $(this).closest('.tabs');
        const tabs_block_id = $tabs_el.attr('data-tabs-block');
        const $tabs_block = $('.tabs-content[data-tabs-block="'+tabs_block_id+'"]');
        const tab_item_id = $(this).attr('data-tab-id');

        $tabs_el.find(".tab").removeClass("active");
        $(this).addClass("active");

        $tabs_block.find('.tab-item').hide().removeClass('active-tab');
        $tabs_block.find('.tab-item[data-tab-id="'+tab_item_id+'"]').show().addClass('active-tab');
    });

    $('.tabs').each(function() {
        $(this).find('.tab').eq(0).click()
    });
    // END TABS //

    // Accordion //
    $('.btn-det').click(function(e){
        e.preventDefault();
        $(this).toggleClass('active');
        $(this).parent().children('.inner').slideToggle(200);
    });
    // End Accordion //

    // MODAL //
    $(document).on('click', '.modal_w', function (e) {
        e.preventDefault();
        $( $.attr(this, 'href') ).fadeIn(150);
        $('html').addClass('open--m');
    });
    $(document).on('click', '.closed_m', function (e) {
        e.preventDefault();
        $('.modal').fadeOut(0);
        $('html').removeClass('open--m');
    });
    // End MODAL //

    // Counter //
    var counterOneShow = $('.counter-one');

    if(counterOneShow.length){
        var counterOne = 0;
        $(window).scroll(function () {
            var oTop = $(".counter-one").offset().top - window.innerHeight;
            if (counterOne == 0 && $(window).scrollTop() > oTop) {
                $(".counter-one").each(function () {
                    var $this = $(this),
                        countTo = $this.attr("data-number");
                    $({
                        countNum: $this.text()
                    }).animate(
                        {
                            countNum: countTo
                        },

                        {
                            duration: 2000,
                            easing: "swing",
                            step: function () {
                                $this.text(
                                    Math.ceil(this.countNum).toLocaleString("en")
                                );
                            },
                            complete: function () {
                                $this.text(
                                    Math.ceil(this.countNum).toLocaleString("en")
                                );
                            }
                        }
                    );
                });
                counterOne = 1;
            }
        });
    }

    var counterTwoShow = $('.counter-two');

    if(counterTwoShow.length){
        var counterTwo = 0;
        $(window).scroll(function () {
            var oTop = $(".counter-two").offset().top - window.innerHeight;
            if (counterTwo == 0 && $(window).scrollTop() > oTop) {
                $(".counter-two").each(function () {
                    var $this = $(this),
                        countTo = $this.attr("data-number");
                    $({
                        countNum: $this.text()
                    }).animate(
                        {
                            countNum: countTo
                        },

                        {
                            duration: 3000,
                            easing: "swing",
                            step: function () {
                                $this.text(
                                    Math.ceil(this.countNum).toLocaleString("en")
                                );
                            },
                            complete: function () {
                                $this.text(
                                    Math.ceil(this.countNum).toLocaleString("en")
                                );
                            }
                        }
                    );
                });
                counterTwo = 1;
            }
        });
    }
    // End counter //

});

// Header sticky //
window.onscroll = function() {headerSticky()};
var header = document.getElementById("header");
var sticky = header.offsetTop;
function headerSticky() {
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}
// End Header sticky //

