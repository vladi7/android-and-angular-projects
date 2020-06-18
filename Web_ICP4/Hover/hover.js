    function upDate(previewPic) {
        /* In this function you should
           1) change the url for the background image of the div with the id = "image"
           to the source file of the preview image

           2) Change the text  of the div with the id = "image"
           to the alt text of the preview image
           */
    //get the link of the image and set the main image url to it using css.
        var link = $(previewPic).attr("src");
        $("#image").css("background-image", "url("+link+")");
    //set the text of alt to the text of the image
        var text = $(previewPic).attr("alt");
        $("#image").text(text);
    }

    function unDo() {
        /* In this function you should
       1) Update the url for the background image of the div with the id = "image"
       back to the orginal-image.  You can use the css code to see what that original URL was

       2) Change the text  of the div with the id = "image"
       back to the original text.  You can use the html code to see what that original text was
       */
        //set the url to the default one
        $("#image").css("background-image", "url('')");
        //set the text of the main image to the default one
        var text = "Hover over an image below to display here";
        $("#image").text(text);
    }
