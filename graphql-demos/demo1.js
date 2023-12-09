var { graphql, buildSchema } = require('graphql')

var schema = buildSchema(`
  type Query {
    hello: String
  }
`)

var root = { hello: () => 'Hello world!' }

graphql({
  schema: schema,
  source: '{ hello }',
  rootValue: root
}).then((response) => {
  console.log(response)
})
