/**
 * Plugin Simpe Slide Show for jquery
 * Author: Labelsuisse
 * version: 0.2.0
 * https://github.com/Labelsuisse/jquery.slideshow
 * @2014
 */

(function ($){

$.fn.nextOrFirst = function(elm) {
    var that = $(this);
    if (that.next().length) {
        return that.next();
    } else {
        return that.parent().find(elm).first();
    }
}

$.fn.prevOrLast = function (elm) {
    var that = $(this);
    if (that.prev().length) {
        return that.prev();
    } else {
        return that.parent().find(elm).last();
    }
}

$.fn.slideshow = function(opts){

    var defaults = {

            /* Style for button */
            btnStyle: {},
            btnStyleLeft: {},
            btnStyleRight: {},

            /* Style for container of images */
            containerStyle : {
                position: "relative",
                border: "3px solid #F2F2F2",
            },

            /* Transition */
            fadeOutSpeed: 'slow',
            fadeInSpeed: 'slow',

            /* Style for container image */
            imageStyle : {
                textAlign: 'center',
                backgroundColor: '#fff',
                // position: 'absolute'
            },

            /* Style for container marker */
            markerStyle : {
                position: "absolute",
                right: 5,
                bottom: 19,
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

            /* Duration of transition for Start auto */
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
            width: '100%'
        }
      , btnDefaultStyle = {
            width: 50,
            top: 5,
            position: "absolute",
            display: 'none',
            // background: "#fff",
            color: "rgb(3, 150, 191)",
            cursor: "pointer",
            textAlign: "center",
            fontSize: "3em",
            zIndex: 100
        }
      , contentStyle = {
            overflow: "hidden",
            height: "inherit",
            width: "inherit",
        }
      , content = $(this)
      , width, height
      , childs = content.children()
      , ul
      , viewCurrent = 'view-current'
      , markerCurrent = 'marker-current'
      , timer
      , marker
      , btnDefault = (typeof opts.btnStyle === 'undefined') && 
                        (typeof opts.btnStyleLeft === 'undefined') && (typeof opts.btnStyleRight === 'undefined')

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
      , ratio = function (name, img) {
            if (name === 'width') {
                return (img.height() / height);
            } else if (name === 'height') {
                return (img.width() / width);
            }
        }
      , resizeImage = function (img) {
            if (opts.resizeImage) {
                if (width > height) {
                    if ((img.width() / ratio('width',img)) > width) {
                        img.width(width);
                    } else {
                        img.height(height);
                    }

                } else {
                    // width prime
                    if ((img.height() / ratio('height',img)) > height) {
                        img.height(height);
                    } else {
                        img.width(width);
                    }
                }
            }
            return img;
        }
      , changeImage = function (direction, stopTimer) {
            $('.view-current')
                .removeClass(viewCurrent)
                .fadeOut(opts.fadeOutSpeed, function () {
                    var newCurrent = $(this)[direction]('li')
                        .fadeIn(opts.fadeInSpeed)
                        .addClass(viewCurrent);
                    setClass(getIndexById(newCurrent));
                })
            if (stopTimer) {
                clearInterval(timer);
            }
        }
      , createBtn = function(){
            var i, btnStyle
              , clickLeft = function() {
                    changeImage('prevOrLast', true);
                }
              , clickRight = function () {
                    changeImage('nextOrFirst', true);
                }
              , applyStyle = function (obj, styles) {
                    for(var key in styles) {
                        obj[key] = styles[key];
                    }
                    btnStyle.top = ((content.height() - btnStyle.height) / 2);
                    btnStyle.lineHeight = btnStyle.height + "px"; 
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
                        applyStyle(btnStyle, opts.btnStyleRight)
                    }

                    text = ">";
                    btn.attr('id', 'slider-btn-right');
                    btn.on('click', clickRight);
                    delete btnStyle.left;
                }

                if (btnDefault){
                    moving(content, btnStyle.width);
                }
                btn.text(text);
                btn.css(btnStyle);
                content.append(btn);
            }

        }
      , moving = function (elm, width) {
            var elm = $(elm)
              , offset = elm.offset()
              , left4 = offset.left + elm.width()
              , center = width || (left4 / 2) / 2
              , left1 = offset.left
              , left2 = offset.left + center
              , left3 = left4 - center
              , oBottom = offset.top + elm.height();

            elm.on('mousemove', function (e) {
                if((e.clientX > left1 && e.clientX < left2) && (e.clientY > offset.top && e.clientY < oBottom)){
                    elm.find('#slider-btn-left').show();
                }else if((e.clientX > left3 && e.clientX < left4) && (e.clientY > offset.top && e.clientY < oBottom)){
                    elm.find('#slider-btn-right').show();
                }else{
                    elm.find('#slider-btn-left').hide().end().find('#slider-btn-right').hide();
                }

            }).on('mouseout', function(){
                elm.find('#slider-btn-left').hide().end().find('#slider-btn-right').hide();
            });
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

        if (width < height) {
            console.log(height / ratio('height', v.find('img')));
            opts.imageStyle.marginTop = 0;//height / ratio('height', v.find('img'));//(height / (v.find('img').width() / width));
        }

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
        
        $('.view-current').removeClass(viewCurrent).fadeOut(opts.fadeOutSpeed, function () {
            $('#slide-image-'+n).fadeIn(opts.fadeInSpeed).addClass(viewCurrent);
            setClass(n);

        });

        clearInterval(timer);
    });

    // Slide automatique
    timer = setInterval(function(){
        changeImage('nextOrFirst');
    }, opts.transitionAuto);
    content.append(create('div').css(contentStyle).append(content.children()));
}

})(window.jQuery);