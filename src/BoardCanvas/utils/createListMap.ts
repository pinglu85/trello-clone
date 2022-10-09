import type { List } from '../../generated/graphql';
import type { ListMap } from '../../contexts/BoardCanvasContext';

function createListMap(lists: List[]): ListMap {
  return lists.reduce((listMap, list) => {
    listMap[list.id] = list;
    return listMap;
  }, <ListMap>{});
}

export default createListMap;
