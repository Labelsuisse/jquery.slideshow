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
    <ul>
        <li><a href=""><img src="" alt=""></a></li>
        <li><a href=""><img src="" alt=""></a></li>
        <li><a href=""><img src="" alt=""></a></li>
    </ul>
</div>
<script>
    $(function () {
        $('#slideshow').slideshow();
    });
</script>
```

Default options:
```
markerCurrentBgColor: 'rgb(3, 106, 191)',
            resizeImage : false,
            contentCss : {
                position: "relative",
                border: "3px solid #F2F2F2"
            },

            titleCss : {
                position: 'absolute',
                textAlign: 'center',
                color: '#fff',
                background: 'rgba(0, 0, 0, .3)',
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
```

Screenshot:
![Screenshot](https://github.com/Labelsuisse/jquery.slideshow/blob/master/screenshot.png "Screenshot")

enjoy!!!