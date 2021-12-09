import React from 'react';

// helpers
import { calcTime, convertMoney } from '../../helpers';

// styles
import { Wrapper, Content } from './MovieInfoBar.styles';

const MovieInfoBar = ({ time, budget, revenue }) => (
  <Wrapper>
    <Content>
      <div className='col'>
        <div>Running time: {calcTime(time)}</div>
      </div>

      <div className='col'>
        <div>Budget: {convertMoney(budget)}</div>
      </div>

      <div className='col'>
        <div>Revenue: {convertMoney(revenue)}</div>
      </div>
    </Content>
  </Wrapper>
);

export default MovieInfoBar;
