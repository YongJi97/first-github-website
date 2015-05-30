var map;

$(document).ready(function() {
 var mapOptions = {
      center: new google.maps.LatLng(40.7142700, -74.0059700),
      zoom: 2
    };
    map = new google.maps.Map(document.getElementById("map-canvas"),
        mapOptions);
               
               
$("#search").keyup(function(event){
    if(event.which == 13){
        $("#searchbar").click();
    }
        event.preventDefault();
}); 
               
               
     $("#searchbar").click(function() {
      
      var search = $("#search").val();
        $.getJSON("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=1c9f777eb7446f34a7261dc1a54be4b2&tags="+ search+ "&has_geo=1&extras=geo&format=json&jsoncallback=?",processResponse);
        
        
       });       
           
});

var markers = [];
function processResponse(data){ 
    
 for (var i=0; i<markers.length; i++){
     var currentmarker = markers[i]
     currentmarker.setMap(null);
 }
 markers=[];
 
    $.each(data.photos.photo, function(i,item){
     //var picture=  ("https://farm" + item.farm + ".staticflickr.com/" +
       //item.server + "/" + item.id + "_" + item.secret + ".jpg");
       
       
            
        //function buildlink(item){
           // return "https://farm" + item.farm + ".staticflickr.com/" +
           // item.server + "/" + item.id + "_" + item.secret + ".jpg"
       // }
   // console.log(buildlink(item));
             var LatLng= new google.maps.LatLng(item.latitude, item.longitude);
             var marker = new google.maps.Marker({ 
                position: LatLng,     
                map:map,
                title: item.title,
                animation:google.maps.Animation.DROP,
            });
              
              markers.push(marker);                     
var currentInfoWindow = null; 
var infowindow = new google.maps.InfoWindow({ 
    content: '<img src="https://farm' + item.farm + '.staticflickr.com/' +
              item.server + '/' + item.id + '_' + item.secret + '.jpg"/>' + item.title + item.animation
}); 

google.maps.event.addListener(marker, 'click', function() { 
infowindow.open(map, marker);

setTimeout(function(){
    infowindow.close();}, 5000);
}); 


          

          

//google.maps.event.addListener(marker, 'click', function() { 
//   alert(marker.title + marker.animation + window.open("https://farm" + item.farm + ".staticflickr.com/" +
//item.server + "/" + item.id + "_" + item.secret + ".jpg"))
//    });  
  
    });
}











