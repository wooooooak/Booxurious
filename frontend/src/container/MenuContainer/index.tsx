import * as React from 'react';
import * as feather from 'styled-icons/feather';

import Logo from '../../component/Menu/Logo';
import MenuBarLayout from '../../component/Menu/MenuBarLayout';
import SearchForm from '../../component/Menu/Search';
import SideBar from '../../component/SideBar';
import OuterToToggleSideBar from '../../component/SideBar/OuterToToggleSideBar';

interface IProps {}

interface IState {
  prevYOffset: number;
  menuLayoutColor: string;
  showInputBox: boolean;
  showSideBar: boolean;
}

const HambergerIcon = feather.Menu.extend`
  margin-left: 20px;
  size: 50px;
  cursor: pointer;
`;

class MenuContainer extends React.Component<IProps, IState> {
  state: IState = {
    prevYOffset: 0,
    menuLayoutColor: 'transparent',
    showInputBox: false,
    showSideBar: false
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

  onClickHambergerButton = (): void => {
    console.log(this.state);
    this.setState({
      showSideBar: !this.state.showSideBar
    });
  };

  onClickEmptySpace = (): void => {
    console.log('empty space and ', this.state.showSideBar);
    this.setState({
      showSideBar: false
    });
  };

  render () {
    const { menuLayoutColor, showInputBox, showSideBar } = this.state;
    return (
      <React.Fragment>
        <MenuBarLayout backgroundColor={menuLayoutColor} showSideBar={showSideBar}>
          <HambergerIcon size="48" onClick={this.onClickHambergerButton} />
          <Logo marginLeft="10px" />
          <SearchForm
            showInputBox={showInputBox}
            onClickSearchIcon={this.onClickSearchIcon}
          />
        </MenuBarLayout>
        <SideBar showSideBar={showSideBar}>
          <HambergerIcon
            size="48"
            color="#534847"
            onClick={this.onClickHambergerButton}
          />
        </SideBar>
        <OuterToToggleSideBar
          showSideBar={showSideBar}
          onClickEmptySpace={this.onClickEmptySpace}
        />
      </React.Fragment>
    );
  }
}

export default MenuContainer;
