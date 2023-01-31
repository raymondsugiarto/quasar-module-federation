import cloneDeep from 'lodash/cloneDeep'
export default {
  props: {
    value: { type: Object, default: {} }
  },
  data () {
    return {
      tagName: '',
      options: [],
      items: [],
      selectedValue: '',
      stateFilter: 'offline',
      minCharLength: 0,
      pagination: {
        page: 1,
        limit: 1000,
        sortBy: '',
        sortDir: 'asc'
      },
      doubleCheck: false
    }
  },
  async mounted () {
    this.selectedValue = this.value
    await this.loadData()
  },
  methods: {
    async loadData () {
      await this.fetchData({
        onSuccess: this.handleSuccessFetchData,
        onFail: this.handleFailFetchData
      })
    },
    handleSuccessFetchData (data) {
      this.items = cloneDeep(data)
      this.logger.info('handleSuccessFetchData', this.items, 'dropdown.js')()
    },
    handleFailFetchData (err) {
      this.logger.info('err', err, 'dropdown')()
    },
    handleSelectItem (value) {
      this.$emit('input', value)
    },
    filterFn (val, update, abort) {
      if (val.length < this.minCharLength) {
        abort()
        return
      }
      update(async () => {
        if (this.stateFilter === 'offline') {
          if (val === '') {
            this.options = this.items
          } else {
            const needle = val.toLowerCase()
            if (this.doubleCheck) {
              this.options = this.items.filter(v => v.label.toLowerCase().indexOf(needle) > -1 || v.name.toLowerCase().indexOf(needle) > -1)
            } else {
              this.options = this.items.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
            }
          }
        } else {
          await this.filterUpdateFn(val)
        }
      })
    },

  }
}
