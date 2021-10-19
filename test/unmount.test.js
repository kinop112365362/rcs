/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import { createComponent } from '../src/index'
import { combination } from '../src/combination'
import '@testing-library/jest-dom/extend-expect'

test('测试 unmount 组件销毁的过程', async () => {
  const Tag = createComponent({
    name: 'Tag',
    subscribe: {
      Test: {
        state() {},
      },
    },
    controller: {
      onClick() {
        this.notify(['Test', 'notReady'])
      },
    },
    view: {
      render() {
        return (
          <div role="notReady" onClick={this.controller.onClick}>
            Tag
          </div>
        )
      },
    },
  })

  const Test = createComponent({
    name: 'Test',
    state: {
      ready: true,
    },
    proxySubscribe: {
      notReady() {
        this.setter.ready(false)
      },
    },
    controller: {
      onClick() {
        this.setter.ready(false)
      },
    },
    view: {
      render() {
        return <>{this.state.ready ? <Tag /> : <div>notReady</div>}</>
      },
    },
  })

  render(<Test></Test>)
  fireEvent.click(screen.getByRole('notReady'))
  await waitFor(() => {
    expect(combination.components.Tag).toBe(null)
  })
})