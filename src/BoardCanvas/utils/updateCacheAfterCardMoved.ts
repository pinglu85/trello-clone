import type {
  ApolloCache,
  DefaultContext,
  MutationUpdaterFunction,
} from '@apollo/client';

import getListCacheId from '../../utils/getListCacheId';
import {
  readCardsFromCache,
  writeCardsToCache,
} from '../../utils/readWriteCardsInCache';
import findInsertPositionByRank from '../../utils/findInsertPositionByRank';
import type {
  MoveCardMutation,
  MoveCardMutationVariables,
} from '../../generated/graphql';

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
  const cardsInOldList = readCardsFromCache(cache, oldListCacheId);
  if (!cardsInOldList) return;

  const newCardsForOldList = cardsInOldList.filter(
    ({ id }) => id !== movedCard.id
  );

  if (oldListId === currListId) {
    const insertPosition = findInsertPositionByRank(
      newCardsForOldList,
      movedCard.rank
    );
    newCardsForOldList.splice(insertPosition, 0, movedCard);
    writeCardsToCache(cache, oldListCacheId, newCardsForOldList);
    return;
  }

  const currListCacheId = getListCacheId(currListId);
  const cardsInCurrList = readCardsFromCache(cache, currListCacheId);
  if (!cardsInCurrList) return;

  const newCardsForCurrList = [...cardsInCurrList];
  const insertPosition = findInsertPositionByRank(
    newCardsForCurrList,
    movedCard.rank
  );
  newCardsForCurrList.splice(insertPosition, 0, movedCard);

  writeCardsToCache(cache, oldListCacheId, newCardsForOldList);
  writeCardsToCache(cache, currListCacheId, newCardsForCurrList);
};

export default updateCacheAfterCardMoved;
