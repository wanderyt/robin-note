import React from 'react';
import {storiesOf} from '@storybook/react';
import EditableTable from '../../src/scripts/components/editable-table';

const mockData = {
  head: [{
    key: 'id',
    value: 'id',
  }, {
    key: 'name',
    value: 'name',
  }, {
    key: 'age',
    value: 'age',
  }],
  body: [{
    id: 1,
    name: 'David',
    age: 30,
  }, {
    id: 2,
    name: 'Joe',
    age: 30,
  }, {
    id: 3,
    name: 'Bob',
    age: 25,
  }]
};

storiesOf('Editable Table', module)
  .add('default', () => (
    <EditableTable {...mockData} />
  ));