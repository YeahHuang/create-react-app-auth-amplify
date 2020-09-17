import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator } from 'aws-amplify-react'; // For user-authentication logIn, logOut
import Amplify, { Auth } from 'aws-amplify';        //Auth might be deleted
import aws_exports from './aws-exports';

import videojs from "video.js";
import "video.js/dist/video-js.css";
import awsvideoconfig from "./aws-video-exports";

Amplify.configure(aws_exports);

//class VideoPlayer is copied and edited from https://codingcat.dev/lessons/aws-amplify-video/
class VideoPlayer extends React.Component {
  componentDidMount() {
    this.player = videojs(this.videoNode, this.props);
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  render() {
    return (
      <div>
        <div data-vjs-player>
          <video
            ref={(node) => {
              this.videoNode = node;
            }}
            className="video-js"
          />
        </div>
      </div>
    );
  }
}

const videoJsOptions = {
  autoplay: true,
  controls: true,
  sources: [
    {
      src: awsvideoconfig.awsOutputLiveLL,
    },
  ],
};

const videoOnDemandJsOptions = {
  autoplay: true,
  controls: true,
  sources: [
    {
      src: `https://${awsvideoconfig.awsOutputVideo}/jump/jump.m3u8`,
    },
  ],
};


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Welcome to WorkBuddy :)
          </a>
        </header>
    {
    // Option 1: static video player
    // <video width="750" height="500" controls >
    //   <source src="/Videos/jump.mp4" type="video/mp4"/>
    //  </video>
    // Option 2.1: live video, currently empty thus comment
    // <VideoPlayer {...videoJsOptions} />
    // Option 2.2: VOD video 
    }
        <VideoPlayer {...videoOnDemandJsOptions} />
      </div>
    );
  }
}

export default withAuthenticator(App, true);
