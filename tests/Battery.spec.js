import { mount } from '@vue/test-utils';
import Battery from '@/components/Battery.vue';

const voltageSelector = '[data-testid="voltage"]';
const percentageSelector = '[data-testid="percentage"]';
const numCells = 4;

const getWrapper = (props) => {
  return mount(Battery, {
    props,
  });
};

it('should render the voltage x.yzV when the value is not 0', () => {
  const wrapper = getWrapper({ data: { voltage: 16, numCells } });
  const expectedValue = '16.00V';
  
  expect(wrapper.find(voltageSelector).text()).toBe(expectedValue);
});

it('should render the voltage 0V when the value is 0', () => {
  const wrapper = mount(Battery);
  const expectedValue = '0V';
  
  expect(wrapper.find(voltageSelector).text()).toBe(expectedValue);
});

it('should render the percentage 100% when the voltage is 16.8', () => {
  const wrapper = getWrapper({ data: { voltage: 16.8, numCells } });
  const expectedValue = '100%';

  expect(wrapper.find(percentageSelector).text()).toBe(expectedValue);
});