import React from "react";
import Search from "./Search";
import { getData } from "../apis";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      processedData: [],
      topX: 10,
      topXData: [],
      searchValue: "",
      searchedResult: [],
    };
    this.handleNext10 = this.handleNext10.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
  }

  componentDidMount() {
    getData().then((data) => {
      this.setState({ data });

      var sortedData = data.sort(
        (a, b) => b.activePerOneMillion - a.activePerOneMillion
      );

      var processedData = sortedData.map((item) => ({
        rank: sortedData.findIndex((element) => element === item),
        country: item.country,
        activePerOneMillion: Math.round(item.activePerOneMillion)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        percentage: `${(item.activePerOneMillion / 10000).toFixed(2)}%`,
      }));

      var topXData = processedData.slice(0, this.state.topX);

      this.setState({ processedData, topXData });
    });
  }

  componentDidUpdate() {
    var y = document.querySelector(".next").getBoundingClientRect().bottom;
    window.scrollTo(0, y);
  }

  handleNext10() {
    this.setState({
      topX: this.state.topX + 10,
      topXData: this.state.processedData.slice(0, this.state.topX + 10),
    });
  }

  handleSearchChange(value) {
    console.log("--------========================================", this.state);

    this.setState({
      searchValue: value,
      searchedResult: this.state.processedData.filter(
        (item) => item.country.toLowerCase().indexOf(value.toLowerCase()) > -1
      ),
    });
  }

  clearSearch() {
    this.setState({ searchValue: "" });
  }

  handleToTop() {
    window.scrollTo(0, 0);
  }

  render() {
    const listItems =
      this.state.searchValue === ""
        ? this.state.topXData
        : this.state.searchedResult;

    return (
      <div className={`App ${this.state.searchValue === "" ? "" : "searched"}`}>
        <div className="live">
          <i className="fa fa-cog" />
          &nbsp;&nbsp; LIVE DATA updated every 24 hours, powered by API from
          disease.sh
        </div>

        <Search
          onChange={this.handleSearchChange}
          value={this.state.searchValue}
          clear={this.clearSearch}
        />

        <div className="title">
          <div>Top {this.state.topX} Countries:</div>
          <div>Covid-19 Active Cases per Million People</div>
        </div>
        <table className="rankTable">
          <thead>
            <tr>
              <th className="rank">Rank</th>
              <th className="country">Country</th>
              <th className="cases">Active Cases / Million</th>
              <th className="percentage">Active Case Percentage</th>
            </tr>
          </thead>
          <tbody>
            {listItems.map((item) => (
              <tr key={item.rank}>
                <td className="rank">{item.rank + 1}</td>
                <td className="country">{item.country}</td>
                <td className="cases">{item.activePerOneMillion}</td>
                <td className="percentage">{item.percentage}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="btnBox">
          <button
            className="next"
            onClick={this.handleNext10}
            disabled={this.state.searchValue !== ""}
          >
            <i className="fa fa-arrow-circle-right" />
            <span>&nbsp;&nbsp;Next 10 Countries</span>
          </button>
          <button className="goTop" onClick={this.handleToTop}>
            <i className="fa fa-arrow-circle-up" />
            <span>&nbsp;&nbsp;Go To Top</span>
          </button>
        </div>
      </div>
    );
  }
}

export default App;
