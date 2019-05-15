import React, {Component} from 'react'
import withTabBarBasicLayout from '@layouts/withTabBarBasicLayout'
import Tabs from '@components/Tabs'
import PullUpRefresh from '@components/PullUpRefresh'
import {connect} from 'react-redux'
import {List} from 'antd-mobile'
import Entry from './Entry'

const tabs = [
  {name: '全部', title: '全部', show: true},
  {name: '已购', title: '已购', show: true}
]

@withTabBarBasicLayout
class XiaoceContainer extends Component {
  state = {
    selectedIndex: 0
  }
  handleTabChange = index => {
    this.setState({
      selectedIndex: index
    })
  }
  componentWillMount() {
    this.props.getAllXiaoce()
  }

  onRefresh = () => {
    console.log('fresh')
  }
  render() {
    let {books} = this.props
    return (
      <Tabs tabs={tabs} mode="dark">
        <PullUpRefresh useBodyScroll onRefresh={this.onRefresh}>
          <List>
            {books.map((book, index) => (
              <List.Item key={index}>
                <Entry book={book} />
              </List.Item>
            ))}
          </List>
        </PullUpRefresh>

        <PullUpRefresh useBodyScroll onRefresh={this.onRefresh}>
          <List>
            {books
              .filter(val => val.isBuy)
              .map((book, index) => (
                <List.Item key={index}>
                  <Entry book={book} />
                </List.Item>
              ))}
          </List>
        </PullUpRefresh>
      </Tabs>
    )
  }
}

const mapState = state => ({
  isLogin: state.auth.isLogin,
  books: state.xiaoce.books
})

const mapDispatch = ({xiaoce: {getAllXiaoce}}) => ({
  getAllXiaoce: () => getAllXiaoce()
})

export default connect(
  mapState,
  mapDispatch
)(XiaoceContainer)
