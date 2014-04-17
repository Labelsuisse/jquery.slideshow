jquery-slideshow
================

plugin slideshow for jQuery

## Syntax
```javascript
$('#content').slideshow([options{}]);
```

## Using
```html
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

### Or using with options
```html
<div id="slideshow">
    <a href="#"><img src="images/image1.jpg" alt="1" title="Une première image"></a>
    <a href="#"><img src="images/image2.jpg" alt="2" title="Une deuxième image"></a>
    <a href="#"><img src="images/image3.jpg" alt="3" title="Une troisième image"></a>
</div>
<script>
$(function () {
    $('#slideshow').slideshow({
            resizeImage: true, 
            containerStyle : {
                height: 400,
                width: 800
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
            },
            btnStyleLeft: {left: -10},
            btnStyleRight: {right: -10}
        });
});
</script>
```

## Options
```javascript
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

## Screenshot
![Screenshot](/screenshot.png "Screenshot")

## Authors
[Labelsuisse](https://github.com/Labelsuisse)

### Versions

    0.2.1 : bugfix in resize image
    0.2.0 : ability to create his style of button.
    0.1.1 : Change style.
    0.1.0 : Start app.