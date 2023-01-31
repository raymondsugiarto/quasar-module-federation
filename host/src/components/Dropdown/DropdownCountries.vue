<template>
  <q-select
    outlined
    hide-selected
    fill-input
    use-input
    v-model="selectedValue"
    v-bind="$attrs"
    input-debounce="0"
    behavior="menu"
    class="q-mr-sm col-4"
    :options="options"
    :dense="denseDropdown"
    :class="classDropdown"
    :disable="disableEdit"
    @filter="filterFn"
    @input="handleSelectItem"
  >
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">
          {{ $t('dropdown.noResults') }}
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
// import { Logger } from '@/utils/logger'
// import dropdown from '@/compability/mixins/components/dropdown'
export default {
  name: 'DropdownCountries',
  // mixins: [ dropdown ],
  data () {
    return {
      options : [{
        label: '+62',
        value: 'ID',
        name: 'indonesia'
      }]
    }
  },
  props: {
    denseDropdown: {
      type: Boolean,
      default: false
    },
    classDropdown: {
      type: String,
      default: ''
    },
    disableEdit: { type: Boolean, default: false }
  },
  created () {
    this.tagName = 'countries'
    this.doubleCheck = true
  },
  methods: {
    handleDropdownDefaultValue () {
      this.options.push({
        label: '+62',
        value: 'ID',
        name: 'indonesia'
      })
    },
    // async fetchData ({ onSuccess, onFail }) {
    //   const params = {
    //     page: this.pagination.page,
    //     limit: this.pagination.limit,
    //     query: ''
    //   }
    //   try {
    //     const response = await this.$service.cmsLocation.getCountries(params)
    //     if (response) {
    //       const countries = response.toObject()
    //       Logger.info('Countries Data', countries)()
    //       if (countries.resultsList.length > 0) {
    //         this.options = countries.resultsList.map(country => {
    //           return Object.assign({}, {
    //             label: country.phonecode,
    //             value: country.code,
    //             name: country.name
    //           })
    //         })
    //       } else {
    //         this.handleDropdownDefaultValue()
    //       }
    //       Logger.info('OPTIONS', this.options)()
    //       onSuccess && onSuccess(this.options)
    //     }
    //   } catch (error) {
    //     this.handleDropdownDefaultValue()
    //     Logger.info('OPTIONS', this.options)()
    //     Logger.error('Countries Dropdown', error)()
    //     onFail && onFail(error)
    //   }
    // }
  }
}
</script>
