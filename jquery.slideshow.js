(function ($){

function myslider(opts){

    var defaults = {
            markerCurrentColor: '#085f3f',
            contentCss : {
                position: "relative",
                border: "3px solid #F2F2F2" //o
            },

            titleCss : {
                position: 'absolute',
                textAlign: 'center',
                color: '#fff',
                backgroundColor: 'rgba(0, 0, 0, .3)',
                bottom: 10,
                height: 30,
                width: '100%'
            },

            imageCss : {
                textAlign: 'center',
                color: '#fff',
                // fontSize: 14
            },

            markerCss : {
                position: "absolute",
                right: 5,
                bottom: 7,
                zIndex: 10,
            },

            pointCss : {
                display: 'inline-block',
                margin: '0px 1px',
                borderRadius: 5,
                height: 10,
                width: 10,
                background: '#fff',
                cursor: 'pointer'
            },

            btnCss : {
                    width: 30,
                    height: 20,
                    position: "absolute",
                    background: "rgba(150, 150, 150, .7)",
                    color: "#fff",
                    cursor: "pointer",
                    textAlign: "center",
                    zIndex: 100
            }
        }
      , ulCss = {
            padding: 0, 
            margin: 0,
            listStyle: 'none'
        }
      , liCss = {
            background: '#fff',
            position: 'absolute',
            width: 532
      }
      , content = $(this)
      , width = content.width()
      , viewCurrent = 'view-current'
      , markerCurrent = 'marker-current'
      , timer
      , marker;

    opts = $.extend(defaults, opts);

    
    function create (elem) {
        return $(document.createElement(elem));
    }

    function getIndexById(_elm){
        return _elm.attr('id')[_elm.attr('id').length -1];
    }

    function setClass(i){
        var spans = marker.find('span')
          , current;
        spans.css('background', opts.pointCss.background);
        if(i){
            current = $('#marker-point-' + i);
        }else{
            current = spans.first();
        }
        current.css('background', opts.markerCurrentColor);
    }

    /* create Marker */
    marker = create('div').css(opts.markerCss);
    content.append(marker);

    /**** Style CSS ****/
    /* Content */
    content.css(opts.contentCss);

    /*** END CSS ***/
    // Mise en forme des elements
    content.find('ul').css(ulCss);
    $.each(content.find('li'), function(k, v){
        var v = $(v).attr({'id':'slide-image-' + k}).css(liCss);

        var divTitle = create('div').css(opts.titleCss).text(v.find('img').attr('title'));
        var divImg = create('div').css(opts.imageCss);

        v.append(divTitle)
            .append(divImg.append(v.find('a')));

        var spanMarker = create('span').css(opts.pointCss).attr('id', "marker-point-" + k);

        if( k == 0 ){
            spanMarker.css('background', opts.markerCurrentColor);
            v.addClass(viewCurrent);
        } else {
            v.css({'display': 'none'});
        }

        marker.append(spanMarker);

    });
    var createBtn = function(){
        var i
          , clickLeft = function() {
                var current = $('.view-current').prev();
                var li = content.find('ul').find('li');
                clearInterval(timer);
                li.fadeOut().removeClass(viewCurrent);
                if( current.length == 0 ){
                    current = li.last();
                }
                current.fadeIn().addClass(viewCurrent);
                setClass(getIndexById(current));
            }
          , clickRight = function () {
                var current = $('.view-current').next();
                var li = content.find('ul').find('li');
                clearInterval(timer);
                li.fadeOut().removeClass(viewCurrent);
                if( current.length == 0 ){
                    current = li.first();
                }
                current.fadeIn().addClass(viewCurrent);
                setClass(getIndexById(current));
            };

        opts.btnCss.top = ((content.height() - opts.btnCss.height) / 2);

        for(i=0; i < 2; i++){
            var btn = create('div');
            if(i == 0){
                // Left
                opts.btnCss.left = -10;
                btn.text("<");
                btn.attr('id', 'slider-btn-left');
                btn.on('click', clickLeft);
            } else {
                // Right
                opts.btnCss.right = -10;
                btn.text(">");
                btn.attr('id', 'slider-btn-right');
                btn.on('click', clickRight);
                delete opts.btnCss.left;
            }
            btn.css(opts.btnCss);
            content.append(btn);
        }

    }();

    marker.find('span').on('click', function(){
        var n = getIndexById($(this));
        var li = content.find('ul').find('li');
        var elm = $('#slide-image-'+n);
        li.fadeOut().removeClass(viewCurrent);
        elm.fadeIn().addClass(viewCurrent);
        setClass(n);
        clearInterval(timer);
    });

    // Slide automatique
    timer = setInterval(function(){
        var li = content.find('ul').find('li');
        var current = $('.view-current');
        li.fadeOut().removeClass(viewCurrent);

        if(current.next().length == 0){
            current = li.eq(0).fadeIn().addClass(viewCurrent);
        }else{
            current = current.next().fadeIn().addClass(viewCurrent);
        }
        var n = getIndexById(current);
        setClass(n);
    
    }, 3000)
    
}

$.fn.sslide = myslider;
})(window.jQuery);