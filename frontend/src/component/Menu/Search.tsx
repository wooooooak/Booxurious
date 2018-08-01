import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Search } from 'styled-icons/octicons/Search';
// import { GoogleLogout } from 'react-google-login';

interface IProps {
  showInputBox: boolean;
  username: string | null | undefined;
  onClickSearchIcon(): void;
  onClickSignIn(): void;
}

interface IState {
  value: string;
}

const Contianer = styled.div`
  margin-left: auto;
  margin-right: 50px;
`;

const SearchInput = styled.input`
  margin-left: 20px;
  width: 100px;
  border-radius: 10px;
  padding-left: 5px;
  &:focus {
    outline: none;
  }
`;

const StartText = styled(Link)`
  margin: 0 25px;
  color: #011627;
  text-decoration:none;
`;

class SearchForm extends React.Component<IProps, IState> {
  state: IState = {
    value: ''
  };

  onChangeInputValue = (e: React.FormEvent<HTMLInputElement>): void => {
    const value: string = e.currentTarget.value;
    this.setState({
      value
    });
  };

  onClickEnterInSearch = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter') {
      console.log('Enter');
    }
  };

  render () {
    const { showInputBox, onClickSearchIcon, username, onClickSignIn } = this.props;
    return (
      <Contianer>
        {showInputBox ? (
          <SearchInput
            onChange={this.onChangeInputValue}
            onKeyPress={this.onClickEnterInSearch}
          />
        ) : null}
        <Search size="23" onClick={onClickSearchIcon} color="#011627" />
        {username ? (
          <React.Fragment>
            <StartText to="/">Hi {username}!</StartText>
            {/* <span style={{ color: 'black' }}>logout</span> */}
            {/* <GoogleLogout buttonText="logout" onLogoutSuccess={this.logout} /> */}
          </React.Fragment>
        ) : (
          <StartText to="/signIn" onClick={onClickSignIn}>
            sign in
          </StartText>
        )}
      </Contianer>
    );
  }
}

export default SearchForm;
