import { createClient } from '@urql/core';

const client = createClient({
  url: 'http://0.0.0.0:4000/graphql',
});


const QUERY = `
  query deferTest {
    me {
        id
        name
        ... on User @defer {
            bio
        }
    }
  }
`;


client
  .query(QUERY)
  .toPromise()
  .then(result => {
    console.log(result);
  });