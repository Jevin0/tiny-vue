import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import { Form, Input, FormItem, Button } from '@opentiny/vue'
import { nextTick, ref } from 'vue'
import { randomValues } from './common/globalConfig'

randomValues(global)

const createData = {
  quantity: '1'
}

describe('form', () => {
  test('label-width', async () => {
    const wrapper = mount(() => <Form label-width="100px">
      <FormItem label='数字'>
        <Input v-model={createData.quantity}></Input>
      </FormItem>
    </Form>)
    expect(wrapper.find('.tiny-form-item__content').attributes().style).toBe('margin-left: 100px;')
  })


  test('slot', async () => {
    const action = 'http://localhost:3000/api/upload'
    const wrapper = mount(() => <Form label-width="100px">
      <FormItem label='数字' v-slots={{
        label: () => <>必填</>
      }}>
        <Input v-model={createData.quantity}></Input>
      </FormItem>
    </Form>)
    expect(wrapper.find('.tiny-form-item__label').text()).toBe('必填')
  })

  test('events', async () => {
    const rules = {
      quantity: { required: true }
    }

    const wrapper = mount(() => <Form ref="form" label-width="100px" model={createData} rules={rules}>
      <FormItem label='quantity' prop="quantity">
        <Input v-model={createData.quantity}></Input>
      </FormItem>
    </Form>)
    const form = wrapper.findComponent(Form).componentVM
    await nextTick()

    const valid = await form
      .validate()
      .then(() => true)
      .catch(() => false)
    expect(valid).toBe(true)
  })
})