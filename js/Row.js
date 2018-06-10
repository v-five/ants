var Row = function(row, i, fieldIndex){
    this.element = $('<div>').addClass('row');
    this.position = i;
    this.fields = [];
    this.init(row, fieldIndex || 0);
}

Row.prototype = {
    init: function(row, fieldIndex){
        var position = this.position;
        this.push(row.map(mapField => {
            return new Field(fieldIndex++, position, mapField === 1)
        }));
    },

    push: function(fields){
        fields = Array.isArray(fields) ? fields : [fields];
        this.fields = this.fields.concat(fields);
        this.element.append(fields.map(field => { return field.element; }));
        if(fields.length === 1 && fields[0].coordinates.x < 0){
            this.element.prepend(fields.map(field => { return field.element; }));
        }else{
            this.element.append(fields.map(field => { return field.element; }));
        }
    },
    
    getField: function(position){
        return this.fields.find(field => { return field.coordinates.x === position.x});
    }
}