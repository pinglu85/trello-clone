import { gql } from 'graphql.macro';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  JSONObject: { [key: string]: any };
};

export type Board = {
  __typename?: 'Board';
  backgroundColor?: Maybe<Scalars['String']>;
  backgroundImage?: Maybe<Scalars['String']>;
  closed: Scalars['Boolean'];
  id: Scalars['ID'];
  lists: Array<List>;
  name: Scalars['String'];
};

export type BoardUpdates = {
  background?: InputMaybe<Scalars['String']>;
  closed?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
};

export type Card = {
  __typename?: 'Card';
  boardId: Scalars['String'];
  closed: Scalars['Boolean'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  listId: Scalars['String'];
  name: Scalars['String'];
  rank: Scalars['String'];
};

export type CardUpdates = {
  closed?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type List = {
  __typename?: 'List';
  boardId: Scalars['String'];
  cards: Array<Card>;
  closed: Scalars['Boolean'];
  id: Scalars['ID'];
  name: Scalars['String'];
  rank: Scalars['String'];
};

export type ListUpdates = {
  closed?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
};

export type MoveAllCardsInListResult = {
  __typename?: 'MoveAllCardsInListResult';
  cards: Array<Card>;
  oldListId: Scalars['String'];
};

export type MoveCardResult = {
  __typename?: 'MoveCardResult';
  card: Card;
  oldListId: Scalars['String'];
};

export type MoveListResult = {
  __typename?: 'MoveListResult';
  boardId: Scalars['String'];
  id: Scalars['ID'];
  oldBoardId: Scalars['String'];
  rank: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  copyList: List;
  createBoard: Board;
  createCard: Card;
  createList: List;
  deleteBoard: Scalars['Boolean'];
  moveAllCardsInList: MoveAllCardsInListResult;
  moveCard: MoveCardResult;
  moveList: MoveListResult;
  updateBoard: Board;
  updateCard: Card;
  updateList: List;
};


export type MutationCopyListArgs = {
  newListName: Scalars['String'];
  newListRank: Scalars['String'];
  sourceListId: Scalars['ID'];
};


export type MutationCreateBoardArgs = {
  background: Scalars['String'];
  name: Scalars['String'];
};


export type MutationCreateCardArgs = {
  boardId: Scalars['String'];
  listId: Scalars['String'];
  name: Scalars['String'];
  rank: Scalars['String'];
};


export type MutationCreateListArgs = {
  boardId: Scalars['String'];
  name: Scalars['String'];
  rank: Scalars['String'];
};


export type MutationDeleteBoardArgs = {
  id: Scalars['ID'];
};


export type MutationMoveAllCardsInListArgs = {
  newBoardId: Scalars['String'];
  newListId: Scalars['String'];
  newRankMap: Scalars['JSONObject'];
  oldListId: Scalars['String'];
};


export type MutationMoveCardArgs = {
  id: Scalars['ID'];
  newBoardId: Scalars['String'];
  newListId: Scalars['String'];
  newRank: Scalars['String'];
};


export type MutationMoveListArgs = {
  id: Scalars['ID'];
  newBoardId: Scalars['String'];
  newRank: Scalars['String'];
};


export type MutationUpdateBoardArgs = {
  id: Scalars['ID'];
  updates: BoardUpdates;
};


export type MutationUpdateCardArgs = {
  id: Scalars['ID'];
  updates: CardUpdates;
};


export type MutationUpdateListArgs = {
  id: Scalars['ID'];
  updates: ListUpdates;
};

export type Query = {
  __typename?: 'Query';
  board: Board;
  boards: Array<Board>;
  card: Card;
  cards: Array<Card>;
  list: List;
  lists: Array<List>;
};


export type QueryBoardArgs = {
  id: Scalars['ID'];
};


export type QueryBoardsArgs = {
  closed: Scalars['Boolean'];
};


export type QueryCardArgs = {
  id: Scalars['ID'];
};


export type QueryCardsArgs = {
  listId: Scalars['String'];
};


export type QueryListArgs = {
  id: Scalars['ID'];
};


export type QueryListsArgs = {
  boardId: Scalars['String'];
};

export type MoveListMutationVariables = Exact<{
  moveListId: Scalars['ID'];
  newBoardId: Scalars['String'];
  newRank: Scalars['String'];
}>;


export type MoveListMutation = { __typename?: 'Mutation', moveList: { __typename?: 'MoveListResult', id: string, boardId: string, oldBoardId: string, rank: string } };

export type MoveCardMutationVariables = Exact<{
  moveCardId: Scalars['ID'];
  newBoardId: Scalars['String'];
  newListId: Scalars['String'];
  newRank: Scalars['String'];
}>;


export type MoveCardMutation = { __typename?: 'Mutation', moveCard: { __typename?: 'MoveCardResult', oldListId: string, card: { __typename?: 'Card', id: string, boardId: string, closed: boolean, description?: string | null, listId: string, name: string, rank: string } } };

export type CardFragment = { __typename?: 'Card', id: string, boardId: string, closed: boolean, description?: string | null, listId: string, name: string, rank: string };

export type GetBoardQueryVariables = Exact<{
  boardId: Scalars['ID'];
}>;


export type GetBoardQuery = { __typename?: 'Query', board: { __typename?: 'Board', id: string, backgroundColor?: string | null, backgroundImage?: string | null, closed: boolean, name: string, lists: Array<{ __typename?: 'List', id: string, boardId: string, closed: boolean, name: string, rank: string, cards: Array<{ __typename?: 'Card', id: string, boardId: string, closed: boolean, description?: string | null, listId: string, name: string, rank: string }> }> } };

export type CopyListMutationVariables = Exact<{
  sourceListId: Scalars['ID'];
  newListName: Scalars['String'];
  newListRank: Scalars['String'];
}>;


export type CopyListMutation = { __typename?: 'Mutation', copyList: { __typename?: 'List', id: string, boardId: string, closed: boolean, name: string, rank: string, cards: Array<{ __typename?: 'Card', id: string, boardId: string, closed: boolean, description?: string | null, listId: string, name: string, rank: string }> } };

export type MoveAllCardsInListMutationVariables = Exact<{
  oldListId: Scalars['String'];
  newBoardId: Scalars['String'];
  newListId: Scalars['String'];
  newRankMap: Scalars['JSONObject'];
}>;


export type MoveAllCardsInListMutation = { __typename?: 'Mutation', moveAllCardsInList: { __typename?: 'MoveAllCardsInListResult', oldListId: string, cards: Array<{ __typename?: 'Card', id: string, boardId: string, closed: boolean, description?: string | null, listId: string, name: string, rank: string }> } };

export type ListFragment = { __typename?: 'List', cards: Array<{ __typename?: 'Card', id: string, boardId: string, closed: boolean, description?: string | null, listId: string, name: string, rank: string }> };

export const CardFragmentDoc = gql`
    fragment Card on Card {
  id
  boardId
  closed
  description
  listId
  name
  rank
}
    `;
export const ListFragmentDoc = gql`
    fragment List on List {
  cards {
    ...Card
  }
}
    ${CardFragmentDoc}`;
export const MoveListDocument = gql`
    mutation MoveList($moveListId: ID!, $newBoardId: String!, $newRank: String!) {
  moveList(id: $moveListId, newBoardId: $newBoardId, newRank: $newRank) {
    id
    boardId
    oldBoardId
    rank
  }
}
    `;
export type MoveListMutationFn = Apollo.MutationFunction<MoveListMutation, MoveListMutationVariables>;

/**
 * __useMoveListMutation__
 *
 * To run a mutation, you first call `useMoveListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMoveListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [moveListMutation, { data, loading, error }] = useMoveListMutation({
 *   variables: {
 *      moveListId: // value for 'moveListId'
 *      newBoardId: // value for 'newBoardId'
 *      newRank: // value for 'newRank'
 *   },
 * });
 */
export function useMoveListMutation(baseOptions?: Apollo.MutationHookOptions<MoveListMutation, MoveListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MoveListMutation, MoveListMutationVariables>(MoveListDocument, options);
      }
export type MoveListMutationHookResult = ReturnType<typeof useMoveListMutation>;
export type MoveListMutationResult = Apollo.MutationResult<MoveListMutation>;
export type MoveListMutationOptions = Apollo.BaseMutationOptions<MoveListMutation, MoveListMutationVariables>;
export const MoveCardDocument = gql`
    mutation MoveCard($moveCardId: ID!, $newBoardId: String!, $newListId: String!, $newRank: String!) {
  moveCard(
    id: $moveCardId
    newBoardId: $newBoardId
    newListId: $newListId
    newRank: $newRank
  ) {
    oldListId
    card {
      ...Card
    }
  }
}
    ${CardFragmentDoc}`;
export type MoveCardMutationFn = Apollo.MutationFunction<MoveCardMutation, MoveCardMutationVariables>;

/**
 * __useMoveCardMutation__
 *
 * To run a mutation, you first call `useMoveCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMoveCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [moveCardMutation, { data, loading, error }] = useMoveCardMutation({
 *   variables: {
 *      moveCardId: // value for 'moveCardId'
 *      newBoardId: // value for 'newBoardId'
 *      newListId: // value for 'newListId'
 *      newRank: // value for 'newRank'
 *   },
 * });
 */
export function useMoveCardMutation(baseOptions?: Apollo.MutationHookOptions<MoveCardMutation, MoveCardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MoveCardMutation, MoveCardMutationVariables>(MoveCardDocument, options);
      }
export type MoveCardMutationHookResult = ReturnType<typeof useMoveCardMutation>;
export type MoveCardMutationResult = Apollo.MutationResult<MoveCardMutation>;
export type MoveCardMutationOptions = Apollo.BaseMutationOptions<MoveCardMutation, MoveCardMutationVariables>;
export const GetBoardDocument = gql`
    query GetBoard($boardId: ID!) {
  board(id: $boardId) {
    id
    backgroundColor
    backgroundImage
    closed
    name
    lists {
      id
      boardId
      closed
      name
      rank
      cards {
        ...Card
      }
    }
  }
}
    ${CardFragmentDoc}`;

/**
 * __useGetBoardQuery__
 *
 * To run a query within a React component, call `useGetBoardQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBoardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBoardQuery({
 *   variables: {
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useGetBoardQuery(baseOptions: Apollo.QueryHookOptions<GetBoardQuery, GetBoardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBoardQuery, GetBoardQueryVariables>(GetBoardDocument, options);
      }
export function useGetBoardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBoardQuery, GetBoardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBoardQuery, GetBoardQueryVariables>(GetBoardDocument, options);
        }
export type GetBoardQueryHookResult = ReturnType<typeof useGetBoardQuery>;
export type GetBoardLazyQueryHookResult = ReturnType<typeof useGetBoardLazyQuery>;
export type GetBoardQueryResult = Apollo.QueryResult<GetBoardQuery, GetBoardQueryVariables>;
export const CopyListDocument = gql`
    mutation CopyList($sourceListId: ID!, $newListName: String!, $newListRank: String!) {
  copyList(
    sourceListId: $sourceListId
    newListName: $newListName
    newListRank: $newListRank
  ) {
    id
    boardId
    cards {
      ...Card
    }
    closed
    name
    rank
  }
}
    ${CardFragmentDoc}`;
export type CopyListMutationFn = Apollo.MutationFunction<CopyListMutation, CopyListMutationVariables>;

/**
 * __useCopyListMutation__
 *
 * To run a mutation, you first call `useCopyListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCopyListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [copyListMutation, { data, loading, error }] = useCopyListMutation({
 *   variables: {
 *      sourceListId: // value for 'sourceListId'
 *      newListName: // value for 'newListName'
 *      newListRank: // value for 'newListRank'
 *   },
 * });
 */
export function useCopyListMutation(baseOptions?: Apollo.MutationHookOptions<CopyListMutation, CopyListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CopyListMutation, CopyListMutationVariables>(CopyListDocument, options);
      }
export type CopyListMutationHookResult = ReturnType<typeof useCopyListMutation>;
export type CopyListMutationResult = Apollo.MutationResult<CopyListMutation>;
export type CopyListMutationOptions = Apollo.BaseMutationOptions<CopyListMutation, CopyListMutationVariables>;
export const MoveAllCardsInListDocument = gql`
    mutation MoveAllCardsInList($oldListId: String!, $newBoardId: String!, $newListId: String!, $newRankMap: JSONObject!) {
  moveAllCardsInList(
    oldListId: $oldListId
    newBoardId: $newBoardId
    newListId: $newListId
    newRankMap: $newRankMap
  ) {
    oldListId
    cards {
      ...Card
    }
  }
}
    ${CardFragmentDoc}`;
export type MoveAllCardsInListMutationFn = Apollo.MutationFunction<MoveAllCardsInListMutation, MoveAllCardsInListMutationVariables>;

/**
 * __useMoveAllCardsInListMutation__
 *
 * To run a mutation, you first call `useMoveAllCardsInListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMoveAllCardsInListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [moveAllCardsInListMutation, { data, loading, error }] = useMoveAllCardsInListMutation({
 *   variables: {
 *      oldListId: // value for 'oldListId'
 *      newBoardId: // value for 'newBoardId'
 *      newListId: // value for 'newListId'
 *      newRankMap: // value for 'newRankMap'
 *   },
 * });
 */
export function useMoveAllCardsInListMutation(baseOptions?: Apollo.MutationHookOptions<MoveAllCardsInListMutation, MoveAllCardsInListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MoveAllCardsInListMutation, MoveAllCardsInListMutationVariables>(MoveAllCardsInListDocument, options);
      }
export type MoveAllCardsInListMutationHookResult = ReturnType<typeof useMoveAllCardsInListMutation>;
export type MoveAllCardsInListMutationResult = Apollo.MutationResult<MoveAllCardsInListMutation>;
export type MoveAllCardsInListMutationOptions = Apollo.BaseMutationOptions<MoveAllCardsInListMutation, MoveAllCardsInListMutationVariables>;