import React from 'react';

class Comment extends React.Component {

    _handleDelete(e) {
        e.preventDefault();
        if (confirm('Are you sure?')) {
            this.props.onDelete(this.props.comment);
        }
    }

    render() {
        return (
            <div className="comment">
                <p className="comment-header">{this.props.comment.author}</p>
                <p className="comment-body">
                    {this.props.comment.body}
                </p>
                <div className="comment-footer">
                    <a href="#" onClick={this._handleDelete.bind(this)}>
                        Delete Comment
                    </a>
                </div>
            </div>
        );
    }
}

export default Comment;