(function () {
    var playfield = $("#playfield");
    $('#start').on('click', function(){
        var configFile = $('#config-file').val() + ".json";
        $.getJSON("config/" + configFile, startNewGame)
        .fail(function(){ alert("Configuration with this name not found!"); });
    });

    $('#verbose').on('click', function(){
        var configFile = $('#config-file').val() + ".json";
        $.getJSON("config/" + configFile, function(gameConfig){
            playfield.empty();
            var game = new Game(playfield, gameConfig, 0);
            var steps = $('#game-steps').val();
            game.start(steps, true);
        }).fail(function(){
            alert("Configuration with this name not found!");
        });
    });

    var startNewGame = function(gameConfig){
        playfield.empty();
        var game = new Game(playfield, gameConfig, 500);
        var steps = $('#game-steps').val();
        game.start(steps);
        $('#stop').on('click', function(){
            game.stop();
        });
        $('#next').on('click', function(){
            game.run(1);
        });
    }
})();