import { mount, ReactWrapper, shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { spy } from 'sinon';
import { Markets, MarketsProps } from '.';

const data = [
    ['ETH/BTC', '0.223100', '+50.00%'],
    ['ETH/LTC', '0.223100', '+25.00%'],
    ['LTC/BTC', '0.223100', '-5.00%'],
];
const onSelect = spy();

const defaultProps: MarketsProps = {
    data,
    onSelect,
};

const setup = (props?: Partial<MarketsProps>) => shallow(<Markets {...{ ...defaultProps, ...props }} />);

describe.skip('Markets', () => {
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        wrapper = setup();
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render empty data', () => {
        wrapper = setup({ data: [] });
        expect(wrapper).toMatchSnapshot();
    });

    it('should set selected market in props', () => {
        const keyIndex = 0;
        const selectedKey = 'ETH/LTC';
        const component: ReactWrapper = mount(
            <Markets data={data} rowKeyIndex={keyIndex} selectedKey={selectedKey} onSelect={onSelect} />
        );
        const resultSelectedRow =
            '<tr class="cr-table__row--selected"><td>ETH/LTC</td><td>0.223100</td><td><span class="__positive">+25.00%</span></td></tr>';
        const expectedSelectedRow = component.find('.cr-table__row--selected').first().html();
        expect(resultSelectedRow).toBe(expectedSelectedRow);
    });
});
