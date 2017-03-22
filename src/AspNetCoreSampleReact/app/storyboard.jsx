import React from 'react';
import About from './about';
import Contact from './contact';
import CommentBox from './commentbox';

class StoryBoard extends React.Component {

    getView(location) {
        if (location.indexOf('/Contact') > 0) {
            return 'contact';
        }
        else if (location.indexOf('/About') > 0) {
            return 'about';
        }

        return 'index';
    }

    render () {
        var location = window.location.href;
        var view = this.getView(location);
        return (
            <div>
                {view === 'contact' ? <Contact/> : (view === 'about' ? <About /> : <div><CommentBox /></div>)}
            </div>
        );
    }
}

    export default StoryBoard;