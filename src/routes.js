import React from "react";
import { AddEpisode } from "./pages/AddEpisode";
import { EditEpisode } from "./pages/EditEpisode";

const Placeholder = ({ title }) => <h1>{title}</h1>;

export default [
  {
    path: "/",
    public: true,
    component: () => <Placeholder title="Search" />
  },
  {
    path: "/episodes",
    component: () => <Placeholder title="Episodes" />
  },
  {
    path: "/episodes/add",
    component: AddEpisode
  },
  {
    path: "/episodes/:id",
    component: EditEpisode
  }
];
