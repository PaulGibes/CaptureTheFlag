class MapLogic {
    activatePossibleMoves(fieldMap) {
        const playerLocation = fieldMap.find(map => map.active).id;

        const index = fieldMap.findIndex((map => map.active));
        const posibilities = [
            index,
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