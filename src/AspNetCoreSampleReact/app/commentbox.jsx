import React from 'react';
import Comment from './comment';
import CommentForm from './commentform';

class CommentBox extends React.Component {

    constructor() {
        super();

        this.state = {
            showComments: false,
            comments : []
        };
    }

    _getComments() {
        return this.state.comments.map((comment) => {
            return (
                <Comment 
                    comment={comment}
                    onDelete={this._deleteComment.bind(this)} />
            );
            });
            }

    _getCommentsTitle(commentCount) {
        if (commentCount === 0) {
            return "No comments yet";
        }
        else if (commentCount === 1) {
            return "1 comment";
        } else {
            return `${commentCount} comments`;
        }
    }

    _handleClick() {
        this.setState({
            showComments: !this.state.showComments
        });
    }

    _addComment(author, body) {
        const comment = {
            author,
            body
        };

        jQuery.post('/api/comments', { comment })
            .success((newComment) => {
                this.setState({ comments: this.state.comments.concat([newComment]) });
            });
    }

    _fetchComments() {
        jQuery.ajax({
            method: "GET",
            url: "/api/comments",
            success: (comments) => {
                this.setState({ comments });
            }
        });
    }

    _deleteComment(comment) {
        jQuery.ajax({
            method: 'DELETE',
            url: `/api/comments/${comment.id}`
        });

        const comments = [...this.state.comments]; //use spread operator to clone existing array!
        const commentIndex = comments.indexOf(comment);
        comments.splice(commentIndex, 1);
        this.setState({ comments });
    }

    componentWillMount() {
        this._fetchComments();
    }

    componentDidMount() {
        this._timer = setInterval(()=> this._fetchComments(), 5000);
    }

    componentWillUnmount() {
        clearInterval(this._timer);
    }

    render () {
        const comments = this._getComments();
        let commentNodes;
        let buttonText = 'Show Comments';
        if (this.state.showComments) {
            buttonText = 'Hide Comments';
            commentNodes = <div className="comment-list">{comments}</div>;
        }
        return (
            <div className="comment-box">
                <CommentForm addComment={this._addComment.bind(this)}/>
                <h3>Comments</h3>
                <h4 className="comment-count">
                    {this._getCommentsTitle(comments.length)}
                    <button className="comment-button" onClick={this._handleClick.bind(this)}>{buttonText}</button>
                </h4>                
        {commentNodes}
        </div>
        );
    }
}

export default CommentBox;