import "./App.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";

function App() {
  const [avatarURL, setAvatarURL] = useState();
  const [githubUserame, setGithubUserame] = useState();
  const [noOfFollower, setNoOfFollower] = useState();
  const [repoData, setRepoData] = useState();
  const [noOfRepo, setNoOfRepo] = useState();
  const [error, setError] = useState(null);

  async function repoDataURL() {
    try {
      // Getting all the repos of users.
      const response = await fetch(
        "https://api.github.com/users/AnandAnkur404/repos"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch repo data");
      }
      const result = await response.json();

      const list = result.map((item) => (
        <div className="text-center" key={item.id}>
          <a target="_blank" href={item.svn_url}>
            {item.name}
          </a>
        </div>
      ));

      setRepoData(list);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  }

  // Here, getting user details.
  // one can get their user details by using - "https://api.github.com/users/{Username}" 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/users/AnandAnkur404"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const results = await response.json();
        console.log(results);

        setAvatarURL(results.avatar_url);
        setGithubUserame(results.login);
        setNoOfFollower(results.followers);
        setNoOfRepo(results.public_repos);
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App w-100 min-vh-100 justify-content-center align-items-center d-flex flex-column">
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={avatarURL} />
        <Card.Body>
          <Card.Title>{githubUserame}</Card.Title>
          <Card.Text>
            <h6>No Of Followers {noOfFollower}</h6>
            <h6>No Of Public Repos {noOfRepo}</h6>
          </Card.Text>
          <Button variant="primary" onClick={repoDataURL}>
            List My Repo
          </Button>
        </Card.Body>
      </Card>
      { repoData };
    </div>
  );
}

export default App;
