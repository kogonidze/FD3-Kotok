import React from 'react';
import renderer from 'react-test-renderer';
import MobileCompany from '../components/MobileCompany';

let companyName='Velcom';
let clientsArr=[ 
  {id:101, fam:"Иванов", im:"Иван", otch:"Иванович", balance:200}, 
  {id:105, fam:"Сидоров", im:"Сидор", otch:"Сидорович", balance:250}, 
  {id:110, fam:"Петров", im:"Пётр", otch:"Петрович", balance:180},
  {id:120, fam:"Григорьев", im:"Григорий", otch:"Григорьевич", balance:-220},
];

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
  expect(inputNameField.length).toBe(1);

});
 