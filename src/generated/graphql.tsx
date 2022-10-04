import { gql } from '@apollo/client';
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
  Date: any;
};

export type Board = {
  __typename?: 'Board';
  backgroundColor?: Maybe<Scalars['String']>;
  backgroundImage?: Maybe<Scalars['String']>;
  closed: Scalars['Boolean'];
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  lists: Array<List>;
  name: Scalars['String'];
  updatedAt: Scalars['Date'];
  version: Scalars['Int'];
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
  createdAt: Scalars['Date'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  listId: Scalars['String'];
  name: Scalars['String'];
  rank: Scalars['String'];
  updatedAt: Scalars['Date'];
  version: Scalars['Int'];
};

export type CardUpdates = {
  boardId?: InputMaybe<Scalars['String']>;
  closed?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  listId?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  rank?: InputMaybe<Scalars['String']>;
};

export type List = {
  __typename?: 'List';
  boardId: Scalars['String'];
  cards: Array<Card>;
  closed: Scalars['Boolean'];
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  name: Scalars['String'];
  rank: Scalars['String'];
  updatedAt: Scalars['Date'];
  version: Scalars['Int'];
};

export type ListUpdates = {
  boardId?: InputMaybe<Scalars['String']>;
  closed?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  rank?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createBoard: Board;
  createCard: Card;
  createList: List;
  deleteBoard: Scalars['Boolean'];
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
};


export type MutationDeleteBoardArgs = {
  id: Scalars['ID'];
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

export type GetBoardQueryVariables = Exact<{
  boardId: Scalars['ID'];
}>;


export type GetBoardQuery = { __typename?: 'Query', board: { __typename?: 'Board', id: string, backgroundColor?: string | null, backgroundImage?: string | null, closed: boolean, createdAt: any, name: string, updatedAt: any, version: number, lists: Array<{ __typename?: 'List', id: string, boardId: string, closed: boolean, createdAt: any, name: string, rank: string, updatedAt: any, version: number, cards: Array<{ __typename?: 'Card', id: string, boardId: string, closed: boolean, createdAt: any, description?: string | null, listId: string, name: string, rank: string, updatedAt: any, version: number }> }> } };

export type UpdateListRankMutationVariables = Exact<{
  updateListId: Scalars['ID'];
  updates: ListUpdates;
}>;


export type UpdateListRankMutation = { __typename?: 'Mutation', updateList: { __typename?: 'List', id: string, rank: string } };

export type UpdateCardRankMutationVariables = Exact<{
  updateCardId: Scalars['ID'];
  updates: CardUpdates;
}>;


export type UpdateCardRankMutation = { __typename?: 'Mutation', updateCard: { __typename?: 'Card', id: string, listId: string, rank: string } };


export const GetBoardDocument = gql`
    query GetBoard($boardId: ID!) {
  board(id: $boardId) {
    id
    backgroundColor
    backgroundImage
    closed
    createdAt
    name
    updatedAt
    version
    lists {
      id
      boardId
      closed
      createdAt
      name
      rank
      updatedAt
      version
      cards {
        id
        boardId
        closed
        createdAt
        description
        listId
        name
        rank
        updatedAt
        version
      }
    }
  }
}
    `;

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
export const UpdateListRankDocument = gql`
    mutation UpdateListRank($updateListId: ID!, $updates: ListUpdates!) {
  updateList(id: $updateListId, updates: $updates) {
    id
    rank
  }
}
    `;
export type UpdateListRankMutationFn = Apollo.MutationFunction<UpdateListRankMutation, UpdateListRankMutationVariables>;

/**
 * __useUpdateListRankMutation__
 *
 * To run a mutation, you first call `useUpdateListRankMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateListRankMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateListRankMutation, { data, loading, error }] = useUpdateListRankMutation({
 *   variables: {
 *      updateListId: // value for 'updateListId'
 *      updates: // value for 'updates'
 *   },
 * });
 */
export function useUpdateListRankMutation(baseOptions?: Apollo.MutationHookOptions<UpdateListRankMutation, UpdateListRankMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateListRankMutation, UpdateListRankMutationVariables>(UpdateListRankDocument, options);
      }
export type UpdateListRankMutationHookResult = ReturnType<typeof useUpdateListRankMutation>;
export type UpdateListRankMutationResult = Apollo.MutationResult<UpdateListRankMutation>;
export type UpdateListRankMutationOptions = Apollo.BaseMutationOptions<UpdateListRankMutation, UpdateListRankMutationVariables>;
export const UpdateCardRankDocument = gql`
    mutation UpdateCardRank($updateCardId: ID!, $updates: CardUpdates!) {
  updateCard(id: $updateCardId, updates: $updates) {
    id
    listId
    rank
  }
}
    `;
export type UpdateCardRankMutationFn = Apollo.MutationFunction<UpdateCardRankMutation, UpdateCardRankMutationVariables>;

/**
 * __useUpdateCardRankMutation__
 *
 * To run a mutation, you first call `useUpdateCardRankMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCardRankMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCardRankMutation, { data, loading, error }] = useUpdateCardRankMutation({
 *   variables: {
 *      updateCardId: // value for 'updateCardId'
 *      updates: // value for 'updates'
 *   },
 * });
 */
export function useUpdateCardRankMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCardRankMutation, UpdateCardRankMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCardRankMutation, UpdateCardRankMutationVariables>(UpdateCardRankDocument, options);
      }
export type UpdateCardRankMutationHookResult = ReturnType<typeof useUpdateCardRankMutation>;
export type UpdateCardRankMutationResult = Apollo.MutationResult<UpdateCardRankMutation>;
export type UpdateCardRankMutationOptions = Apollo.BaseMutationOptions<UpdateCardRankMutation, UpdateCardRankMutationVariables>;