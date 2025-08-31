async function getPinnedRepos() {
	try {
		const url = "https://api.github.com/graphql";
		const response = await fetch(url, {
			method: "POST",

			headers: {
				"Content-Type": "application/json",
				"User-Agent": "asuntx",
				Authorizaton: `bearer ${process.env.GITHUB_TOKEN}`,
			},

			body: JSON.stringify({
				query: `
            {
  user(login: "asuntx") {
    pinnedItems(first: 6, types: REPOSITORY) {
      nodes {
        ... on Repository {
          name
          description
          stargazerCount
          forkCount
          url
        }
      }
    }
  }
}
            `,
			}),
		});
		if (!response.ok) {
			console.error(`HTTP error: ${response.status}`);
		}
		const data = await response.json();
		console.log(data);
		return data;
	} catch (err) {
		console.error(err);
	}
}
getPinnedRepos();
export default getPinnedRepos();
