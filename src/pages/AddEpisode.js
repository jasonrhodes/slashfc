import React from "react";
import { EpisodeForm } from "../components/EpisodeForm";

export class AddEpisode extends React.Component {
  render() {
    return (
      <div>
        <h1>Add Episode</h1>
        <p>This is where you add episodes.</p>
        <EpisodeForm />
      </div>
    );
  }
}
