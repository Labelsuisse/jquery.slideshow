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

Options:
```
{
    /* Style for button */
    btnStyle: {},
    btnStyleLeft: {},
    btnStyleRight: {},

    /* Style for container of images */
    containerStyle : {},

    /* Transition */
    fadeOutSpeed: 'slow',
    fadeInSpeed: 'slow',

    /* Style for container image */
    imageStyle : {},

    /* Style for container marker */
    markerStyle : {},

    /* Background color marker for current image */
    markerCurrentBgColor: 'rgb(3, 150, 191)',

    /* Style for marker point */
    pointStyle : {},

    /* Style for container title */
    titleStyle : {},

    /* Duration of transition for Start auto */
    transitionAuto: 3000,

    /* Automatic resize images adaptable of content */
    resizeImage : false
}
```

Screenshot:
![Screenshot](/screenshot.png "Screenshot")

enjoy!!!

Versions:
0.2.0 : ability to create his style of button.
0.1.1 : Change style.
0.1.0 : Start app.