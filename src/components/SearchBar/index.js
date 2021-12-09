import React, { Component } from 'react';

// image
import searchIcon from '../../images/search-icon.svg';

// styles
import { Wrapper, Content } from './SearchBar.styles';

export class SearchBar extends Component {
  state = { value: '' };
  timeout = null;

  componentDidUpdate(_prevProps, prevState) {
    if (this.state.value !== prevState.value) {
      const { setSearchTerm } = this.props;

      clearTimeout(this.timeot);

      this.timeout = setTimeout(() => {
        const { value } = this.state;
        setSearchTerm(value);
      }, 500);
    }
  }

  render() {
    return (
      <Wrapper>
        <Content>
          <img src={searchIcon} alt='search-icon' />
          <input
            type='text'
            placeholder='SearchMovie'
            onChange={(e) => this.setState({ value: e.currentTarget.value })}
            value={this.state.value}
          />
        </Content>
      </Wrapper>
    );
  }
}

// const SearchBarFunc = ({ setSearchTerm }) => {
//   const [state, setState] = useState('');
//   const initial = useRef(true);

//   useEffect(() => {
//     if (initial.current) {
//       initial.current = false;
//     }

//     const timer = setTimeout(() => {
//       setSearchTerm(state);
//     }, 500);

//     return () => clearTimeout(timer);
//   }, [setSearchTerm, state]);

//   return (
//     <Wrapper>
//       <Content>
//         <img src={searchIcon} alt='search-icon' />
//         <input type='text' placeholder='SearchMovie' onChange={(e) => setState(e.currentTarget.value)} value={state} />
//       </Content>
//     </Wrapper>
//   );
// };

export default SearchBar;
