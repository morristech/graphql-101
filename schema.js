var graphql = require('graphql');
var data = require('./data.js');

var userType = new graphql.GraphQLObjectType({
    name: 'User',
    fields: () => ({
        login: { type: graphql.GraphQLString },
        id:    { type: graphql.GraphQLInt },
        url:   { type: graphql.GraphQLString },
    })
});

var repoType = new graphql.GraphQLObjectType({
    name: 'Repo',
    fields: () => ({
        owner:             { type: userType },
        name:              { type: graphql.GraphQLString },
        full_name:         { type: graphql.GraphQLString },
        url:               { type: graphql.GraphQLString },
        forks_count:       { type: graphql.GraphQLInt },
        stargazers_count:  { type: graphql.GraphQLInt },
        watchers_count:    { type: graphql.GraphQLInt },
        size:              { type: graphql.GraphQLInt },
        open_issues_count: { type: graphql.GraphQLInt },
        has_issues:        { type: graphql.GraphQLBoolean },
        has_wiki:          { type: graphql.GraphQLBoolean }
    })
});

var queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
        repo: {
            type: repoType,
            args: {
                name: { type: graphql.GraphQLString }
            },
            resolve: data.getRepo
        },
        repos: {
            type: new graphql.GraphQLList(repoType),
            args: {
                forks_count: {
                    type: graphql.GraphQLInt,
                    defaultValue: 0
                },
                stargazers_count: {
                    type: graphql.GraphQLInt,
                    defaultValue: 0
                },
                watchers_count: {
                    type: graphql.GraphQLInt,
                    defaultValue: 0
                },
                size: {
                    type: graphql.GraphQLInt,
                    defaultValue: 0
                    
                },
                open_issues_count: {
                    type: graphql.GraphQLInt,
                    defaultValue: 0
                },
                has_issues: {
                    type: graphql.GraphQLBoolean
                },
                has_wiki: {
                    type: graphql.GraphQLBoolean
                }
            },
            resolve: data.getRepos
        }     
    }
});

module.exports = new graphql.GraphQLSchema({
    query: queryType,
    types:  [userType, repoType]
});
