import React from "react";
import { EpisodeForm } from "../components/EpisodeForm";
import { convertToForm, convertToStorage } from "../helpers/episode";
import axios from "axios";

export class EditEpisode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      episode: null
    };
  }

  async componentDidMount() {
    const { data } = await axios.get(
      `/api/episodes/${this.props.match.params.id}`
    );
    this.setState({
      episode: convertToForm(data.result._source)
    });
  }

  render() {
    if (!this.state.episode) {
      return "Loading...";
    }

    return (
      <div>
        <h1>Edit Episode</h1>
        <p>This is where you edit an existing episode.</p>
        <EpisodeForm episode={this.props.episode} />
      </div>
    );
  }
}
