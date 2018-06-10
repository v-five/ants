var Game = function (playfieldElement, gameConfig, stepTime) {
    var self = this;
    this.playfield = new Playfield(playfieldElement, gameConfig.playingfield);
    this.ants = gameConfig.ants.map(antConfig => { return new Ant(antConfig, self.playfield)});
    this.running = false;
    this.stepTime = stepTime;
    this.jsonResult = [gameConfig];
}

Game.prototype = {
    stop: function(){
        this.running = false;
    },

    start: function(steps, verbose){
        if(!this.running && steps > 0){
            this.running = true;
            this.run(steps, verbose);
        }
    },

    run: function (steps, verbose) {
        var self = this;
        var i = 0;
        var config = {
            "ants": [],
            "playingfield": []
        }
        this.ants.forEach(ant => {
            window.setTimeout(function(){
                ant.move(self.stepTime);
                window.setTimeout(function(){
                    config.ants = self.ants.map(ant => { return ant.getConfig(); });
                }, self.stepTime * i);
            }, self.stepTime * i++);
        });

        if(this.running === true && --steps > 0){
            window.setTimeout(function(){
                config.playingfield = self.playfield.getConfig();
                self.jsonResult.push(config);
                self.run(steps, verbose);
            }, self.stepTime * self.ants.length);
        }else{
            this.running = false;
            if(verbose){
                window.setTimeout(function(){
                    config.playingfield = self.playfield.getConfig();
                    self.jsonResult.push(config);
                    self.playfield.element.empty();
                    var strResult = JSON.stringify(self.jsonResult, function(k,v){
                        if(Array.isArray(v) && Number.isInteger(v[0])){
                            return JSON.stringify(v);
                        }
                        return v;
                     }, 2);
                    self.playfield.element.append($('<pre>').html(strResult));
                }, self.stepTime * self.ants.length + 100);
            }
        }
    }
}