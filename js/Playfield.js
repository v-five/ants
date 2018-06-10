var Playfield = function(element, map){
    this.element = element;
    this.rows = [];
    this.init(map);
}

Playfield.prototype = {
    init: function (map) {
        var i = 0;
        this.push(map.map(mapRow => { return new Row(mapRow, i++); }));
    },

    push: function(rows){
        rows = Array.isArray(rows) ? rows : [rows];
        this.rows = this.rows.concat(rows);
        if(rows.length === 1 && rows[0].position < 0){
            this.element.prepend(rows.map(row => { return row.element; }));
        }else{
            this.element.append(rows.map(row => { return row.element; }));
        }
    },

    getField: function(position){
        var row = this.rows.find(row => { return row.position === position.y});
        if(row === undefined){
            var mapRow = new Array(this.getNumberOfColumns()).fill(0);
            row = new Row(mapRow, position.y, this.getFirstFieldIndex());
            this.push(row);
        }
        var field = row.getField(position);
        if(field === undefined){
            this.rows.forEach(r => {
                r.push(new Field(position.x, r.position, false));
            });
        }

        return row.getField(position);
    },

    getFirstFieldIndex: function(){
        return Math.min(...this.rows[0].fields.map(field => { return field.coordinates.x; }));
    },

    getNumberOfColumns: function(){
        return this.rows[0].fields.length;
    },

    getConfig: function(){
        var self = this;
        return self.rows.sort(function(a, b){
            return a.position > b.position ? 1 : (a.position < b.position ? -1 : 0);
        }).map(row => {
            return row.fields.sort(function(a, b){
                return a.coordinates.x > b.coordinates.x ? 1 : (a.coordinates.x < b.coordinates.x ? -1 : 0);
            }).map(field => { return field.isActive ? 1 : 0; });
        });
    }
}