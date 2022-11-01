import type {
  ApolloCache,
  DefaultContext,
  MutationUpdaterFunction,
} from '@apollo/client';

import { getListCacheId } from '../utils/getCacheId';
import {
  readListCardsFromCache,
  writeListCardsToCache,
} from '../utils/readWriteListCardsInCache';
import findOrderableInsertPosition from '../utils/findOrderableInsertPosition';
import type {
  MoveCardMutation,
  MoveCardMutationVariables,
} from '../generated/graphql';

const updateCacheAfterCardMoved: MutationUpdaterFunction<
  MoveCardMutation,
  MoveCardMutationVariables,
  DefaultContext,
  ApolloCache<unknown>
> = (cache, { data }) => {
  if (!data) return;

  const { oldListId, card: movedCard } = data.moveCard;
  const currListId = movedCard.listId;
  const oldListCacheId = getListCacheId(oldListId);
  const cardsInOldList = readListCardsFromCache(cache, oldListCacheId);
  if (!cardsInOldList) return;

  const newCardsForOldList = cardsInOldList.filter(
    ({ id }) => id !== movedCard.id
  );

  if (oldListId === currListId) {
    const insertPosition = findOrderableInsertPosition(
      newCardsForOldList,
      movedCard.rank
    );
    newCardsForOldList.splice(insertPosition, 0, movedCard);
    writeListCardsToCache(cache, oldListCacheId, newCardsForOldList);
    return;
  }

  const currListCacheId = getListCacheId(currListId);
  const cardsInCurrList = readListCardsFromCache(cache, currListCacheId);
  if (!cardsInCurrList) return;

  const newCardsForCurrList = [...cardsInCurrList];
  const insertPosition = findOrderableInsertPosition(
    newCardsForCurrList,
    movedCard.rank
  );
  newCardsForCurrList.splice(insertPosition, 0, movedCard);

  writeListCardsToCache(cache, oldListCacheId, newCardsForOldList);
  writeListCardsToCache(cache, currListCacheId, newCardsForCurrList);
};

export default updateCacheAfterCardMoved;
