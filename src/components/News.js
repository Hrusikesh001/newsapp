import React, { Component } from 'react';
import Newsitems from './Newsitems';

export class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      page: 1,
      totalResults: 0,
    };
  }

  filterValidArticles = (articles) => {
    return articles.filter(article =>
      article.title && article.description && article.url && article.urlToImage
    );
  };

  async updateNews(page) {
    const { pageSize, category, searchTerm } = this.props;
    let url = searchTerm
      ? `https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=63d448dd33384a41bc1a7e3807a3fc9e&page=${page}&pageSize=${pageSize}`
      : `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=63d448dd33384a41bc1a7e3807a3fc9e&page=${page}&pageSize=${pageSize}`;

    try {
      let data = await fetch(url);
      let parsedData = await data.json();

      const validArticles = this.filterValidArticles(parsedData.articles || []);

      this.setState({
        articles: validArticles.slice(0, this.props.pageSize),
        totalResults: parsedData.totalResults || 0,
        page: page,
      });
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  }

  async componentDidMount() {
    this.updateNews(1);
  }

  async componentDidUpdate(prevProps) {
    if (
      prevProps.category !== this.props.category ||
      prevProps.searchTerm !== this.props.searchTerm
    ) {
      this.updateNews(1);
    }
  }

  handlePrevClick = () => {
    this.updateNews(this.state.page - 1);
  };

  handleNextClick = () => {
    const nextPage = this.state.page + 1;
    if (nextPage <= Math.ceil(this.state.totalResults / this.props.pageSize)) {
      this.updateNews(nextPage);
    }
  };

  render() {
    const { searchTerm, category, pageSize } = this.props;
    const { totalResults, page, articles } = this.state;

    const shownSoFar = (page - 1) * pageSize + articles.length;
    const remaining = totalResults - shownSoFar;

    return (
      <div className="container my-3">
        <h2 className="text-center" style={{ margin: '35px 0 10px' }}>
          {searchTerm
            ? `Search Results for "${searchTerm}"`
            : `Top ${category.charAt(0).toUpperCase() + category.slice(1)} Headlines`}
        </h2>

        <div className="row gy-4">
          {articles.map((element) => (
            <div className="col-12 col-sm-6 col-md-4" key={element.url}>

              <Newsitems
                title={element.title.slice(0, 45)}
                description={element.description.slice(0, 88)}
                imageUrl={element.urlToImage}
                newsUrl={element.url}
                date={element.publishedAt}
              />
            </div>
          ))}
        </div>

        <div className="container d-flex justify-content-between align-items-center my-4">
          <div className="d-flex align-items-center flex-wrap">
            <button
              disabled={page <= 1}
              className="btn btn-primary me-3 mb-2"
              onClick={this.handlePrevClick}
            >
              &larr; Previous
            </button>
            <span className="text-muted me-3 mb-2">
              Total: <strong>{totalResults}</strong>
            </span>
            <span className="text-muted mb-2">
              Remaining: <strong>{remaining > 0 ? remaining : 0}</strong>
            </span>
          </div>

          <button
            disabled={page + 1 > Math.ceil(totalResults / pageSize)}
            className="btn btn-primary"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
