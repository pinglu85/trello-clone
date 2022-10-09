const LIST_GQL_TYPENAME = 'List';

function getListCacheId(listId: number): string {
  return `${LIST_GQL_TYPENAME}:${listId}`;
}

export default getListCacheId;
