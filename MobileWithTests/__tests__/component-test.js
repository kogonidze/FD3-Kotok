import React from 'react';
import renderer from 'react-test-renderer';
import ClientCard from '../components/ClientCard';
import MobileCompany from '../components/MobileCompany';
import {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import toJSON from 'enzyme-to-json'

let companyName='Velcom';
let clientsArr=[ 
  {id:101, fam:"Иванов", im:"Иван", otch:"Иванович", balance:200}, 
  {id:105, fam:"Сидоров", im:"Сидор", otch:"Сидорович", balance:250}, 
  {id:110, fam:"Петров", im:"Пётр", otch:"Петрович", balance:180},
  {id:120, fam:"Григорьев", im:"Григорий", otch:"Григорьевич", balance:-220},
];

configure({adapter: new Adapter()});

test('работа ExampleComponent', () => {

  const component = renderer.create(
    <MobileCompany name={companyName} clients={clientsArr}/>
  );

  let componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();
  
  // фильтрация

  const allClientsBtn = component.root.find(el => el.type == "input" && el.props.value == "Все");
  allClientsBtn.props.onClick();
  componentTree = component.toJSON();
  expect(componentTree).toMatchSnapshot();

  const activeClientsBtn = component.root.find(el => el.type == "input" && el.props.value == "Активные");
  activeClientsBtn.props.onClick();
  componentTree = component.toJSON();
  expect(componentTree).toMatchSnapshot();

  const blockedClientsBtn = component.root.find(el => el.type == "input" && el.props.value == "Заблокированные");
  blockedClientsBtn.props.onClick();
  componentTree = component.toJSON();
  expect(componentTree).toMatchSnapshot();

  allClientsBtn.props.onClick();

  // удаление

  let tdsWithDeleteButtons = component.root.findAll(el => el.type == "td" && el.props.children.type == "input" 
   && el.props.children.props.defaultValue == "Удалить");
  let deleteClientBtns = tdsWithDeleteButtons.map(el => el.children).flat();


  const secondClient = deleteClientBtns[1];
  secondClient.props.onClick();
  componentTree = component.toJSON();
  expect(componentTree).toMatchSnapshot();

  // добавление 

  const additionClientBtn = component.root.find(el => el.type == "input" && el.props.value == "Добавить клиента");
  additionClientBtn.props.onClick();

  const inputNameField = component.root.findAll(el => el.type == "input" && el.props.type=="text");
  //expect(inputNameField.length).toBe(1);

  

  //inputNameField[0].props.defaultValue = "Василий";
  // componentTree = component.toJSON();
  // expect(componentTree).toMatchSnapshot();
  
});

test('добавление через enzyme', () => {
  const wrapper = mount(<MobileCompany name={companyName} clients={clientsArr}/>);
   
  wrapper.find({value: "Добавить клиента"}).simulate('click');

  wrapper.find({id: "famField"}).instance().value = "Коток";

  wrapper.find({id: "imField"}).instance().value = "Василий";

  wrapper.find({id: "otchField"}).instance().value = "Сергеевич";

  wrapper.find({id: "balanceField"}).instance().value = "250";

  wrapper.find({defaultValue: "Сохранить"}).simulate('click');

  expect(toJSON(wrapper)).toMatchSnapshot();

})