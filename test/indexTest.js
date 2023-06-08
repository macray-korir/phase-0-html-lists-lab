require('./helpers.js');

const chai = require('chai');
chai.use(require('chai-dom'));
const { expect } = chai;

describe('the <ul> tag', () => {
  it('exists in the document', () => {
    const ul = document.querySelector('ul');
    const hint = 'The document should have a <ul> element';

    expect(ul, hint).to.exist;
  });

  it('has three child <li> tags with the correct content', () => {
    const ul = document.querySelector('ul');
    const hint = 'The <ul> should have three <li> elements nested inside';
    expect(ul.children, hint).to.have.lengthOf(3);

    const [firstLi, secondLi, thirdLi] = ul.children;

    expect(firstLi).to.have.tagName('li');
    expect(firstLi).to.contain.text('2 slices of bread');

    expect(secondLi).to.have.tagName('li');
    expect(secondLi).to.contain.text('4 slices of cheese');

    expect(thirdLi).to.have.tagName('li');
    expect(thirdLi).to.contain.text('1 tbsp of butter');
  });

  it('contains a nested <ul> tag within a <li>', () => {
    const ul = document.querySelector('ul');
    const hint = `
      The <ul> must contain another <ul> nested *inside* a <li>:
      <ul>
        <li>
          4 slices of cheese
          <ul></ul>
        </li>
      </ul>
    `;

    const liWithTag = Array.from(ul.querySelectorAll('li')).find(li => li.querySelector('ul'));
    expect(liWithTag, hint).to.exist;
  });

  it('contains three <li> nested within the nested <ul> with the correct content', () => {
    const ul = document.querySelector('ul');
    const hint = `
      The *nested* <ul> must contain three nested <li>:
      <ul>
        <li>
          4 slices of cheese
          <ul>
            <li>cheddar</li>
            <li>mozzarella</li>
            <li>pepper jack</li>
          </ul>
        </li>
      </ul>
    `;

    const nestedUl = ul.querySelector('li ul');
    expect(nestedUl, hint).to.exist;
    expect(nestedUl.querySelectorAll('li')).to.have.lengthOf(3);
  });
});

describe('the <ol> tag', () => {
  it('exists in the document', () => {
    const ol = document.querySelector('ol');
    const hint = 'The document should have an <ol> element';

    expect(ol, hint).to.exist;
  });

  it('has five child <li> tags with the correct content', () => {
    const ol = document.querySelector('ol');
    const hint = 'The <ol> should have five <li> elements';
    expect(ol.querySelectorAll('li')).to.have.lengthOf(5);

    const [first, second, third, fourth, fifth] = ol.querySelectorAll('li');

    expect(first).to.contain.text('Spread butter on bread and frying pan');
    expect(second).to.contain.text('Place bread in frying pan and fry');
    expect(third).to.contain.text('Add cheese on top of bread');
    expect(fourth).to.contain.text('Cover with second slice of bread');
    expect(fifth).to.contain.text('Turn over and fry for 2 minutes');
  });
});
