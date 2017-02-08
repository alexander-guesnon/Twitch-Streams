var streamer_list = [{
        "twitch_name": "freecodecamp",
        "url": "https://www.twitch.tv/freecodecamp",
        "logo": "",
        "title": "",
        "game": "",
        "description": "",
        "is_streaming": false,
        "has_updated": false
    },
    {
        "twitch_name": "annemunition",
        "url": "https://www.twitch.tv/annemunition",
        "logo": "",
        "title": "",
        "game": "",
        "description": "",
        "is_streaming": false,
        "has_updated": false
    },
    {
        "twitch_name": "monstercat",
        "url": "https://www.twitch.tv/monstercat",
        "logo": "",
        "title": "",
        "game": "",
        "description": "",
        "is_streaming": false,
        "has_updated": false
    },
    {
        "twitch_name": "bobross",
        "url": "https://www.twitch.tv/bobross",
        "logo": "",
        "title": "",
        "game": "",
        "description": "",
        "is_streaming": false,
        "has_updated": false
    },
    {
        "twitch_name": "witwix",
        "url": "https://www.twitch.tv/witwix",
        "logo": "",
        "title": "",
        "game": "",
        "description": "",
        "is_streaming": false,
        "has_updated": false
    },
    {
        "twitch_name": "livewithjazza",
        "url": "https://www.twitch.tv/livewithjazza",
        "logo": "",
        "title": "",
        "game": "",
        "description": "",
        "is_streaming": false,
        "has_updated": false
    },
    {
        "twitch_name": "a_seagull",
        "url": "https://www.twitch.tv/a_seagull",
        "logo": "",
        "title": "",
        "game": "",
        "description": "",
        "is_streaming": false,
        "has_updated": false
    },
    {
        "twitch_name": "moonmoon_ow",
        "url": "https://www.twitch.tv/moonmoon_ow",
        "logo": "",
        "title": "",
        "game": "",
        "description": "",
        "is_streaming": false,
        "has_updated": false
    },
    {
        "twitch_name": "handmade_hero",
        "url": "https://www.twitch.tv/handmade_hero",
        "logo": "",
        "title": "",
        "game": "",
        "description": "",
        "is_streaming": false,
        "has_updated": false
    },
    {
        "twitch_name": "notch",
        "url": "https://www.twitch.tv/notch",
        "logo": "",
        "title": "",
        "game": "",
        "description": "",
        "is_streaming": false,
        "has_updated": false
    },
    {
        "twitch_name": "linustech",
        "url": "https://www.twitch.tv/linustech",
        "logo": "",
        "title": "",
        "game": "",
        "description": "",
        "is_streaming": false,
        "has_updated": false
    }
];

$(document).ready(function() {
    constructJSON();
    get_if_streaming();
    get_channel_status();
    wait_for_connection();
    $(".All-streams").click(function(){
      $(".streamer-container-online , .streamer-container-offline").css("display","inline-block");
    });
    $(".Online-stream").click(function(){
      $(".streamer-container-online").css("display","inline-block");
        $(".streamer-container-offline").css("display","none");
    });
    $(".Offline-stream").click(function(){
        $(".streamer-container-offline").css("display","inline-block");
      $(".streamer-container-online").css("display","none");
    });

});
function constructJSON() {
//dynamicly construct a json so it is easer to put in data
}
function api_call(current) {

    $.getJSON("https://wind-bow.gomix.me/twitch-api/streams/" + streamer_list[current].twitch_name + "/?callback=?", function(data) {
        if (data.stream !== null) {
            streamer_list[current].is_streaming = true;
        } else {
            streamer_list[current].is_streaming = false;
        }
    });


}

function api_call_2(current) {

    $.getJSON("https://wind-bow.gomix.me/twitch-api/channels/" + streamer_list[current].twitch_name + "/?callback=?", function(data) {
        streamer_list[current].logo = data.logo;
        streamer_list[current].title = data.display_name;
        streamer_list[current].game = data.game;
        streamer_list[current].description = data.status;
        streamer_list[current].has_updated = true; //this will alert the print screen function if the api calls are done
    });


}

function get_if_streaming() {
    for (var i = 0; i < streamer_list.length; i++) { //wind-bow does not suport multiple querys
        api_call(i);
    }
}

function get_channel_status() {
    for (var i = 0; i < streamer_list.length; i++) { //wind-bow does not suport multiple querys
        api_call_2(i);
    }
}

/*this simple wait function is for verfying the integrity of all the data to make sure it has been sucssfully written two (tail recurtion?)*/
/*
// im on a stable internet conection
first load takes 301-1190 ms(on 50kbs 1968ms) to load
after refresh it takes 72-200ms(on 50kbs 1968ms) to get data
*/
function wait_for_connection() {
  var isloopbroken=false;
  for(var i = 0; i < streamer_list.length; i++){
    if(streamer_list[i].has_updated === false){
  isloopbroken=true;
      break;
    }
  }
  if(isloopbroken===true){
  setTimeout(function() {wait_for_connection();}, 500);
}else{
              print_to_screen();
}


}


function print_to_screen() {

    for (var i = 0; i < streamer_list.length; i++) {

        if (streamer_list[i].is_streaming === true && i === 0) {
            $(".twitch-streamers").html("<div class=\"streamer-container-online\"><a href=\"" + streamer_list[i].url + "\" target=\"blank_\" ><img src=\"" + streamer_list[i].logo + "\" class=\"streamer-icon\"><div class=\"streamer-title\">" + streamer_list[i].title + "</div><div class=\"streamer-description\">" + charLimiter("[Is Currently Streaming: " + streamer_list[i].game +"] " + streamer_list[i].description) + "</div></a></div>");
        } else if (streamer_list[i].is_streaming === false && i === 0) {
            $(".twitch-streamers").html("<div class=\"streamer-container-offline\"><a href=\"" + streamer_list[i].url + "\" target=\"blank_\" ><img src=\"" + streamer_list[i].logo + "\" class=\"streamer-icon\"><div class=\"streamer-title\">" + streamer_list[i].title + "</div><div class=\"streamer-description\">" + charLimiter("[Is Currently Offline] " + streamer_list[i].description) + "</div></a></div>");
        }
        if (streamer_list[i].is_streaming === true && i !== 0) {
            $(".twitch-streamers").append("<div class=\"streamer-container-online\"><a href=\"" + streamer_list[i].url + "\" target=\"blank_\" ><img src=\"" + streamer_list[i].logo + "\" class=\"streamer-icon\"><div class=\"streamer-title\">" + streamer_list[i].title  + "</div><div class=\"streamer-description\">" + charLimiter("[Is Currently Streaming: " + streamer_list[i].game +"] " + streamer_list[i].description)+ "</div></a></div>");
        } else if (streamer_list[i].is_streaming === false && i !== 0) {
            $(".twitch-streamers").append("<div class=\"streamer-container-offline\"><a href=\"" + streamer_list[i].url + "\" target=\"blank_\" ><img src=\"" + streamer_list[i].logo + "\" class=\"streamer-icon\"><div class=\"streamer-title\">" + streamer_list[i].title + "</div><div class=\"streamer-description\">" + charLimiter("[Is Currently Offline] " + streamer_list[i].description) + "</div></a></div>");
        }
    }

}


function charLimiter(stringData) {
    var limit = 173;
    if (stringData.length > limit) {
        var temp = stringData.substring(0, limit);
        temp = temp.substring(0, temp.lastIndexOf(" ") - 1) + " ...";
        return temp;
    }
    return stringData;
}
