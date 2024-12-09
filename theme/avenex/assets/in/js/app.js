$(document).ready(function (){

    // Mobile Menu //
    $(document).on('click', '.btn-menu', function (e) {
        e.preventDefault();
        $('html').toggleClass("open--nav");
        $('html').removeClass("open--filter");
    });
    $(document).on('click', '.overlay', function () {
        $('html').removeClass("open--nav");
        $('html').removeClass("open--filter");
    });
    // End Mobile Menu //

    // Sub Nav //
    $(document).on('click', '.drop-link', function(e){
        e.preventDefault();
        $(this).toggleClass('open-drop');
        $(e.currentTarget.nextElementSibling).slideToggle(200);
    });
    if ( $('.nav .sub-nav .sub-link').hasClass('active') ) {
        $('.nav .sub-nav').addClass('active');
        $('.drop-link').addClass('open-drop');
    }
    // End Sub Nav //

    // Select //
    $('.select .select-list .item:first-child').addClass('active');
    $(document).on('click', '.select .selected', function(e){
        e.stopImmediatePropagation();
        $(this).closest('.select').toggleClass('open');
    });
    $(document).on('click', '.select .select-list .item .option', function(e){
        e.stopImmediatePropagation();
        const $item = $(this).closest('.item');
        const $select = $(this).closest('.select');
        $select.children('.selected').html($(this).clone());
        $select.toggleClass('open');
        $select.trigger('change', $(this));
        $item.addClass('active').siblings().removeClass('active');
        $select.children('input').val($item.attr('data-id'));
        $select.children('input').trigger('change');
    });
    $(document).on('click', function() {
        $('.select.open').removeClass('open');
    });
    // End Select //

    // Scroll //
    var scrollBar = $('.scroll_wrapper');
    if(scrollBar.length){
        $('.scroll_wrapper').each(function() {
            OverlayScrollbars(this, {
                sizeAutoCapable: this.classList.contains('select-list')
            });
        });
    }

    var scrollBar = $('.wrap-scroll');
    if(scrollBar.length){
        $('.wrap-scroll').each(function() {
            OverlayScrollbars(this, {
                sizeAutoCapable: this.classList.contains('select-list')
            });
        });
    }

    var scrollBarHor = $('.wrap-scroll-hor');
    if(scrollBarHor.length){
        $('.wrap-scroll-hor').each(function() {
            OverlayScrollbars(this, {
                overflowBehavior : {
                    x : "scroll"
                },
            });
        });
    }
    // End Scroll //

    // ToolTip //
    var tooltips = $('.tooltip');
    if(tooltips.length){
        $('.tooltip').tooltipster({
            delay: 100,
            distance: 1,
            trigger: 'custom' // disable all by default
        }).mouseover(function(){ // show on hover
            $(this).tooltipster('show');
        }).blur(function(){ // on click it'll focuses, and will hide only on blur
            $(this).tooltipster('hide');
        }).mouseout(function(){ // if user doesnt click, will hide on mouseout
            if(document.activeElement !== this){
                $(this).tooltipster('hide');
            }
        });
    }
    // END ToolTip //

    // Table tickets //
    $(function(){
        $(".table-ticket").on("click", "tr.cnt", function (e) {
            window.location = $(this).data("href");
        });
    });
    // End Table tickets //

    // Tree //
    $('.tree .tree-btn').click(function(sender){
        $(this).toggleClass('active');
        $(this).parent().next().slideToggle(150);
    });
    // END Tree //

    // Accordion //
    $('.btn-det').click(function(e){
        e.preventDefault();
        $(this).toggleClass('active');
        $(this).parent().parent().parent().children('.inner').slideToggle(200);
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

    // Video //
    $('.play-btn').click(function(e){
        e.preventDefault();
        removeAllIframs();
        $('.video-modal').fadeIn(150);
        $('html').addClass('open--media');
        var dataYoutube = $(this).attr('data-youtube');
        $('.video-modal .video-wrap').append('<iframe width="1000" height="565" src="https://www.youtube.com/embed/'+ dataYoutube +'?autoplay=1" frameborder="0" allow="autoplay" allowfullscreen></iframe>');
    });

    function removeAllIframs(){
        $('iframe').remove();
    }

    $('.video-close_m').click(function(e){
        e.preventDefault();
        $('.video-modal').fadeOut(0);
        $('html').removeClass('open--media');
        removeAllIframs();
    });

    $(window).on ("resize load", function () {
        $("iframe").each(function() {
            var width = $(this).width ();
            $(this).css("height", width / 1.7777 + "px");
        });
    });
    // End Video //

    // Alert modal //
    $(document).on('click', '.alert_w', function (e) {
        e.preventDefault();
        $( $.attr(this, 'href') ).fadeIn(150);
        $('html').addClass('open--alert');
    });
    $(document).on('click', '.closed_alert', function (e) {
        e.preventDefault();
        $('.alert_modal').fadeOut(0);
        $('html').removeClass('open--alert');
    });
    // End Alert modal //

    $('body').one('mouseover', flowmap_deformation);

    function flowmap_deformation() {
        $('.flowmap-deformation-wrapper').each(function(){
            let box = $(this);

            setTimeout(function() {box.addClass('active');}, 300);

            const imgSize = [box.data('bg-width'), box.data('bg-height')];

            const vertex = `
                        attribute vec2 uv;
                        attribute vec2 position;
                        varying vec2 vUv;
                        void main() {
                                vUv = uv;
                                gl_Position = vec4(position, 0, 1);
                        }
                `;
            const fragment = `
                        precision highp float;
                        precision highp int;
                        uniform sampler2D tWater;
                        uniform sampler2D tFlow;
                        uniform float uTime;
                        varying vec2 vUv;
                        uniform vec4 res;

                        void main() {

                                // R and G values are velocity in the x and y direction
                                // B value is the velocity length
                                vec3 flow = texture2D(tFlow, vUv).rgb;

                                vec2 uv = .5 * gl_FragCoord.xy / res.xy ;
                                vec2 myUV = (uv - vec2(0.5))*res.zw + vec2(0.5);
                                myUV -= flow.xy * (0.15 * 0.7);

                                vec3 tex = texture2D(tWater, myUV).rgb;

                                gl_FragColor = vec4(tex.r, tex.g, tex.b, 1.0);
                        }
                `;
            {
                const renderer = new ogl.Renderer({ dpr: 2 });
                const gl = renderer.gl;
                box.append(gl.canvas);

                // Variable inputs to control flowmap
                let aspect = 1;
                const mouse = new ogl.Vec2(-1);
                const velocity = new ogl.Vec2();
                function resize() {
                    let a1, a2;
                    var imageAspect = imgSize[1] / imgSize[0];
                    if (box.outerHeight() / box.outerWidth() < imageAspect) {
                        a1 = 1;
                        a2 = box.outerHeight() / box.outerWidth() / imageAspect;
                    } else {
                        a1 = (box.outerWidth() / box.outerHeight()) * imageAspect;
                        a2 = 1;
                    }
                    mesh.program.uniforms.res.value = new ogl.Vec4(
                        box.outerWidth(),
                        box.outerHeight(),
                        a1,
                        a2
                    );

                    renderer.setSize(box.outerWidth(), box.outerHeight());
                    aspect = box.outerWidth() / box.outerHeight();
                }
                const flowmap = new ogl.Flowmap(gl, {
                    falloff: 0.6
                });
                // Triangle that includes -1 to 1 range for 'position', and 0 to 1 range for 'uv'.
                const geometry = new ogl.Geometry(gl, {
                    position: {
                        size: 2,
                        data: new Float32Array([-1, -1, 3, -1, -1, 3])
                    },
                    uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) }
                });
                const texture = new ogl.Texture(gl, {
                    minFilter: gl.LINEAR,
                    magFilter: gl.LINEAR
                });
                const img = new Image();
                img.onload = () => (texture.image = img);
                img.crossOrigin = "Anonymous";
                img.src = box.data('bg');

                let a1, a2;
                var imageAspect = imgSize[1] / imgSize[0];              //0.5573
                if (box.outerHeight() / box.outerWidth() < imageAspect) {      // 0.4146 < 0.5573
                    a1 = 1;
                    a2 = box.outerHeight() / box.outerWidth() / imageAspect;   // 0.7439
                } else {
                    a1 = (box.outerWidth() / box.outerHeight()) * imageAspect;
                    a2 = 1;
                }

                const program = new ogl.Program(gl, {
                    vertex,
                    fragment,
                    uniforms: {
                        uTime: { value: 0 },
                        tWater: { value: texture },
                        res: {
                            value: new ogl.Vec4(box.outerWidth(), box.outerHeight(), a1, a2)
                        },
                        img: { value: new ogl.Vec2(imgSize[0], imgSize[1]) },
                        // Note that the uniform is applied without using an object and value property
                        // This is because the class alternates this texture between two render targets
                        // and updates the value property after each render.
                        tFlow: flowmap.uniform
                    }
                });
                const mesh = new ogl.Mesh(gl, { geometry, program });

                window.addEventListener("resize", resize, false);
                resize();

                // Create handlers to get mouse position and velocity
                const isTouchCapable = "ontouchstart" in window;
                if (isTouchCapable) {
                    window.addEventListener("touchstart", updateMouse, false);
                    window.addEventListener("touchmove", updateMouse, { passive: false });
                } else {
                    window.addEventListener("mousemove", updateMouse, false);
                }
                let lastTime;
                const lastMouse = new ogl.Vec2();
                function updateMouse(e) {
                    // e.preventDefault();
                    if (e.changedTouches && e.changedTouches.length) {
                        e.x = e.changedTouches[0].pageX;
                        e.y = e.changedTouches[0].pageY;
                    }
                    if (e.x === undefined) {
                        e.x = e.pageX;
                        e.y = e.pageY;
                    }
                    // Get mouse value in 0 to 1 range, with y flipped
                    mouse.set(e.x / gl.renderer.width, 1.0 - e.y / gl.renderer.height);
                    // Calculate velocity
                    if (!lastTime) {
                        // First frame
                        lastTime = performance.now();
                        lastMouse.set(e.x, e.y);
                    }

                    const deltaX = e.x - lastMouse.x;
                    const deltaY = e.y - lastMouse.y;

                    lastMouse.set(e.x, e.y);

                    let time = performance.now();

                    // Avoid dividing by 0
                    let delta = Math.max(10.4, time - lastTime);
                    lastTime = time;
                    velocity.x = deltaX / delta;
                    velocity.y = deltaY / delta;
                    // Flag update to prevent hanging velocity values when not moving
                    velocity.needsUpdate = true;
                }
                requestAnimationFrame(update);
                function update(t) {
                    requestAnimationFrame(update);
                    // Reset velocity when mouse not moving
                    if (!velocity.needsUpdate) {
                        mouse.set(-1);
                        velocity.set(0);
                    }
                    velocity.needsUpdate = false;
                    // Update flowmap inputs
                    flowmap.aspect = aspect;
                    flowmap.mouse.copy(mouse);
                    // Ease velocity input, slower when fading out
                    flowmap.velocity.lerp(velocity, velocity.len ? 0.15 : 0.1);
                    flowmap.update();
                    program.uniforms.uTime.value = t * 0.01;
                    renderer.render({ scene: mesh });
                }
            }
        });
    }

});