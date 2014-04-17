jquery.slideshow
================

plugin slideshow for jQuery

Syntax:
```
$('#content').slideshow([options{}]);
```

Using:
```
<div id="slideshow">
    <a href="#"><img src="images/image1.jpg" alt="1" title="Une première image"></a>
    <a href="#"><img src="images/image2.jpg" alt="2" title="Une deuxième image"></a>
    <a href="#"><img src="images/image3.jpg" alt="3" title="Une troisième image"></a>
</div>
<script>
    $(function () {
        $('#slideshow').slideshow();
    });
</script>
```

Default options:
```
{
    markerCurrentBgColor: 'rgb(3, 106, 191)',
    resizeImage : false,
    transitionAuto: 3000,
    fadeOutSpeed: 'slow',
    fadeInSpeed: 'slow',
    btnDefault: false,
    containerStyle : {
        position: "relative",
        border: "3px solid #F2F2F2"
    },

    titleStyle : {
        position: 'absolute',
        textAlign: 'center',
        color: '#fff',
        background: 'rgba(0, 0, 0, .3)',
        bottom: 10,
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
        bottom: 7,
        zIndex: 10,
    },

    pointStyle : {
        display: 'inline-block',
        margin: '0px 1px',
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
```

Screenshot:
![Screenshot](/screenshot.png "Screenshot")

enjoy!!!

Versions:
0.2.0 : ability to create his style of button.
0.1.1 : Change style.
0.1.0 : Start app.