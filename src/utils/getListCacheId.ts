const LIST_GQL_TYPENAME = 'List';

function getListCacheId(listId: string): string {
  return `${LIST_GQL_TYPENAME}:${listId}`;
}

export default getListCacheId;
