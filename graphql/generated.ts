import { GraphQLResolveInfo } from 'graphql';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AdjustmentOrder = {
  __typename?: 'AdjustmentOrder';
  asset: Scalars['String']['output'];
  maxSpreadRate: Scalars['Float']['output'];
  quantity: Scalars['Int']['output'];
};

export type BinanceCredentialsInput = {
  apiKey: Scalars['String']['input'];
  apiSecret: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  canceledAdjustmentOrder?: Maybe<AdjustmentOrder>;
  createdAdjustmentOrder?: Maybe<AdjustmentOrder>;
};


export type MutationCanceledAdjustmentOrderArgs = {
  asset: Scalars['String']['input'];
  credentials: BinanceCredentialsInput;
};


export type MutationCreatedAdjustmentOrderArgs = {
  asset: Scalars['String']['input'];
  credentials: BinanceCredentialsInput;
  maxSpreadRate: Scalars['Float']['input'];
  quantity: Scalars['Int']['input'];
};

export type Query = {
  __typename?: 'Query';
  adjustmentOrders?: Maybe<Array<Maybe<AdjustmentOrder>>>;
};


export type QueryAdjustmentOrdersArgs = {
  credentials: BinanceCredentialsInput;
};

export type CreateAdjustmentOrderMutationVariables = Exact<{
  asset: Scalars['String']['input'];
  maxSpreadRate: Scalars['Float']['input'];
  quantity: Scalars['Int']['input'];
  credentials: BinanceCredentialsInput;
}>;


export type CreateAdjustmentOrderMutation = { __typename?: 'Mutation', createdAdjustmentOrder?: { __typename?: 'AdjustmentOrder', asset: string, maxSpreadRate: number, quantity: number } | null };

export type CancelAdjustmentOrderMutationVariables = Exact<{
  asset: Scalars['String']['input'];
  credentials: BinanceCredentialsInput;
}>;


export type CancelAdjustmentOrderMutation = { __typename?: 'Mutation', canceledAdjustmentOrder?: { __typename?: 'AdjustmentOrder', asset: string, maxSpreadRate: number, quantity: number } | null };

export type GetAdjustmentOrdersQueryVariables = Exact<{
  credentials: BinanceCredentialsInput;
}>;


export type GetAdjustmentOrdersQuery = { __typename?: 'Query', adjustmentOrders?: Array<{ __typename?: 'AdjustmentOrder', asset: string, maxSpreadRate: number, quantity: number } | null> | null };


export const CreateAdjustmentOrderDocument = gql`
    mutation CreateAdjustmentOrder($asset: String!, $maxSpreadRate: Float!, $quantity: Int!, $credentials: BinanceCredentialsInput!) {
  createdAdjustmentOrder(
    asset: $asset
    maxSpreadRate: $maxSpreadRate
    quantity: $quantity
    credentials: $credentials
  ) {
    asset
    maxSpreadRate
    quantity
  }
}
    `;
export type CreateAdjustmentOrderMutationFn = Apollo.MutationFunction<CreateAdjustmentOrderMutation, CreateAdjustmentOrderMutationVariables>;

/**
 * __useCreateAdjustmentOrderMutation__
 *
 * To run a mutation, you first call `useCreateAdjustmentOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAdjustmentOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAdjustmentOrderMutation, { data, loading, error }] = useCreateAdjustmentOrderMutation({
 *   variables: {
 *      asset: // value for 'asset'
 *      maxSpreadRate: // value for 'maxSpreadRate'
 *      quantity: // value for 'quantity'
 *      credentials: // value for 'credentials'
 *   },
 * });
 */
export function useCreateAdjustmentOrderMutation(baseOptions?: Apollo.MutationHookOptions<CreateAdjustmentOrderMutation, CreateAdjustmentOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAdjustmentOrderMutation, CreateAdjustmentOrderMutationVariables>(CreateAdjustmentOrderDocument, options);
      }
export type CreateAdjustmentOrderMutationHookResult = ReturnType<typeof useCreateAdjustmentOrderMutation>;
export type CreateAdjustmentOrderMutationResult = Apollo.MutationResult<CreateAdjustmentOrderMutation>;
export type CreateAdjustmentOrderMutationOptions = Apollo.BaseMutationOptions<CreateAdjustmentOrderMutation, CreateAdjustmentOrderMutationVariables>;
export const CancelAdjustmentOrderDocument = gql`
    mutation CancelAdjustmentOrder($asset: String!, $credentials: BinanceCredentialsInput!) {
  canceledAdjustmentOrder(asset: $asset, credentials: $credentials) {
    asset
    maxSpreadRate
    quantity
  }
}
    `;
