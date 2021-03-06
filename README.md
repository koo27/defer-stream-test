# defer-stream-test

This repo is intended just to test @defer and @stream directive with yoga.
It's strictly related to an issue opened on yoga repository (https://github.com/dotansimha/graphql-yoga/issues/1372).

# Installation

To test the repo just install the dependencies with `npm install` then run yoga server with `npm run start` and connect to graphiql via browser at `http://localhost:4000/graphql`

If you want to try urql client, just install dependencies (`npm install` from urql directory) and then run `npm run start-urql` from main directory to execute a basic @defer query.

# Possibile Operations

The possible operations to test are the following

Basic query, nothing fancy here :)

```
query BasicQuery {
    hello
}
```

Query using stream stream can be used on fields that return lists. The resolver on the backend uses an async generator function for yielding the values. In this demo there is a sleep of one second before the next value is yielded. stream is useful in scenarios where a lot of items must be sent to the client, but you want to show something as soon as possibl. e.g. a social media feed. The initialCount argument specifies the amount of items sent within the initial chunk.

```
query StreamQuery {
    greetings @stream(initialCount: 1)
}
```

Query using defer. defer can be used on fragments in order to defer sending the result to the client, if it takes longer than the rest of the resolvers to yield an value. The User.bio resolver on the backend uses a sleep of 2 seconds for deferring the resolution of the value. Stream is useful when a certain resolver on your backend is slow, but not mandatory for showing something meaningful to your users. An example for this would be a slow database call or third-party service.

```
query DeferQuery {
    me {
        id
        name
        ... on User @defer {
            bio
        }
    }
}
```

Query using both stream and defer. Both directives can be used on the same operation!

```
query MixedStreamAndDefer {
    me {
        id
        name
        ... on User @defer {
            bio
        }
        friends @stream(initialCount: 1) {
            id
            name
        }
        }
    }
```

Basic Subscription. A subscription is a persistent connection between the graphql client and server and can be used for pushing events to the client. This subscription publishes the current date string every second. Subscriptions are similar to defer and stream implemented via async generators. Any event source such as Redis PubSub or MQTT can be wrapped in an async generator and used for backing the subscription. The published event value is then passed on to the execution algorithm similar to mutations and subscriptions.

```
subscription BasicSubscription {
    clock
}
```

The above content is taken from another example repository.

# URQL

Just for the purpose of the test there is another folder called _urql_ where there is a very basic and simple grapqhl client made using urql to connect to the grapqhl yoga api.
