var Ant = function(antConfig, playfield){
    this.orientation = antConfig.orientation;
    this.coordinates = { x: antConfig.x, y: antConfig.y };
    this.playfield = playfield;
    this.field = this.playfield.getField(this.coordinates);
    this.field.addAnt(this.orientation);
}

Ant.prototype = {
    move: function(stepTime){
        var self = this;
        self.changeOrientation();

        window.setTimeout(function(){
            self.toggleField();
        }, stepTime / 2);

        window.setTimeout(function(){
            self.field.removeAnt(self.orientation);
            self.setNewCoordinates();
            self.field = self.playfield.getField(self.coordinates);
            self.field.addAnt(self.orientation);
        }, stepTime / 2);
    },

    changeOrientation: function(){
        var newOrientation = this.field.isActive ?
                (this.orientation === 0 ? 3 : this.orientation - 1) :
                (this.orientation === 3 ? 0 : this.orientation + 1);

        this.field.changeOrientation(this.orientation, newOrientation);
        this.orientation = newOrientation;
    },

    setNewCoordinates: function(){
        switch(this.orientation){
            case 0:
                this.coordinates.y -= 1;
                break;
            case 1:
                this.coordinates.x += 1;
                break;
            case 2:
                this.coordinates.y += 1;
                break;
            case 3:
                this.coordinates.x -= 1;
                break;
        }
    },

    toggleField: function(){
        if(this.field.ants === 1){
            if(this.field.isActive){
                this.field.deactivate();
            }else{
                this.field.activate();
            }
        }
    },

    getConfig: function(){
        return {
            "x": this.coordinates.x,
            "y": this.coordinates.y,
            "orientation": this.orientation
        };
    }
}