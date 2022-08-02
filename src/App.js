import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function App() {

  const [avatarURL, setAvatarURL] = useState();

  const [githubUsername, setGitHubUsername] = useState();

  const [repoData, setRepoData] = useState();

  const [githubBio, setGithubBio] = useState();

  async function repoDataURL() {
    try {
      //Obtener el usuario
      const repos = await fetch("https://api.github.com/users/belfortep/repos")

      const res = await repos.json();

      console.log(res);

      const list = res.map((item) => (
        <div className="text-center">
          <a key={item.name} href={item.svn_url}>
            {item.name}
          </a>
        </div>

      ));
      setRepoData(list);

    } catch (err) {

      console.log(err);

    }
  }

  useEffect(() => {

    const fetchData = async () => {
      try {

        const info = await fetch("https://api.github.com/users/belfortep");

        const res = await info.json();

        console.log(res);

        setAvatarURL(res.avatar_url);

        setGitHubUsername(res.login);

        setGithubBio(res.bio);

      } catch (err) {

        console.log(err);

      }


    }

    fetchData();

  }, []);

  return (
    <div className="App w-100 min-vh-100 justify-content-center align-items-center d-flex flex-column">
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={avatarURL} />
        <Card.Body>
          <Card.Title>{githubUsername}</Card.Title>
          <Card.Subtitle>{githubBio}</Card.Subtitle>
          <Button variant="primary" onClick={repoDataURL}>
            Mis repos
          </Button>
        </Card.Body>
      </Card>
      {repoData}
    </div>
  );
}

export default App;