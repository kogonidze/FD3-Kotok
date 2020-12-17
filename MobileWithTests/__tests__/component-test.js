import React from 'react';
import renderer from 'react-test-renderer';
import MobileCompany from '../components/MobileCompany';

import ExampleComponent from '../components/MobileCompany';

test('работа ExampleComponent', () => {

  const component = renderer.create(
    <MobileCompany />
  );

  let componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();
    
});
