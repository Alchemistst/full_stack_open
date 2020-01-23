const unpopulate = (property) => {
        if(Array.isArray(property)){
            return property.map( p => p.id)
        }
        return property.id
}

module.exports = unpopulate