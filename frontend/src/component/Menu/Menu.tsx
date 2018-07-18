import * as React from 'react';
import styled from 'styled-components';
import * as feather from 'styled-icons/feather';

import Logo from './Logo';
import SearchForm from './Search';

interface IProps {}

interface IState {
  prevYOffset: number;
  menuLayoutColor: string;
  showInputBox: boolean;
}

interface IMenuBarLayoutProps {
  backgroundColor?: string;
}

const MenuBarLayout = styled.div`
  background-color: ${(props: IMenuBarLayoutProps) => props.backgroundColor};
  color: white;
  position: fixed;
  width: 100vw;
  display: flex;
  align-items: center;
  height: 70px;
  top: 0;
  left: 0;
`;

const HambergerIcon = feather.Menu.extend`
  margin-left: 20px;
  color: white;
  size: 50px;
  cursor: pointer;
`;

class Menu extends React.Component<IProps, IState> {
  state: IState = {
    prevYOffset: 0,
    menuLayoutColor: 'transparent',
    showInputBox: false
  };

  componentDidMount (): void {
    window.addEventListener('scroll', (): void => {
      if (window.pageYOffset === 0) {
        this.setState({
          menuLayoutColor: 'transparent'
        });
      } else {
        this.setState({
          menuLayoutColor: 'black'
        });
      }
    });
  }

  onClickSearchIcon = (): void => {
    this.setState({
      showInputBox: !this.state.showInputBox
    });
  };

  render () {
    const { menuLayoutColor, showInputBox } = this.state;
    return (
      <MenuBarLayout backgroundColor={menuLayoutColor}>
        <HambergerIcon size="48" />
        <Logo>elebooks</Logo>
        <SearchForm
          showInputBox={showInputBox}
          onClickSearchIcon={this.onClickSearchIcon}
        />
      </MenuBarLayout>
    );
  }
}

export default Menu;