export type CancelAdjustmentOrderMutationFn = Apollo.MutationFunction<CancelAdjustmentOrderMutation, CancelAdjustmentOrderMutationVariables>;

/**
 * __useCancelAdjustmentOrderMutation__
 *
 * To run a mutation, you first call `useCancelAdjustmentOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelAdjustmentOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelAdjustmentOrderMutation, { data, loading, error }] = useCancelAdjustmentOrderMutation({
 *   variables: {
 *      asset: // value for 'asset'
 *      credentials: // value for 'credentials'
 *   },
 * });
 */
export function useCancelAdjustmentOrderMutation(baseOptions?: Apollo.MutationHookOptions<CancelAdjustmentOrderMutation, CancelAdjustmentOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelAdjustmentOrderMutation, CancelAdjustmentOrderMutationVariables>(CancelAdjustmentOrderDocument, options);
      }
export type CancelAdjustmentOrderMutationHookResult = ReturnType<typeof useCancelAdjustmentOrderMutation>;
export type CancelAdjustmentOrderMutationResult = Apollo.MutationResult<CancelAdjustmentOrderMutation>;
export type CancelAdjustmentOrderMutationOptions = Apollo.BaseMutationOptions<CancelAdjustmentOrderMutation, CancelAdjustmentOrderMutationVariables>;
export const GetAdjustmentOrdersDocument = gql`
    query GetAdjustmentOrders($credentials: BinanceCredentialsInput!) {
  adjustmentOrders(credentials: $credentials) {
    asset
    maxSpreadRate
    quantity
  }
}
    `;

/**
 * __useGetAdjustmentOrdersQuery__
 *
 * To run a query within a React component, call `useGetAdjustmentOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAdjustmentOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAdjustmentOrdersQuery({
 *   variables: {
 *      credentials: // value for 'credentials'
 *   },
 * });
 */
export function useGetAdjustmentOrdersQuery(baseOptions: Apollo.QueryHookOptions<GetAdjustmentOrdersQuery, GetAdjustmentOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAdjustmentOrdersQuery, GetAdjustmentOrdersQueryVariables>(GetAdjustmentOrdersDocument, options);
      }
export function useGetAdjustmentOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAdjustmentOrdersQuery, GetAdjustmentOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAdjustmentOrdersQuery, GetAdjustmentOrdersQueryVariables>(GetAdjustmentOrdersDocument, options);
        }
export type GetAdjustmentOrdersQueryHookResult = ReturnType<typeof useGetAdjustmentOrdersQuery>;
export type GetAdjustmentOrdersLazyQueryHookResult = ReturnType<typeof useGetAdjustmentOrdersLazyQuery>;
export type GetAdjustmentOrdersQueryResult = Apollo.QueryResult<GetAdjustmentOrdersQuery, GetAdjustmentOrdersQueryVariables>;


export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AdjustmentOrder: ResolverTypeWrapper<AdjustmentOrder>;
  BinanceCredentialsInput: BinanceCredentialsInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AdjustmentOrder: AdjustmentOrder;
  BinanceCredentialsInput: BinanceCredentialsInput;
  Boolean: Scalars['Boolean']['output'];
  Float: Scalars['Float']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  Query: {};
  String: Scalars['String']['output'];
};

export type AdjustmentOrderResolvers<ContextType = any, ParentType extends ResolversParentTypes['AdjustmentOrder'] = ResolversParentTypes['AdjustmentOrder']> = {
  asset?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  maxSpreadRate?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  canceledAdjustmentOrder?: Resolver<Maybe<ResolversTypes['AdjustmentOrder']>, ParentType, ContextType, RequireFields<MutationCanceledAdjustmentOrderArgs, 'asset' | 'credentials'>>;
  createdAdjustmentOrder?: Resolver<Maybe<ResolversTypes['AdjustmentOrder']>, ParentType, ContextType, RequireFields<MutationCreatedAdjustmentOrderArgs, 'asset' | 'credentials' | 'maxSpreadRate' | 'quantity'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  adjustmentOrders?: Resolver<Maybe<Array<Maybe<ResolversTypes['AdjustmentOrder']>>>, ParentType, ContextType, RequireFields<QueryAdjustmentOrdersArgs, 'credentials'>>;
};

export type Resolvers<ContextType = any> = {
  AdjustmentOrder?: AdjustmentOrderResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};

