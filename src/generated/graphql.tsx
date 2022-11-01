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

export type MoveCardResult = {
  __typename?: 'MoveCardResult';
  card: Card;
  oldListId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBoard: Board;
  createCard: Card;
  createList: List;
  deleteBoard: Scalars['Boolean'];
  moveAllCardsInList: Array<Card>;
  moveCard: MoveCardResult;
  moveList: List;
  updateBoard: Board;
  updateCard: Card;
  updateList: List;
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
  sourceListId?: InputMaybe<Scalars['ID']>;
};


export type MutationDeleteBoardArgs = {
  id: Scalars['ID'];
};


export type MutationMoveAllCardsInListArgs = {
  destinationBoardId: Scalars['String'];
  destinationListId: Scalars['String'];
  sourceListId: Scalars['String'];
};


export type MutationMoveCardArgs = {
  id: Scalars['ID'];
  newBoardId: Scalars['String'];
  newListId: Scalars['String'];
  newRank: Scalars['String'];
};


export type MutationMoveListArgs = {
  destinationBoardId: Scalars['String'];
  id: Scalars['ID'];
  newRank: Scalars['String'];
  sourceBoardId: Scalars['String'];
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

export type GetBoardsAndBoardQueryVariables = Exact<{
  closed: Scalars['Boolean'];
  boardId: Scalars['ID'];
}>;


export type GetBoardsAndBoardQuery = { __typename?: 'Query', boards: Array<{ __typename?: 'Board', id: string, backgroundColor?: string | null, backgroundImage?: string | null, closed: boolean, name: string }>, board: { __typename?: 'Board', id: string, backgroundColor?: string | null, backgroundImage?: string | null, closed: boolean, name: string, lists: Array<{ __typename?: 'List', id: string, boardId: string, closed: boolean, name: string, rank: string, cards: Array<{ __typename?: 'Card', id: string, boardId: string, closed: boolean, description?: string | null, listId: string, name: string, rank: string }> }> } };

export type MoveCardMutationVariables = Exact<{
  moveCardId: Scalars['ID'];
  newBoardId: Scalars['String'];
  newListId: Scalars['String'];
  newRank: Scalars['String'];
}>;


export type MoveCardMutation = { __typename?: 'Mutation', moveCard: { __typename?: 'MoveCardResult', oldListId: string, card: { __typename?: 'Card', id: string, boardId: string, closed: boolean, description?: string | null, listId: string, name: string, rank: string } } };

export type CreateListMutationVariables = Exact<{
  boardId: Scalars['String'];
  name: Scalars['String'];
  rank: Scalars['String'];
  sourceListId?: InputMaybe<Scalars['ID']>;
}>;


export type CreateListMutation = { __typename?: 'Mutation', createList: { __typename?: 'List', id: string, boardId: string, closed: boolean, name: string, rank: string, cards: Array<{ __typename?: 'Card', id: string, boardId: string, closed: boolean, description?: string | null, listId: string, name: string, rank: string }> } };

export type MoveAllCardsInListMutationVariables = Exact<{
  sourceListId: Scalars['String'];
  destinationBoardId: Scalars['String'];
  destinationListId: Scalars['String'];
}>;


export type MoveAllCardsInListMutation = { __typename?: 'Mutation', moveAllCardsInList: Array<{ __typename?: 'Card', id: string, boardId: string, closed: boolean, description?: string | null, listId: string, name: string, rank: string }> };

export type GetBoardListsQueryVariables = Exact<{
  boardId: Scalars['ID'];
}>;


export type GetBoardListsQuery = { __typename?: 'Query', board: { __typename?: 'Board', id: string, lists: Array<{ __typename?: 'List', id: string, boardId: string, closed: boolean, name: string, rank: string }> } };

export type GetBoardsQueryVariables = Exact<{
  closed: Scalars['Boolean'];
}>;


export type GetBoardsQuery = { __typename?: 'Query', boards: Array<{ __typename?: 'Board', id: string, backgroundColor?: string | null, backgroundImage?: string | null, closed: boolean, name: string }> };

export type CardFragment = { __typename?: 'Card', id: string, boardId: string, closed: boolean, description?: string | null, listId: string, name: string, rank: string };

export type ListFragment = { __typename?: 'List', id: string, boardId: string, closed: boolean, name: string, rank: string };

export type BoardFragment = { __typename?: 'Board', id: string, backgroundColor?: string | null, backgroundImage?: string | null, closed: boolean, name: string };

export type MoveListMutationVariables = Exact<{
  moveListId: Scalars['ID'];
  sourceBoardId: Scalars['String'];
  destinationBoardId: Scalars['String'];
  newRank: Scalars['String'];
}>;


export type MoveListMutation = { __typename?: 'Mutation', moveList: { __typename?: 'List', id: string, boardId: string, closed: boolean, name: string, rank: string } };

export type CardsPartFragment = { __typename?: 'List', cards: Array<{ __typename?: 'Card', id: string, boardId: string, closed: boolean, description?: string | null, listId: string, name: string, rank: string }> };

export const ListFragmentDoc = gql`
    fragment List on List {
  id
  boardId
  closed
  name
  rank
}
    `;
export const BoardFragmentDoc = gql`
    fragment Board on Board {
  id
  backgroundColor
  backgroundImage
  closed
  name
}
    `;
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
export const CardsPartFragmentDoc = gql`
    fragment CardsPart on List {
  cards {
    ...Card
  }
}
    ${CardFragmentDoc}`;
export const GetBoardsAndBoardDocument = gql`
    query GetBoardsAndBoard($closed: Boolean!, $boardId: ID!) {
  boards(closed: $closed) {
    ...Board
  }
  board(id: $boardId) {
    ...Board
    lists {
      ...List
      cards {
        ...Card
      }
    }
  }
}
    ${BoardFragmentDoc}
${ListFragmentDoc}
${CardFragmentDoc}`;

/**
 * __useGetBoardsAndBoardQuery__
 *
 * To run a query within a React component, call `useGetBoardsAndBoardQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBoardsAndBoardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBoardsAndBoardQuery({
 *   variables: {
 *      closed: // value for 'closed'
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useGetBoardsAndBoardQuery(baseOptions: Apollo.QueryHookOptions<GetBoardsAndBoardQuery, GetBoardsAndBoardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBoardsAndBoardQuery, GetBoardsAndBoardQueryVariables>(GetBoardsAndBoardDocument, options);
      }
export function useGetBoardsAndBoardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBoardsAndBoardQuery, GetBoardsAndBoardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBoardsAndBoardQuery, GetBoardsAndBoardQueryVariables>(GetBoardsAndBoardDocument, options);
        }
export type GetBoardsAndBoardQueryHookResult = ReturnType<typeof useGetBoardsAndBoardQuery>;
export type GetBoardsAndBoardLazyQueryHookResult = ReturnType<typeof useGetBoardsAndBoardLazyQuery>;
export type GetBoardsAndBoardQueryResult = Apollo.QueryResult<GetBoardsAndBoardQuery, GetBoardsAndBoardQueryVariables>;
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
export const CreateListDocument = gql`
    mutation CreateList($boardId: String!, $name: String!, $rank: String!, $sourceListId: ID) {
  createList(
    boardId: $boardId
    name: $name
    rank: $rank
    sourceListId: $sourceListId
  ) {
    ...List
    cards {
      ...Card
    }
  }
}
    ${ListFragmentDoc}
${CardFragmentDoc}`;
export type CreateListMutationFn = Apollo.MutationFunction<CreateListMutation, CreateListMutationVariables>;

/**
 * __useCreateListMutation__
 *
 * To run a mutation, you first call `useCreateListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createListMutation, { data, loading, error }] = useCreateListMutation({
 *   variables: {
 *      boardId: // value for 'boardId'
 *      name: // value for 'name'
 *      rank: // value for 'rank'
 *      sourceListId: // value for 'sourceListId'
 *   },
 * });
 */
export function useCreateListMutation(baseOptions?: Apollo.MutationHookOptions<CreateListMutation, CreateListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateListMutation, CreateListMutationVariables>(CreateListDocument, options);
      }
export type CreateListMutationHookResult = ReturnType<typeof useCreateListMutation>;
export type CreateListMutationResult = Apollo.MutationResult<CreateListMutation>;
export type CreateListMutationOptions = Apollo.BaseMutationOptions<CreateListMutation, CreateListMutationVariables>;
export const MoveAllCardsInListDocument = gql`
    mutation MoveAllCardsInList($sourceListId: String!, $destinationBoardId: String!, $destinationListId: String!) {
  moveAllCardsInList(
    sourceListId: $sourceListId
    destinationBoardId: $destinationBoardId
    destinationListId: $destinationListId
  ) {
    ...Card
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
 *      sourceListId: // value for 'sourceListId'
 *      destinationBoardId: // value for 'destinationBoardId'
 *      destinationListId: // value for 'destinationListId'
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
export const GetBoardListsDocument = gql`
    query GetBoardLists($boardId: ID!) {
  board(id: $boardId) {
    id
    lists {
      ...List
    }
  }
}
    ${ListFragmentDoc}`;

/**
 * __useGetBoardListsQuery__
 *
 * To run a query within a React component, call `useGetBoardListsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBoardListsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBoardListsQuery({
 *   variables: {
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useGetBoardListsQuery(baseOptions: Apollo.QueryHookOptions<GetBoardListsQuery, GetBoardListsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBoardListsQuery, GetBoardListsQueryVariables>(GetBoardListsDocument, options);
      }
export function useGetBoardListsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBoardListsQuery, GetBoardListsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBoardListsQuery, GetBoardListsQueryVariables>(GetBoardListsDocument, options);
        }
export type GetBoardListsQueryHookResult = ReturnType<typeof useGetBoardListsQuery>;
export type GetBoardListsLazyQueryHookResult = ReturnType<typeof useGetBoardListsLazyQuery>;
export type GetBoardListsQueryResult = Apollo.QueryResult<GetBoardListsQuery, GetBoardListsQueryVariables>;
export const GetBoardsDocument = gql`
    query GetBoards($closed: Boolean!) {
  boards(closed: $closed) {
    ...Board
  }
}
    ${BoardFragmentDoc}`;

/**
 * __useGetBoardsQuery__
 *
 * To run a query within a React component, call `useGetBoardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBoardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBoardsQuery({
 *   variables: {
 *      closed: // value for 'closed'
 *   },
 * });
 */
export function useGetBoardsQuery(baseOptions: Apollo.QueryHookOptions<GetBoardsQuery, GetBoardsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBoardsQuery, GetBoardsQueryVariables>(GetBoardsDocument, options);
      }
export function useGetBoardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBoardsQuery, GetBoardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBoardsQuery, GetBoardsQueryVariables>(GetBoardsDocument, options);
        }
export type GetBoardsQueryHookResult = ReturnType<typeof useGetBoardsQuery>;
export type GetBoardsLazyQueryHookResult = ReturnType<typeof useGetBoardsLazyQuery>;
export type GetBoardsQueryResult = Apollo.QueryResult<GetBoardsQuery, GetBoardsQueryVariables>;
export const MoveListDocument = gql`
    mutation MoveList($moveListId: ID!, $sourceBoardId: String!, $destinationBoardId: String!, $newRank: String!) {
  moveList(
    id: $moveListId
    sourceBoardId: $sourceBoardId
    destinationBoardId: $destinationBoardId
    newRank: $newRank
  ) {
    ...List
  }
}
    ${ListFragmentDoc}`;
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
 *      sourceBoardId: // value for 'sourceBoardId'
 *      destinationBoardId: // value for 'destinationBoardId'
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