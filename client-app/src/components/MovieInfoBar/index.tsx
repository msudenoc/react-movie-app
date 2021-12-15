import { calcTime, convertMoney } from '../../helpers';
import { Wrapper, Content } from './MovieInfoBar.styles';

type Props = {
  time: number;
  budget: number;
  revenue: number;
};

const MovieInfoBar: React.FC<Props> = ({ time, budget, revenue }) => (
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
