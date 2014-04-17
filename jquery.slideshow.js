/**
 * Plugin Simpe Slide Show for jquery
 * Author: Labelsuisse
 * version: 0.2.0
 * https://github.com/Labelsuisse/jquery.slideshow
 * @2014
 */

(function ($){

$.fn.slideshow = function(opts){

    var defaults = {

            /* Style for button */
            btnStyle: {},
            btnStyleLeft: {},
            btnStyleRight: {},

            /* Style for container of images */
            containerStyle : {
                position: "relative",
                border: "3px solid #F2F2F2"
            },

            /* Transition */
            fadeOutSpeed: 'slow',
            fadeInSpeed: 'slow',

            /* Style for container image */
            imageStyle : {
                textAlign: 'center',
                backgroundColor: '#fff',
            },

            /* Style for container marker */
            markerStyle : {
                position: "absolute",
                right: 5,
                bottom: 17,
                zIndex: 10,
            },

            /* Background color marker for current image */
            markerCurrentBgColor: 'rgb(3, 150, 191)',

            /* Style for marker point */
            pointStyle : {
                display: 'inline-block',
                margin: '0px 2px',
                borderRadius: 5,
                height: 10,
                width: 10,
                background: '#fff',
                cursor: 'pointer'
            },

            /* Style for container title */
            titleStyle : {
                position: 'absolute',
                textAlign: 'center',
                color: '#fff',
                background: 'rgba(0, 0, 0, .3)',
                bottom: 20,
                height: 30,
                width: '100%',
                paddingTop: 5
            },

            /* Duration of transition for setInterval */
            transitionAuto: 3000,

            /* Automatic resize images adaptable of content */
            resizeImage : false
        }
      , ulCss = {
            padding: 0, 
            margin: 0,
            listStyle: 'none',
        }
      , liCss = {
            background: '#fff',
            position: 'absolute',
            width: '100%'
        }
      , btnDefaultStyle = {
            width: 50,
            top: 5,
            position: "absolute",
            background: "#fff",
            color: "#fff",
            cursor: "pointer",
            textAlign: "center",
            fontSize: "3em",
            zIndex: 100
        }
      , content = $(this)
      , width, height
      , childs = content.children()
      , ul
      , viewCurrent = 'view-current'
      , markerCurrent = 'marker-current'
      , timer
      , marker
      , btnDefault = typeof opts.btnStyle === 'undefined'

      , create = function (elem) {
            return $(document.createElement(elem));
        }

      , getIndexById = function (_elm){
            var x = _elm.attr('id').split('-');
            return x[x.length -1];
        }

      , setClass = function (i){
            var spans = marker.find('span')
              , current;
            spans.css('background', opts.pointStyle.background);
            if(i){
                current = $('#marker-point-' + i);
            }else{
                current = spans.first();
            }
            current.css('background', opts.markerCurrentBgColor);
        }
      , resizeImage = function (img) {
            if (opts.resizeImage) {
                if (width > height) {
                    // height prime
                    img.height(height);
                } else {
                    // widht prime
                    img.width(width);
                }
            }
            return img;
        }
      , createBtn = function(){
            var i, btnStyle
              , clickLeft = function() {
                    var current = $('.view-current').prev();
                    var li = content.find('ul').find('li');
                    clearInterval(timer);
                    li.fadeOut(opts.fadeOutSpeed).removeClass(viewCurrent);
                    if( current.length == 0 ){
                        current = li.last();
                    }
                    current.fadeIn(opts.fadeInSpeed).addClass(viewCurrent);
                    setClass(getIndexById(current));
                }
              , clickRight = function () {
                    var current = $('.view-current').next();
                    var li = content.find('ul').find('li');
                    clearInterval(timer);
                    li.fadeOut(opts.fadeOutSpeed).removeClass(viewCurrent);
                    if( current.length == 0 ){
                        current = li.first();
                    }
                    current.fadeIn(opts.fadeInSpeed).addClass(viewCurrent);
                    setClass(getIndexById(current));
                }
              , applyStyle = function (obj, styles) {
                    for(var key in styles) {
                        obj[key] = styles[key];
                    }
              }

            if (btnDefault) {
                btnStyle = btnDefaultStyle;
                btnStyle.height = height - opts.titleStyle.height - opts.titleStyle.bottom - 10;
                btnStyle.lineHeight = btnStyle.height + "px";
            } else {
                btnStyle = opts.btnStyle;
                btnStyle.top = ((content.height() - btnStyle.height) / 2);
                btnStyle.lineHeight = btnStyle.height + "px"; 

            }

            for(i=0; i < 2; i++){
                var btn = create('div')
                  , text;
                
                if(i == 0){
                    // Left
                    if (btnDefault) {
                        btnStyle.left = 0;
                    } else {
                        // btnStyle.left = -10;
                        applyStyle(btnStyle, opts.btnStyleLeft)
                        
                    }
                    text = "<";
                    btn.attr('id', 'slider-btn-left');
                    btn.on('click', clickLeft);
                } else {
                    // Right
                    if (btnDefault) {
                        btnStyle.right = 0;
                    } else {
                        // btnStyle.right = -10;
                        applyStyle(btnStyle, opts.btnStyleRight)
                    }
                    // btn.text(">");
                    text = ">";
                    btn.attr('id', 'slider-btn-right');
                    btn.on('click', clickRight);
                    delete btnStyle.left;
                }

                if (btnDefault){
                    btn.on('mouseover', function () {
                        $(this).css('color', 'rgb(3, 150, 191)');
                    }).on('mouseout', function () {
                        $(this).css('color', btnDefaultStyle.color);
                    });
                }
                btn.text(text);
                btn.css(btnStyle);
                content.append(btn);
            }

        };

    /* Start Contruction */
    opts = $.extend(true, defaults, opts);
    
    content.css(opts.containerStyle);
    width = content.width();
    height = content.height();

    /* create Marker */
    marker = create('div').css(opts.markerStyle);
    content.append(marker);

    
    /* create ul */
    ul = create('ul')
            .css(ulCss)
            .appendTo(content);

    $.each(childs, function(k, v){
        var li, divTitle, divImg, spanMarker;
        v = $(v);

        divTitle = create('div').css(opts.titleStyle).text(resizeImage(v.find('img')).attr('title'));
        divImg = create('div').css(opts.imageStyle).append(v);

        li = create('li')
                .css(liCss)
                .attr('id', 'slide-image-' + k)
                .append(divTitle)
                .append(divImg)
                .appendTo(ul);

        spanMarker = create('span').css(opts.pointStyle).attr('id', "marker-point-" + k);

        if( k == 0 ){
            spanMarker.css('background', opts.markerCurrentBgColor);
            li.addClass(viewCurrent);
        } else {
            li.css({'display': 'none'});
        }
        marker.append(spanMarker);
    });
    
    createBtn();

    marker.find('span').on('click', function(){
        var n = getIndexById($(this));

        content.find('li').fadeOut(opts.fadeOutSpeed).removeClass(viewCurrent);
        $('#slide-image-'+n).fadeIn(opts.fadeInSpeed).addClass(viewCurrent);
        setClass(n);
        clearInterval(timer);
    });

    // Slide automatique
    timer = setInterval(function(){
        var li = content.find('li')
          , current = $('.view-current');

        li.fadeOut(opts.fadeOutSpeed).removeClass(viewCurrent);

        if(current.next().length == 0){
            current = li.eq(0).fadeIn().addClass(viewCurrent);
        }else{
            current = current.next().fadeIn().addClass(viewCurrent);
        }
        setClass(getIndexById(current));
    
    }, opts.transitionAuto);
    
}

})(window.jQuery);