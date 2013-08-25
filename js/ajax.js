function PhoneListCtrl($scope, $http) {
    var sourceList;
    $http.get('js/data/sourcelist.json').success(function(data) {
        sourceList = data.sourceList;
    });
    $http.get('js/data/channelList.json').success(function(data) {
       $scope.channels = data.channel_list;
        for( i=0;i<sourceList.length;i++)       {
            var matches = $.grep($scope.channels, function(e) {
                return e.channelName == sourceList[i].channelName;
            });
            if(!matches[0].sources){matches[0].sources=[]}
            matches[0].sources.push(sourceList[i]);
        }
        console.log( $scope.channels);
        setTimeout(addSideNavigationEvents,1000);
    });


}

function ArticleListCtrl($scope, $http) {
    var sourceList;
    $http.get('js/data/article.json').success(function(data) {
        $scope.articles = data.articleList;
    });
    setTimeout(addMosaicEvents,1000);

}


function addMosaicEvents(){
    $('.stars').raty();
    $('.bar').mosaic({
        animation: 'slide'
    });
    $(".mosaic-block").click(function(e) {
        $(".container-fluid").css("padding","0px");
        $(".mosaic-block").hide();
        $("#articleContent").fadeIn('fast');

        $("#articleContent #artContent").html($(this).find(".articleContent").html().replace("</p>","").replace("<p>",""));
        $("#articleContent #artTitle").html($(this).find(".articleTitle").html());
    });

}
