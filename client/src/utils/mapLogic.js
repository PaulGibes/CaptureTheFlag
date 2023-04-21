class MapLogic {
    activatePossibleMoves(fieldMap) {
        const index = fieldMap.findIndex((map => map.active));

        const posibilities = [
            index+1,
            index-1,
            index-13,
            index-12,
            index-11,
            index+11,
            index+12,
            index+13
        ];

        posibilities.forEach(item =>{
            if(!(item < 0 || item > 59)){
                fieldMap[item].active = true;
            }
        })

        return fieldMap;
    }
}

export default new MapLogic();