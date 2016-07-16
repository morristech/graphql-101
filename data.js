var request = require('request');

var data = {repos: []};

request({
    url: "https://api.github.com/users/github/repos",
    json: true,
    headers: {
        'User-Agent': 'graphql-101'
    }
}, (error, response, body) => {
    if (error) {
        console.log(error);
        return;
    }
    if (response.statusCode !== 200) {
        console.log(body);
    } else {
        data.repos = body;
    }
});

exports.getRepo = (_, args) => {
    for (let i = 0; i < data.repos.length; i++) {
        if (args.name == data.repos[i].name) {
            return repos[i];
        }
    }
}

exports.getRepos = (_, args) => {
    let founds = [];
    for (let i = 0; i < data.repos.length; i++) {
        let repo = data.repos[i];
        if (repo.forks_count >= args.forks_count &&
            repo.stargazers_count >= args.stargazers_count &&
            repo.watchers_count >= args.watchers_count &&
            repo.size >= args.size &&
            repo.open_issues_count >= args.open_issues_count) {
            if (args.has_issues === undefined &&
                args.has_wiki === undefined) {
                founds.push(repo);
            }
            if (repo.has_issues === args.has_issues &&
                repo.has_wiki === args.has_wiki) {
                founds.push(repo);
            } else if (args.has_wiki === undefined &&
                       repo.has_issues === args.has_issues) {
                founds.push(repo);
            } else if (args.has_issues === undefined &&
                       repo.has_wiki === args.has_wiki) {
                founds.push(repo);
            }
        }
    }
    return founds;
}
