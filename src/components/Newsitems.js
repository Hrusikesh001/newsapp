import React, { Component } from 'react';
import './Newsitems.css';

export class Newsitems extends Component {
  handleShare = () => {
    const { title, newsUrl } = this.props;
    if (navigator.share) {
      navigator
        .share({ title: title, url: newsUrl })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    } else {
      alert('Sharing not supported on this browser.');
    }
  };

  formatDate = (dateStr) => {
    const dateObj = new Date(dateStr);
    if (isNaN(dateObj)) return 'Unknown';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return dateObj.toLocaleDateString(undefined, options);
  };

  handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/400x200?text=No+Image+Available";
  };

  render() {
    const { title, description, imageUrl, newsUrl, date } = this.props;

    return (
      <div className="my-3">
        <div className="card news-card">
          <img
  src={imageUrl || "https://t3.ftcdn.net/jpg/09/45/42/00/360_F_945420050_iKJoSRvgv5sVT3WHXUVcf01bLQcDTxG3.jpg"}
  onError={this.handleImageError}
  className="card-img-top img-fluid"
  alt="News"
/>
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-muted">
                Published on: {this.formatDate(date)}
              </small>
            </p>
            <a
              rel="noreferrer"
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-primary"
            >
              Read more
            </a>
          </div>
          <button className="share-btn" onClick={this.handleShare}>
            <i className="bi bi-share fw-bold me-1"></i>
            <span className="share-btn-text fw-bold">Share</span>
          </button>
        </div>
      </div>
    );
  }
}

export default Newsitems;
