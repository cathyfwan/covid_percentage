export function getData() {
  return fetch(
    "https://disease.sh/v3/covid-19/countries?yesterday=true&twoDaysAgo=false&sort=casesPerOneMillion&allowNull=true"
  ).then((response) => response.json());
}
