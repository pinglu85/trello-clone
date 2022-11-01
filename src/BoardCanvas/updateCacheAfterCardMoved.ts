import type {
  ApolloCache,
  DefaultContext,
  MutationUpdaterFunction,
  Reference,
} from '@apollo/client';

import { getListCacheId } from '../utils/getCacheId';
import removeRef from '../utils/removeRef';
import findOrderableRefInsertPosition from '../utils/findOrderableRefInsertPosition';
import insertRef from '../utils/insertRef';
import type {
  MoveCardMutation,
  MoveCardMutationVariables,
} from '../generated/graphql';

const updateCacheAfterCardMoved: MutationUpdaterFunction<
  MoveCardMutation,
  MoveCardMutationVariables,
  DefaultContext,
  ApolloCache<unknown>
> = (cache, { data }, { variables }) => {
  if (!data || !variables) return;

  const { id, rank } = data.moveCard;
  const { sourceListId, destinationListId } = variables;
  const sourceListCacheId = getListCacheId(sourceListId);

  if (sourceListId === destinationListId) {
    cache.modify({
      id: sourceListCacheId,
      fields: {
        cards(existingCardRefs: Reference[], { readField }) {
          const [newCardRefs, removedCardRef] = removeRef(
            existingCardRefs,
            id,
            readField
          );

          if (!removedCardRef) return existingCardRefs;

          const insertPosition = findOrderableRefInsertPosition(
            newCardRefs,
            rank,
            readField
          );

          newCardRefs.splice(insertPosition, 0, removedCardRef);
          return newCardRefs;
        },
      },
    });

    return;
  }

  let movedCardRef: Reference | null = null;

  cache.modify({
    id: sourceListCacheId,
    fields: {
      cards(existingCardRefs: Reference[], { readField }) {
        const [newListRefs, removedCardRef] = removeRef(
          existingCardRefs,
          id,
          readField
        );

        movedCardRef = removedCardRef;
        return newListRefs;
      },
    },
  });

  cache.modify({
    id: getListCacheId(destinationListId),
    fields: {
      cards(existingCardRefs: Reference[], { readField }) {
        if (!movedCardRef) return existingCardRefs;

        const insertPosition = findOrderableRefInsertPosition(
          existingCardRefs,
          rank,
          readField
        );

        return insertRef(existingCardRefs, movedCardRef, insertPosition);
      },
    },
  });
  // if (oldListId === currListId) {
  //   const insertPosition = findOrderableInsertPosition(
  //     newCardsForOldList,
  //     movedCard.rank
  //   );
  //   newCardsForOldList.splice(insertPosition, 0, movedCard);
  //   writeListCardsToCache(cache, oldListCacheId, newCardsForOldList);
  //   return;
  // }

  // const currListCacheId = getListCacheId(currListId);
  // const cardsInCurrList = readListCardsFromCache(cache, currListCacheId);
  // if (!cardsInCurrList) return;

  // const newCardsForCurrList = [...cardsInCurrList];
  // const insertPosition = findOrderableInsertPosition(
  //   newCardsForCurrList,
  //   movedCard.rank
  // );
  // newCardsForCurrList.splice(insertPosition, 0, movedCard);

  // writeListCardsToCache(cache, oldListCacheId, newCardsForOldList);
  // writeListCardsToCache(cache, currListCacheId, newCardsForCurrList);
};

export default updateCacheAfterCardMoved;
