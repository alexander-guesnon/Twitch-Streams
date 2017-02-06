var streamer_list = [{
        "twitch_name": "freecodecamp",
        "url": "https://www.twitch.tv/freecodecamp",
        "logo": "",
        "title": "",
        "game":"",
        "description": "",
        "is_streaming": false
    },
    {
        "twitch_name": "annemunition",
        "url": "https://www.twitch.tv/annemunition",
        "logo": "",
        "title": "",
        "game":"",
        "description": "",
        "is_streaming": false
    },
    {
        "twitch_name": "monstercat",
        "url": "https://www.twitch.tv/monstercat",
        "logo": "",
        "title": "",
        "game":"",
        "description": "",
        "is_streaming": false
    },
    {
        "twitch_name": "bobross",
        "url": "https://www.twitch.tv/bobross",
        "logo": "",
        "title": "",
        "game":"",
        "description": "",
        "is_streaming": false
    },
    {
        "twitch_name": "witwix",
        "url": "https://www.twitch.tv/witwix",
        "logo": "",
        "title": "",
        "game":"",
        "description": "",
        "is_streaming": false
    },
    {
        "twitch_name": "livewithjazza",
        "url": "https://www.twitch.tv/livewithjazza",
        "logo": "",
        "title": "",
        "game":"",
        "description": "",
        "is_streaming": false
    },
    {
        "twitch_name": "a_seagull",
        "url": "https://www.twitch.tv/a_seagull",
        "logo": "",
        "title": "",
        "game":"",
        "description": "",
        "is_streaming": false
    },
    {
        "twitch_name": "moonmoon_ow",
        "url": "https://www.twitch.tv/moonmoon_ow",
        "logo": "",
        "title": "",
        "game":"",
        "description": "",
        "is_streaming": false
    },
    {
        "twitch_name": "handmade_hero",
        "url": "https://www.twitch.tv/handmade_hero",
        "logo": "",
        "title": "",
        "game":"",
        "description": "",
        "is_streaming": false
    },
    {
        "twitch_name": "notch",
        "url": "https://www.twitch.tv/notch",
        "logo": "",
        "title": "",
        "game":"",
        "description": "",
        "is_streaming": false
    },
    {
        "twitch_name": "linustech",
        "url": "https://www.twitch.tv/linustech",
        "logo": "",
        "title": "",
        "game":"",
        "description": "",
        "is_streaming": false
    }
];

$(document).ready(function() {
    get_if_streaming();
    get_channel_status();
    setTimeout(function(){
    print_to_screen();}, 500);

});

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
        streamer_list[current].title = data.display_name ;
        streamer_list[current].game =  data.game;
        streamer_list[current].description = data.status;

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

function print_to_screen() {

for (var i = 0; i < streamer_list.length; i++) {
  console.log(streamer_list[i]);
  if (streamer_list[i].is_streaming === true&& i ===0 ) {
      $(".twitch-streamers").html("<div class=\"streamer-container-online\"><a href=\"" + streamer_list[i].url + "\" target=\"blank_\" ><img src=\"" + streamer_list[i].logo + "\" class=\"streamer-icon\"><div class=\"streamer-title\">" + charLimiter(streamer_list[i].title+" Is Streaming Currently "+streamer_list[i].game )+ "</div><div class=\"streamer-description\">" + streamer_list[i].description + "</div></a></div>");
  }else if(streamer_list[i].is_streaming === false&& i ===0 ) {
    $(".twitch-streamers").html("<div class=\"streamer-container-offline\"><a href=\"" + streamer_list[i].url + "\" target=\"blank_\" ><img src=\"" + streamer_list[i].logo + "\" class=\"streamer-icon\"><div class=\"streamer-title\">" + charLimiter( streamer_list[i].title+" Is Currently Offline") +  "</div><div class=\"streamer-description\">" + streamer_list[i].description + "</div></a></div>");
  }
  if (streamer_list[i].is_streaming === true&& i !==0) {
      $(".twitch-streamers").append("<div class=\"streamer-container-online\"><a href=\"" + streamer_list[i].url + "\" target=\"blank_\" ><img src=\"" + streamer_list[i].logo + "\" class=\"streamer-icon\"><div class=\"streamer-title\">" + charLimiter( streamer_list[i].title +" Is Streaming Currently "+streamer_list[i].game )+ "</div><div class=\"streamer-description\">" + streamer_list[i].description + "</div></a></div>");
  }else if(streamer_list[i].is_streaming === false&& i !==0 ) {
    $(".twitch-streamers").append("<div class=\"streamer-container-offline\"><a href=\"" + streamer_list[i].url + "\" target=\"blank_\" ><img src=\"" + streamer_list[i].logo + "\" class=\"streamer-icon\"><div class=\"streamer-title\">" + charLimiter( streamer_list[i].title+" Is Currently Offline") +  "</div><div class=\"streamer-description\">" + streamer_list[i].description + "</div></a></div>");
  }
}

}


function charLimiter(stringData){
  var limit=56;
if(stringData.length > limit){
  var temp = stringData.substring(0,limit);
 temp =temp.substring(0,temp.lastIndexOf(" ") - 1) +" ...";
 return temp;
}
return stringData;
}
