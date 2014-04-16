/**
 * Plugin Simpe Slide Show for jquery
 * Author: Labelsuisse
 * version: 0.1.1
 * https://github.com/Labelsuisse/jquery.slideshow
 * @2014
 */

(function ($){

$.fn.slideshow = function(opts){

    var defaults = {
            markerCurrentBgColor: 'rgb(3, 150, 191)',
            resizeImage : false,
            transitionAuto: 3000,
            fadeOutSpeed: 'slow',
            fadeInSpeed: 'slow',
            btnDefault: true,
            containerStyle : {
                position: "relative",
                border: "3px solid #F2F2F2"
            },

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

            imageStyle : {
                textAlign: 'center',
                backgroundColor: '#fff',
            },

            markerStyle : {
                position: "absolute",
                right: 5,
                bottom: 17,
                zIndex: 10,
            },

            pointStyle : {
                display: 'inline-block',
                margin: '0px 2px',
                borderRadius: 5,
                height: 10,
                width: 10,
                background: '#fff',
                cursor: 'pointer'
            },

            btnStyle : {
                    width: 20,
                    height: 50,
                    borderRadius: 3,
                    position: "absolute",
                    background: "rgba(150, 150, 150, .7)",
                    color: "#fff",
                    cursor: "pointer",
                    textAlign: "center",
                    fontSize: "1.3em",
                    zIndex: 100
            }
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
            width: 40,
            top: 5,
            position: "absolute",
            background: "#fff",
            // background: "rgba(150, 150, 150, .3)",
            color: "#fff",
            cursor: "pointer",
            textAlign: "center",
            fontSize: "1.3em",
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
                };

            if (opts.btnDefault) {
                btnStyle = btnDefaultStyle;
                btnStyle.height = height - opts.titleStyle.height - opts.titleStyle.bottom - 10;
                btnStyle.lineHeight = btnStyle.height + "px";
            } else {
                btnStyle = opts.btnStyle;
                btnStyle.top = ((content.height() - btnStyle.height) / 2);
                btnStyle.lineHeight = btnStyle.height + "px"; 

            }

            for(i=0; i < 2; i++){
                var btn = create('div');
                if(i == 0){
                    // Left
                    if (!opts.btnDefault) {
                        btnStyle.left = -10;
                    } else {
                        btnStyle.left = 0;
                    }
                    btn.text("<");
                    btn.attr('id', 'slider-btn-left');
                    btn.on('click', clickLeft);
                } else {
                    // Right
                    if (!opts.btnDefault) {
                        btnStyle.right = -10;
                    } else {
                        btnStyle.right = 0;
                    }
                    btn.text(">");
                    btn.attr('id', 'slider-btn-right');
                    btn.on('click', clickRight);
                    delete btnStyle.left;
                }
                btn.css(btnStyle);

                if (opts.btnDefault){
                    btn.on('mouseover', function () {
                        $(this).css({background: "rgba(150, 150, 150, .3)", color: "rgb(3, 150, 191)"});
                    }).on('mouseout', function () {
                        $(this).css({
                            background: btnDefaultStyle.background,
                            color: btnDefaultStyle.color});
                    });
                }
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
    ul = create('ul');
    ul.css(ulCss);
    content.append(ul);

    $.each(childs, function(k, v){
        var li, divTitle, divImg, spanMarker;
        v = $(v);

        li = create('li');
        li.css(liCss);
        li.attr('id', 'slide-image-' + k).css(liCss);
        ul.append(li);


        divTitle = create('div').css(opts.titleStyle).text(resizeImage(v.find('img')).attr('title'));
        divImg = create('div').css(opts.imageStyle).append(v);

        li.append(divTitle)
            .append(divImg);

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
        var n = getIndexById($(this))
          , li = content.find('li')
          , elm = $('#slide-image-'+n);

        li.fadeOut(opts.fadeOutSpeed).removeClass(viewCurrent);
        elm.fadeIn(opts.fadeInSpeed).addClass(viewCurrent);
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