import i18n from '../../../../src/lib/i18n'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import ShotLine from '../../../../src/components/pages/breakdown/ShotLine'

const localVue = createLocalVue()

localVue.prototype.$locale = {
  change (locale) {
    i18n.locale = locale
  },
  current () {
    return i18n.locale
  }
}

describe('ShotLine', () => {
  const wrapper = shallowMount(ShotLine, {
    propsData: {
      entity: {
        id: 'shot-1',
        is_casting_stand_by: false
      },
      selected: true,
      name: 'foobar',
      assets: []
    },
    localVue,
    i18n,
    stores: {}
  })

  describe('Mount', () => {
    it('should be mounted', () => {
      const element = wrapper.findAll('.shot')
      expect(element).toHaveLength(1)
    })
    it('should be selected', () => {
      const element = wrapper.findAll('.shot.selected')
      expect(element).toHaveLength(1)
    })
    it('should display the name of the shot', () => {
      const name = wrapper.findAll('.shot-name')
      expect(name.at(0).text()).toBe('foobar')
    })
    it('should display the text for empty collection', () => {
      const empty = wrapper.findAll('.asset-type-line.empty')
      expect(empty.at(0).text()).toMatch('Empty casting')
    })
  })
})
