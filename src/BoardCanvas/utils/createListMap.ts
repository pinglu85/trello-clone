function createListMap(lists: ListWithCards[]): ListMap {
  return lists.reduce((listMap, list) => {
    listMap[list.id] = list;
    return listMap;
  }, <ListMap>{});
}

export default createListMap;
