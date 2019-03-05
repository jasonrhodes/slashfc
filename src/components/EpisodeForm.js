import React from "react";
import {
  CheckboxGroup,
  Form,
  TextInput,
  validators,
  Textarea
} from "littleform";
import { convertToStorage } from "../helpers/episode";
import axios from "axios";

const isValidSlashFilmUrl = value =>
  /^https:\/\/www\.slashfilm\.com\//.test(value)
    ? undefined
    : "This doesn't look like a valid URL";

const hosts = [
  { value: "David Chen" },
  { value: "Devindra Hardawar" },
  { value: "Jeff Cannata" },
  { value: "Kristy Puchko" },
  { value: "Adam Quigley" }
];

export class EpisodeForm extends React.Component {
  handleSubmit = async form => {
    const submitted = convertToStorage(form.values);

    try {
      if (this.props.episode) {
        submitted.id = this.props.episode.id;
        await axios.put(`/api/episodes/${this.props.episode.id}`, submitted);
      } else {
        await axios.post("/api/episodes", submitted);
        form.clear();
      }
      window.scrollTo(0, 0);
    } catch (error) {
      console.log("An error ocurred:", error.message);
    }
  };

  render() {
    return (
      <Form
        onSubmit={this.handleSubmit}
        initialValues={
          this.props.episode || {
            hosts: ["David Chen", "Devindra Hardawar"]
          }
        }
        className="pure-form-stacked"
      >
        <div className="form-group">
          <label htmlFor="id">Episode ID</label>
          <TextInput
            name="id"
            disabled={Boolean(this.props.episode)}
            validators={[validators.required]}
            type="number"
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <TextInput name="title" validators={[validators.required]} />
        </div>
        <div className="form-group">
          <label htmlFor="url">URL</label>
          <TextInput
            name="url"
            validators={[validators.required, isValidSlashFilmUrl]}
            placeholder="https://www.slashfilm.com/full-url-required"
          />
        </div>
        <div className="form-group">
          <label htmlFor="publish_date">Publish Date</label>
          <TextInput
            name="publish_date"
            validators={[validators.required]}
            placeholder="YYYY-MM-DD"
            type="date"
          />
        </div>
        <div className="form-group">
          <label htmlFor="hosts">Regular Hosts</label>
          <CheckboxGroup name="hosts" options={hosts} />
        </div>
        <div className="form-group">
          <label htmlFor="guests">Guest Hosts (comma-separated)</label>
          <TextInput name="guests" />
        </div>
        <div className="form-group">
          <label htmlFor="featured">Featured Review(s)</label>
          <Textarea name="featured" />
        </div>
        <div className="form-group">
          <label htmlFor="wwbw">What We've Been Watching</label>
          <Textarea name="wwbw" />
        </div>
        <div className="form-group">
          <label htmlFor="film_news">Film News</label>
          <Textarea name="film_news" />
        </div>
        <div className="form-group">
          <label htmlFor="description">Full Text Episode Description</label>
          <Textarea name="description" />
        </div>
        <div className="form-group">
          <label htmlFor="keywords">Keywords (one per line)</label>
          <Textarea name="keywords" />
        </div>
        <div className="form-group">
          <label htmlFor="notes">Any other relevant notes?</label>
          <Textarea name="notes" />
        </div>
        <div>
          <button type="submit" className="pure-button pure-button-primary">
            Add Episode
          </button>
        </div>
      </Form>
    );
  }
}
