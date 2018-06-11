var Field = function(x, y, isActive){
    this.element = $('<div>').addClass('field');
    this.coordinates = {x: x, y: y};
    this.isActive = isActive;
    this.ants = 0;
    if(isActive){
        this.activate();
    }
}

Field.prototype = {
    activate: function(){
        this.isActive = true;
        this.element.addClass('active');
    },

    deactivate: function(){
        this.isActive = false;
        this.element.removeClass('active');
    },

    addAnt: function(orientation){
        this.ants += 1;
        this.element.addClass('ant');
        this.addOrientationClass(orientation);
    },

    removeAnt: function(orientation){
        this.ants -= 1;
        this.element.removeClass('ant');
        this.removeOrientationClass(orientation);
    },

    changeOrientation: function(oldOrientation, orientation){
        this.removeOrientationClass(oldOrientation);
        this.addOrientationClass(orientation);
    },

    addOrientationClass: function(orientation){
        switch(orientation){
            case 1:
                this.element.addClass('ant-left');
                break;
            case 2:
                this.element.addClass('ant-down');
                break;
            case 3:
                this.element.addClass('ant-right');
                break;
        }
    },

    removeOrientationClass: function(orientation){
        switch(orientation){
            case 1:
                this.element.removeClass('ant-left');
                break;
            case 2:
                this.element.removeClass('ant-down');
                break;
            case 3:
                this.element.removeClass('ant-right');
                break;
        }
    }
}