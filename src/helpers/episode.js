const split = (value, separator = "\n") =>
  value ? value.split(separator).map(v => v.trim()) : value;

const join = (values, separator = "\n") =>
  values ? values.join(separator) : values;

export function convertToStorage(episode) {
  return {
    ...episode,
    guests: split(episode.guests, ","),
    featured: split(episode.featured),
    wwbw: split(episode.wwbw),
    film_news: split(episode.film_news),
    keywords: split(episode.keywords)
  };
}

export function convertToForm(episode) {
  return {
    ...episode,
    guests: join(episode.guests, ", "),
    featured: join(episode.featured),
    wwbw: join(episode.wwbw),
    film_news: join(episode.film_news),
    keywords: join(episode.keywords)
  };
}
