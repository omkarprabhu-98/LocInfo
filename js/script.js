

$(function() {

var city ;
var street;

$('.form-container').submit(function(){

    // get details from input form
    street = $('#street').val();
    city = $('#city').val();

    setTimeout(
        function() {

        },
        5000);

    // remove onSite load page
    $('.main').remove();

    // display result page
    $('.load').css('display','block');
    $('body').css('overflow','scroll');

    // load data
    loadData(city,street)
});




});


function loadData(city,  street) {

    // call paralax method

    $('.parallax').parallax();



    // ajax request to wikipedia

    $.ajax({

            url: "http://en.wikipedia.org/w/api.php?action=opensearch&search=" + city + "&format=json&callback=wikiCallback",
            dataType:"jsonp",

            success: function (response) {

                var articleList = response[1];
                for(var i = 0; i < articleList.length; i++)
                {
                    var articleStr = articleList[i];
                    var url = 'http://en.wikipedia.org/wiki/' + articleStr;
                    $('.collection').append('<a href="' + url + '" class="collection-item">' + articleStr + '</a>');
                }

            }

        }

    );

    // address for google maps search
    var citySplit;
    var streetSplit;
    var src = "//www.google.com/maps/embed/v1/place?q=";
    citySplit = city.split(" ");
    streetSplit = street.split(" ");


    for(var i = 0; i < streetSplit.length; i++)
    {
        if(i !== streetSplit.length - 1)
        {
            src += streetSplit[i] + "+";

        }
        else{
            src += streetSplit[i];
        }
    }

    for(var i = 0; i < citySplit.length; i++)
    {
        if(i !== citySplit.length - 1)
        {
            src += citySplit[i] + "+";

        }
        else{
            src += citySplit[i];
        }
    }

    src += "&zoom=13&attribution_source=Google+Maps+Embed+API&attribution_web_url=https://developers.google.com/maps/documentation/embed/&key=AIzaSyCkFD7EPHNKPJpPRawEsLOHZXkd2u04y_k";


    // load src to google maps api
    $('iframe').attr('src',src);


    return false;
}
