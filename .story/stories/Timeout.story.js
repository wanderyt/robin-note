import React from 'react';
import Timeout from '../../src/scripts/components/timeout';
import PureTimeout from '../../src/scripts/components/timeout/pure';
import {storiesOf} from '@storybook/react';

storiesOf('Timeout', module)
  .add('default', () => (
    <Timeout
      ms={3000}>
      {didTimeout => {
        console.log(
          new Date().getTime(),
          "in Loader > Timeout, did timeout: ",
          didTimeout
        );
        /**
         * The first time this component is rendered, `didTimeout` will
         * be set to false, in order to init loading the component, which
         * will start the async - long - operation.
         *
         * On subsequent renderers it will be called with:
         *
         * - true, once the timeout expired - in order to show the provided
         *   placeholder
         * - false, once the Promise thrown by the component actually resolved
         *   to show the component
         */
        return didTimeout ? <span>The content is still loading :(</span> : <span>Hello world</span>;
      }}
    </Timeout>
  ));
