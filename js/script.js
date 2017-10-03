$(function(){
    //Electron UI
    var shell = require('shell');

    //Begin Fetch
    var ul = $('.flipster ul');

	//RSS Delivered is from webcomic Kill Six Billion Demons.
	//Content is discretionary, but alternative sites (Balto, BBC, HelloInternet.fm) were taking too long to load
    $.get('https://killsixbilliondemons.com/feed/', function(response){

        var rss = $(response);

        //Find all entries in feed

        rss.find('item').each(function(){
            var item = $(this);
            
            var content = item.find('encoded').html().split('</a></div>')[0]+'</a></div>';
            var urlRegex = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/g;

            //Obtain first obtainable image, when available
            var imageSource = content.match(urlRegex)[1];

            // LI each entry, then append to UL
            var li = $('<li><img /><a target="_blank"></a></li>');
            li.find('a')
                .attr('href', item.find('link').text())
                .text(item.find("title").text());
            li.find('img').attr('src', imageSource);
            li.appendTo(ul);
        });

        //Flipster Init
        $('.flipster').flipster({
            style: 'carousel'
        });

        //Open clicked article in default browser
        $('.flipster').on('click', 'a', function (e) {
            e.preventDefault();
            shell.openExternal(e.target.href);
        });
    });
});