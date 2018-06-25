import axios from 'axios'

function searchRepos(query) {
  return axios({
    url: 'https://api.github.com/graphql',
    method: 'post',
    data: {
      query: `{
        search(first: 10,type:REPOSITORY, query:"${query}") {
          nodes {
            ... on Repository {
              nameWithOwner
              homepageUrl
              url
            }
          }
        }
      }`
    },
    headers: {
      Authorization: `bearer 102307c997ceb0fd9a4bc6c3457473c91f2b0b6f`
    }
  }).then(response => {
    return response.data.data.search.nodes
  })
}

export {searchRepos}
