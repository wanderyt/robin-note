import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

class FacebookLoginComponent extends React.Component {
  state = {
    isLoginStarted: false
  }
  testApiCall = (response) => {
    alert(response);
  }
  responseFacebook = (response) => {
    alert(response);
  }
  render() {
    return (
      <div>
        {<button onClick={this.testApiCall} >Click Me</button>}
        <FacebookLogin appId="1662475147175559" // 105556089875696  // '983148971714807',// 1258033774226324, //
          autoLoad={true} cssClass='sh-ui-fb-button sh-ui-fb-text' fields="name,email,picture,first_name,last_name" render={renderProps => (
            <button
              className={`sh-ui-fb-button ${this.state.isLoginStarted ? 'sh-ui-fb-button-disabled' : ''}`}
              // title={this.state.isLoginStarted ? fbSignInProcessingText : fbBtnText}
              onClick={renderProps.onClick}>
              <span className="sh-ui-fb-text" id="sh-ui-fb-login-text">{this.state.isLoginStarted ? 'Sign In Facebook' : 'One Moment'}</span>
            </button>
          )} callback={this.responseFacebook}
          version='2.9' scope='public_profile, user_friends, email, user_likes' />
      </div>
    );
  }
};

export default FacebookLoginComponent;